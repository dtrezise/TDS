import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = fileURLToPath(new URL("../../", import.meta.url));

const researchLanes = [
  { lane: "legal", file: "research/legal_power.json" },
  { lane: "conduct", file: "research/conduct_family.json" },
  { lane: "faith", file: "research/faith_movements.json" },
  { lane: "america", file: "research/america_first.json" },
  { lane: "deal", file: "research/deal_record.json" },
];

const canonicalCaseIds = new Map([
  ["e-jean-carroll-liability", "carroll-sexual-abuse-defamation-judgments"],
  ["new-york-civil-fraud", "new-york-civil-business-fraud"],
  ["trump-foundation-misuse", "trump-foundation-fiduciary-breach"],
  ["foreign-government-payments-presidency", "foreign-government-payments-emoluments"],
]);

const tableOrder = [
  "categories",
  "tags",
  "entities",
  "sources",
  "faith_principles",
  "cases",
  "case_aliases",
  "case_revisions",
  "claims",
  "claim_revisions",
  "claim_sources",
  "entity_aliases",
  "case_entities",
  "case_categories",
  "case_tags",
  "legal_status_events",
  "case_faith_principles",
  "document_snapshots",
  "editorial_reviews",
  "corrections",
  "import_runs",
];

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableId(prefix, ...parts) {
  return `${prefix}_${hash(parts.join("\u001f")).slice(0, 24)}`;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function canonicalUrl(value) {
  const url = new URL(value);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|fbclid|gclid)/i.test(key)) url.searchParams.delete(key);
  }
  return url.toString();
}

function authorityTier(sourceType) {
  const value = sourceType.toLowerCase();
  if (/scripture|bible/.test(value)) return "scripture";
  if (/court|government|official|congress|agency|executive|white.house|inspector|gao|crs|senate|house|federal.register/.test(value)) return "official";
  if (/primary|transcript|video|audio|statement|speech|policy|platform|report/.test(value)) return "primary";
  if (/news|reporting|journalism|fact.check|newspaper|magazine/.test(value)) return "reporting";
  return "analysis";
}

function claimStatus(statusLabel) {
  const value = statusLabel.toLowerCase();
  if (/convict|civil liability|found liable|adjudicat|jury verdict|court found/.test(value)) return "adjudicated";
  if (/alleg|accus|no adjudication|no guilt finding|unresolved|disputed/.test(value)) return "attributed";
  return "supported";
}

function eventType(statusLabel) {
  const value = statusLabel.toLowerCase();
  if (/convict/.test(value)) return "conviction";
  if (/civil liability|found liable|adjudicat/.test(value)) return "civil_liability";
  if (/charge|indict/.test(value)) return "charge";
  if (/settle/.test(value)) return "settlement";
  if (/acquit/.test(value)) return "acquittal";
  if (/dismiss/.test(value)) return "dismissal";
  if (/appeal|affirm|vacat|revers|certiorari/.test(value)) return "appellate_status";
  if (/pardon|clemency/.test(value)) return "clemency";
  if (/impeach/.test(value)) return "impeachment";
  if (/report|finding|investigat/.test(value)) return "official_finding";
  return "record_status";
}

function entityType(name) {
  return /department|office|committee|foundation|organization|university|congress|court|administration|party|project|institute|network/i.test(name)
    ? "organization"
    : "person";
}

function sortRows(rows) {
  return rows.sort((a, b) => {
    const aKey = a.id ?? a.legacy_id ?? Object.values(a).join("\u001f");
    const bKey = b.id ?? b.legacy_id ?? Object.values(b).join("\u001f");
    return String(aKey).localeCompare(String(bKey));
  });
}

function dedupeRows(rows, keyFor, merge = (current) => current) {
  const deduped = new Map();
  for (const row of rows) {
    const key = keyFor(row);
    deduped.set(key, deduped.has(key) ? merge(deduped.get(key), row) : row);
  }
  return [...deduped.values()];
}

export async function buildArchiveExport({ rootDir = defaultRoot, sourceCommit = null } = {}) {
  const loaded = [];
  const fileDigests = [];

  for (const definition of researchLanes) {
    const filePath = path.join(rootDir, definition.file);
    const raw = await readFile(filePath, "utf8");
    const payload = JSON.parse(raw);
    fileDigests.push(`${definition.file}:${hash(raw)}`);
    for (const item of payload.items) loaded.push({ ...item, lane: definition.lane, generated: payload.generated });
  }

  loaded.sort((a, b) => `${a.lane}:${a.id}`.localeCompare(`${b.lane}:${b.id}`));
  const generatedDate = loaded.map((item) => item.generated).sort().at(-1);
  const generatedAt = `${generatedDate}T00:00:00.000Z`;
  const sourceHash = hash(fileDigests.sort().join("\n"));

  const casesByCanonicalId = new Map();
  for (const item of loaded) {
    const canonicalLegacyId = canonicalCaseIds.get(item.id) ?? item.id;
    const group = casesByCanonicalId.get(canonicalLegacyId) ?? [];
    group.push(item);
    casesByCanonicalId.set(canonicalLegacyId, group);
  }

  const tables = Object.fromEntries(tableOrder.map((table) => [table, []]));
  const sourceRows = new Map();
  const categoryRows = new Map();
  const tagRows = new Map();
  const entityRows = new Map();
  const faithRows = new Map();
  const claimSourceKeys = new Set();

  for (const [canonicalLegacyId, group] of [...casesByCanonicalId.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const base = group.find((item) => item.id === canonicalLegacyId) ?? group[0];
    const caseId = stableId("case", canonicalLegacyId);
    const caseCreatedAt = generatedAt;
    const mergedEditorialCaution = [...new Set(group.map((item) => item.editorial_note).filter(Boolean))].join(" ");
    const mergedConfidence = group.every((item) => item.confidence === "high") ? "high" : group.some((item) => item.confidence === "low") ? "low" : "medium";

    tables.cases.push({
      id: caseId,
      slug: canonicalLegacyId,
      title: base.title,
      publication_state: "published",
      current_status: base.status_label,
      date_start: base.date_start,
      date_end: base.date_end ?? null,
      summary: base.summary,
      significance: base.why_it_matters,
      editorial_caution: mergedEditorialCaution || null,
      confidence: mergedConfidence,
      current_revision: 1,
      first_published_at: generatedAt,
      last_reviewed_at: generatedAt,
      created_at: caseCreatedAt,
      updated_at: caseCreatedAt,
    });

    tables.case_revisions.push({
      id: stableId("caserev", caseId, "1"),
      case_id: caseId,
      revision_number: 1,
      title: base.title,
      current_status: base.status_label,
      summary: base.summary,
      significance: base.why_it_matters,
      editorial_caution: mergedEditorialCaution || null,
      change_summary: "Initial normalized import from the source-backed JSON archive.",
      created_by: "legacy-json-import",
      supersedes_revision_id: null,
      created_at: caseCreatedAt,
    });

    for (const item of group) {
      const isSuppressedDuplicate = canonicalCaseIds.has(item.id);
      tables.case_aliases.push({
        legacy_id: item.id,
        case_id: caseId,
        source_lane: item.lane,
        created_at: generatedAt,
      });

      const categorySlug = slugify(item.category);
      const categoryId = stableId("cat", categorySlug);
      categoryRows.set(categoryId, {
        id: categoryId,
        slug: categorySlug,
        label: item.category,
        description: null,
        created_at: generatedAt,
      });
      tables.case_categories.push({
        case_id: caseId,
        category_id: categoryId,
        is_primary: item.id === base.id ? 1 : 0,
        created_at: generatedAt,
      });

      for (const tag of item.tags ?? []) {
        const tagSlug = slugify(tag);
        const tagId = stableId("tag", tagSlug);
        tagRows.set(tagId, { id: tagId, slug: tagSlug, label: tag, created_at: generatedAt });
        tables.case_tags.push({ case_id: caseId, tag_id: tagId, created_at: generatedAt });
      }

      for (const name of item.people ?? []) {
        const type = entityType(name);
        const entitySlug = slugify(name);
        const entityId = stableId("ent", type, entitySlug);
        entityRows.set(entityId, {
          id: entityId,
          slug: entitySlug,
          entity_type: type,
          name,
          description: null,
          created_at: generatedAt,
          updated_at: generatedAt,
        });
        tables.case_entities.push({ case_id: caseId, entity_id: entityId, role: "subject", created_at: generatedAt });
      }

      const factualClaimId = stableId("claim", caseId, item.id, "factual");
      const editorialClaimId = stableId("claim", caseId, item.id, "editorial");
      const factualStatus = claimStatus(item.status_label);
      const publicationState = isSuppressedDuplicate ? "review" : "published";
      const claimRows = [
        {
          id: factualClaimId,
          case_id: caseId,
          claim_key: `record:${item.id}`,
          claim_type: "factual",
          claim_status: factualStatus,
          text: item.summary,
          attribution: factualStatus === "attributed" ? item.status_label : null,
          response_summary: null,
          publication_state: publicationState,
          current_revision: 1,
          sort_order: 10,
          last_reviewed_at: generatedAt,
          created_at: generatedAt,
          updated_at: generatedAt,
        },
        {
          id: editorialClaimId,
          case_id: caseId,
          claim_key: `analysis:${item.id}`,
          claim_type: item.lane === "faith" ? "faith_analysis" : "editorial_analysis",
          claim_status: "editorial_opinion",
          text: item.why_it_matters,
          attribution: "TDS editorial analysis",
          response_summary: null,
          publication_state: publicationState,
          current_revision: 1,
          sort_order: 20,
          last_reviewed_at: generatedAt,
          created_at: generatedAt,
          updated_at: generatedAt,
        },
      ];
      tables.claims.push(...claimRows);

      for (const claim of claimRows) {
        tables.claim_revisions.push({
          id: stableId("claimrev", claim.id, "1"),
          claim_id: claim.id,
          revision_number: 1,
          claim_status: claim.claim_status,
          text: claim.text,
          attribution: claim.attribution,
          response_summary: claim.response_summary,
          change_summary: "Initial normalized import from the source-backed JSON archive.",
          created_by: "legacy-json-import",
          created_at: generatedAt,
        });
      }

      const itemSources = [];
      for (const source of item.evidence ?? []) {
        const normalizedUrl = canonicalUrl(source.url);
        const sourceId = stableId("src", normalizedUrl);
        const tier = authorityTier(source.source_type);
        if (!sourceRows.has(sourceId)) {
          sourceRows.set(sourceId, {
            id: sourceId,
            canonical_url: normalizedUrl,
            original_url: source.url,
            title: source.label,
            publisher: source.publisher,
            source_type: source.source_type,
            authority_tier: tier,
            publication_date: source.published ?? null,
            retrieved_at: `${source.accessed ?? generatedDate}T00:00:00.000Z`,
            last_checked_at: `${source.accessed ?? generatedDate}T00:00:00.000Z`,
            archive_url: null,
            access_state: "active",
            copyright_handling: "link_only",
            mime_type: /\.pdf(?:$|\?)/i.test(source.url) ? "application/pdf" : null,
            created_at: generatedAt,
            updated_at: generatedAt,
          });
        }
        itemSources.push({ sourceId, tier });
      }

      for (const claim of claimRows) {
        for (const { sourceId, tier } of itemSources) {
          const relationKey = `${claim.id}\u001f${sourceId}`;
          if (claimSourceKeys.has(relationKey)) continue;
          claimSourceKeys.add(relationKey);
          tables.claim_sources.push({
            id: stableId("cite", claim.id, sourceId),
            claim_id: claim.id,
            source_id: sourceId,
            relationship: claim.claim_type === "factual" ? "supports" : "contextualizes",
            locator: null,
            excerpt: null,
            excerpt_word_count: 0,
            citation_note: `Imported from the ${item.lane} research lane. Add a page, section, paragraph, or timestamp locator before quoting this source.`,
            is_primary: ["primary", "official", "scripture"].includes(tier) ? 1 : 0,
            created_at: generatedAt,
          });
        }
      }

      tables.legal_status_events.push({
        id: stableId("status", caseId, item.id),
        case_id: caseId,
        claim_id: factualClaimId,
        source_id: itemSources[0]?.sourceId ?? null,
        event_date: item.date_end ?? item.date_start,
        event_type: eventType(item.status_label),
        status_label: item.status_label,
        jurisdiction: null,
        court_or_agency: null,
        docket_number: null,
        is_current: item.id === base.id ? 1 : 0,
        notes: item.editorial_note ?? null,
        created_at: generatedAt,
      });

      for (const teaching of item.christian_teaching ?? []) {
        const principleId = stableId("faith", teaching.citation, teaching.url);
        faithRows.set(principleId, {
          id: principleId,
          slug: `${slugify(`${teaching.citation}-${teaching.principle}`).slice(0, 88)}-${principleId.slice(-8)}`,
          tradition: null,
          citation: teaching.citation,
          principle: teaching.principle,
          url: teaching.url,
          created_at: generatedAt,
          updated_at: generatedAt,
        });
        const existing = tables.case_faith_principles.find((row) => row.case_id === caseId && row.principle_id === principleId);
        if (!existing) {
          tables.case_faith_principles.push({
            id: stableId("casefaith", caseId, principleId),
            case_id: caseId,
            principle_id: principleId,
            source_claim_id: editorialClaimId,
            analysis: item.why_it_matters,
            current_revision: 1,
            reviewed_at: generatedAt,
            created_at: generatedAt,
            updated_at: generatedAt,
          });
        }
      }
    }
  }

  tables.categories = [...categoryRows.values()];
  tables.tags = [...tagRows.values()];
  tables.entities = [...entityRows.values()];
  tables.sources = [...sourceRows.values()];
  tables.faith_principles = [...faithRows.values()];
  tables.case_entities = dedupeRows(tables.case_entities, (row) => `${row.case_id}\u001f${row.entity_id}\u001f${row.role}`);
  tables.case_categories = dedupeRows(
    tables.case_categories,
    (row) => `${row.case_id}\u001f${row.category_id}`,
    (current, incoming) => ({ ...current, is_primary: Math.max(current.is_primary, incoming.is_primary) }),
  );
  tables.case_tags = dedupeRows(tables.case_tags, (row) => `${row.case_id}\u001f${row.tag_id}`);

  for (const table of tableOrder) sortRows(tables[table]);

  const counts = Object.fromEntries(tableOrder.map((table) => [table, tables[table].length]));
  counts.import_runs = 1;
  tables.import_runs.push({
    id: stableId("import", "1.0.0", sourceHash),
    format_version: "1.0.0",
    source_commit: sourceCommit,
    source_hash: sourceHash,
    record_counts_json: JSON.stringify(counts),
    status: "prepared",
    notes: "Portable seed generated from the legacy JSON archive. No production D1 or R2 resource was provisioned.",
    imported_at: generatedAt,
  });

  return {
    format: "tds-archive-export",
    version: "1.0.0",
    generated_at: generatedAt,
    source: {
      files: researchLanes.map(({ file }) => file),
      sha256: sourceHash,
      commit: sourceCommit,
    },
    counts,
    tables,
  };
}

function assert(condition, message, errors) {
  if (!condition) errors.push(message);
}

export function validateArchiveExport(archive) {
  const errors = [];
  assert(archive?.format === "tds-archive-export", "Unexpected export format", errors);
  assert(archive?.version === "1.0.0", "Unexpected export version", errors);

  for (const table of tableOrder) assert(Array.isArray(archive?.tables?.[table]), `Missing table ${table}`, errors);
  if (errors.length) return errors;

  const ids = {};
  for (const table of tableOrder) {
    const rows = archive.tables[table];
    const rowsWithIds = rows.filter((row) => row.id !== undefined);
    ids[table] = new Set(rowsWithIds.map((row) => row.id));
    assert(ids[table].size === rowsWithIds.length, `${table} contains duplicate ids`, errors);
    assert(archive.counts[table] === rows.length, `${table} count does not match manifest`, errors);
  }

  const caseIds = ids.cases;
  const claimIds = ids.claims;
  const sourceIds = ids.sources;
  const entityIds = ids.entities;
  const categoryIds = ids.categories;
  const tagIds = ids.tags;
  const faithIds = ids.faith_principles;

  for (const row of archive.tables.case_aliases) assert(caseIds.has(row.case_id), `Alias ${row.legacy_id} references a missing case`, errors);
  for (const row of archive.tables.case_revisions) assert(caseIds.has(row.case_id), `Case revision ${row.id} references a missing case`, errors);
  for (const row of archive.tables.claims) assert(caseIds.has(row.case_id), `Claim ${row.id} references a missing case`, errors);
  for (const row of archive.tables.claim_revisions) assert(claimIds.has(row.claim_id), `Claim revision ${row.id} references a missing claim`, errors);
  for (const row of archive.tables.claim_sources) {
    assert(claimIds.has(row.claim_id), `Citation ${row.id} references a missing claim`, errors);
    assert(sourceIds.has(row.source_id), `Citation ${row.id} references a missing source`, errors);
    assert(row.excerpt_word_count >= 0 && row.excerpt_word_count <= 100, `Citation ${row.id} exceeds the excerpt limit`, errors);
  }
  for (const row of archive.tables.case_entities) {
    assert(caseIds.has(row.case_id), "Case-entity row references a missing case", errors);
    assert(entityIds.has(row.entity_id), "Case-entity row references a missing entity", errors);
  }
  for (const row of archive.tables.case_categories) {
    assert(caseIds.has(row.case_id), "Case-category row references a missing case", errors);
    assert(categoryIds.has(row.category_id), "Case-category row references a missing category", errors);
  }
  for (const row of archive.tables.case_tags) {
    assert(caseIds.has(row.case_id), "Case-tag row references a missing case", errors);
    assert(tagIds.has(row.tag_id), "Case-tag row references a missing tag", errors);
  }
  for (const row of archive.tables.case_faith_principles) {
    assert(caseIds.has(row.case_id), `Faith comparison ${row.id} references a missing case`, errors);
    assert(faithIds.has(row.principle_id), `Faith comparison ${row.id} references a missing principle`, errors);
    assert(!row.source_claim_id || claimIds.has(row.source_claim_id), `Faith comparison ${row.id} references a missing claim`, errors);
  }
  for (const row of archive.tables.sources) {
    assert(/^https:\/\//.test(row.canonical_url), `Source ${row.id} must use HTTPS`, errors);
    assert(Boolean(row.retrieved_at), `Source ${row.id} needs a retrieval date`, errors);
    assert(row.copyright_handling === "link_only", `Legacy source ${row.id} must default to link_only`, errors);
  }

  const aliasesByCase = new Map();
  for (const row of archive.tables.case_aliases) aliasesByCase.set(row.case_id, (aliasesByCase.get(row.case_id) ?? 0) + 1);
  const revisionsByCase = new Map();
  for (const row of archive.tables.case_revisions) revisionsByCase.set(row.case_id, (revisionsByCase.get(row.case_id) ?? 0) + 1);
  const citationsByClaim = new Map();
  for (const row of archive.tables.claim_sources) citationsByClaim.set(row.claim_id, (citationsByClaim.get(row.claim_id) ?? 0) + 1);
  const revisionsByClaim = new Map();
  for (const row of archive.tables.claim_revisions) revisionsByClaim.set(row.claim_id, (revisionsByClaim.get(row.claim_id) ?? 0) + 1);

  for (const row of archive.tables.cases) {
    assert((aliasesByCase.get(row.id) ?? 0) >= 1, `Case ${row.id} has no legacy-id mapping`, errors);
    assert((revisionsByCase.get(row.id) ?? 0) >= 1, `Case ${row.id} has no revision`, errors);
  }
  for (const row of archive.tables.claims) {
    assert((citationsByClaim.get(row.id) ?? 0) >= 1, `Claim ${row.id} has no citation`, errors);
    assert((revisionsByClaim.get(row.id) ?? 0) >= 1, `Claim ${row.id} has no revision`, errors);
  }

  assert(archive.tables.document_snapshots.length === 0, "R2 snapshots must remain empty before R2 activation", errors);
  assert(archive.tables.editorial_reviews.length === 0, "Legacy import must not invent completed editorial reviews", errors);
  assert(archive.tables.corrections.length === 0, "Legacy import must not invent corrections", errors);
  return errors;
}

function sqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "1" : "0";
  return `'${String(value).replaceAll("'", "''")}'`;
}

export function toD1Sql(archive) {
  const errors = validateArchiveExport(archive);
  if (errors.length) throw new Error(errors.join("\n"));

  const statements = [
    "-- TDS Archive portable D1 seed v1.0.0",
    `-- Source SHA-256: ${archive.source.sha256}`,
    "-- Apply the generated Drizzle migration before this file.",
    "-- Intentionally omits transaction wrappers for D1 import compatibility.",
    "",
  ];

  for (const table of tableOrder) {
    for (const row of archive.tables[table]) {
      const columns = Object.keys(row);
      const names = columns.map((column) => `"${column}"`).join(", ");
      const values = columns.map((column) => sqlValue(row[column])).join(", ");
      statements.push(`INSERT INTO "${table}" (${names}) VALUES (${values});`);
    }
  }

  return `${statements.join("\n")}\n`;
}

export { tableOrder };
