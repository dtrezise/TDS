# Archive data architecture and migration plan

Status: **schema-ready; storage not activated**
Decision date: July 13, 2026

## Decision

Keep the current JSON research files and static site operational while establishing a portable, normalized database model now. Do not provision D1 or R2 merely because the model exists.

The activation sequence is:

1. D1 at roughly 250–500 canonical cases, or sooner when collaborative editing or incremental publishing requires durable shared state.
2. R2 when the project begins preserving permitted documents, screenshots, media, or database exports.
3. Server-side filtering and full-text search at roughly 1,000 cases, or earlier if the static client bundle becomes materially slow.
4. Automated D1 exports to R2 after both resources are active, in addition to Git history and D1 Time Travel.

The thresholds are operational gates, not hard capacity limits. Editorial workflow, corrections, shared sources, and legal-status history may justify activation before raw size does.

## Current baseline

The source archive contains:

- 60 raw research records in three lanes.
- 56 canonical cases after four duplicate legal/business records are mapped to their canonical cases.
- 163 source references, normalizing to 149 unique URLs.
- 42 Christianity teaching references.
- Approximately 171 KB of core research JSON.

The v1 conversion produces 120 claims—one factual record claim for every raw record, plus 39 editorial-analysis and 21 faith-analysis claims—and 326 claim-to-source citation relationships. Evidence directly `supports` the factual claims and `contextualizes` the analysis claims. The eight claims produced from the four suppressed duplicate records remain in `review`, not `published`, state.

## Account and binding audit

The configured TDS Sites project is active and deployed. `.openai/hosting.json` intentionally retains:

```json
{
  "d1": null,
  "r2": null
}
```

The local Cloudflare CLI is not authenticated, so the personal Cloudflare account plan and any unrelated D1 or R2 resources cannot be enumerated from this workspace. No resource was created and no billing-sensitive change was made.

`DAN NEEDED` before activation: authenticate Cloudflare locally through the browser-based Wrangler login flow or an approved connector, then confirm whether TDS should use the Sites-managed project or a separately administered Cloudflare account. Do not send passwords, API tokens, recovery codes, or copied session credentials.

## Data ownership

| Layer | Purpose | Authority |
| --- | --- | --- |
| `research/*.json` | Human-readable research lanes during the transition | Current editorial source |
| Portable export v1 | Deterministic normalized transfer format | Migration and backup artifact |
| D1 | Structured runtime records after activation | Future application source |
| R2 | Permitted document bytes and exported backups | Future object store |
| Git | Code, schema migrations, research history, and export tooling | Durable change history |
| FTS5 tables | Rebuildable search index | Never authoritative |

The static site continues to read `research/*.json` through `data/cases.ts` until a shadow-read comparison proves that D1 returns the same published record.

## Permanent identifiers

The portable exporter creates deterministic opaque IDs using a type prefix and a truncated SHA-256 digest:

- `case_…` for canonical cases.
- `claim_…` for independently reviewable assertions or analysis.
- `src_…` for canonical source URLs.
- `cite_…` for claim-to-source relationships.
- Equivalent prefixes for revisions, entities, status events, faith principles, and imports.

The readable slug is stored separately and may change without changing the permanent ID. Every legacy JSON ID is retained in `case_aliases`, including the four IDs mapped to canonical cases.

## Normalized model

### Editorial record

- `cases` stores the current case-level presentation and publication state.
- `case_aliases` maps every historical JSON ID to a permanent case.
- `case_revisions` preserves append-only snapshots and change summaries.
- `claims` separates factual statements, allegations, attribution, procedural status, editorial analysis, and faith analysis.
- `claim_revisions` preserves the text, status, attribution, response summary, and editor responsible for each version.

### Evidence and status

- `sources` stores one canonical source record, retrieval/check dates, authority tier, access state, and copyright-handling decision.
- `claim_sources` states whether a source supports, contradicts, contextualizes, documents status, contains a denial, or contains a response. It also stores a precise locator and a short excerpt when editorially justified.
- `legal_status_events` records charges, verdicts, liability findings, settlements, appeals, reversals, dismissals, clemency, official findings, and other status changes without overwriting history.
- `document_snapshots` stores R2 object metadata, checksum, size, media type, and reviewed rights basis. It remains empty until R2 activation.

### Classification and analysis

- `entities`, `entity_aliases`, and `case_entities` model people, organizations, movements, agencies, and their evidenced role in a case.
- `categories`, `case_categories`, `tags`, and `case_tags` support filtering without copying text labels into every record.
- `faith_principles` and `case_faith_principles` keep the cited Christian teaching separate from the project’s editorial comparison.

### Accountability workflow

- `editorial_reviews` records source, legal-status, defamation, headline, faith, correction, and link reviews with explicit outcomes.
- `corrections` preserves the previous text, corrected text, explanation, source, and publication date.
- `import_runs` records format version, source commit, source hash, counts, and import outcome.

## Publication invariants

Before D1 becomes authoritative, application code must enforce these rules in addition to database constraints:

1. A published factual or procedural claim has at least one source relationship.
2. Every source has a retrieval date, authority tier, access state, and copyright-handling classification.
3. Court opinions, filings, transcripts, video, audio, and long reports have a page, paragraph, section, exhibit, or timestamp locator before quotation.
4. Every unresolved accusation identifies the accuser or reporting source and records a denial or response when available.
5. Every legal-status change is appended as an event; earlier status is not silently overwritten.
6. Published revisions and corrections are append-only.
7. Editorial analysis and faith analysis remain labeled and are never stored as adjudicated facts.
8. A document enters R2 only after its rights basis is recorded. Copyrighted reporting defaults to `link_only`.
9. Headline, defamation/status, and source reviews must be approved before a newly investigated accusation is published.
10. A stale legal-status review can remove a claim from publication until it is refreshed.

The legacy import deliberately creates no completed review or correction records. It must not manufacture an audit trail that did not previously exist.

## Portable export and import

The versioned format is defined by `research/formats/archive-export-v1.schema.json`. It contains:

- A format and semantic version.
- A deterministic hash of the research inputs.
- An optional Git commit.
- Per-table record counts.
- Tables in foreign-key-safe import order.

Generate the portable JSON export and a D1-compatible SQL seed:

```bash
npm run archive:export
```

Generated files are written beneath ignored `outputs/` so research content is not duplicated in Git. The SQL seed deliberately omits `BEGIN TRANSACTION` and `COMMIT` wrappers for D1 import compatibility. Apply the Drizzle migration before the seed.

The portability audit rebuilds the export in memory, checks permanent-ID determinism, validates foreign keys and citation coverage, and loads the migration plus seed into an ephemeral SQLite database:

```bash
npm run audit:archive
node --test tests/archive-portability.test.mjs
```

## D1 activation runbook

Do not skip the shadow period.

1. Freeze a reviewed Git commit and run research, archive, link, build, and rendered-page tests.
2. Generate the portable JSON and SQL seed with that commit recorded in the manifest.
3. Apply the Drizzle migration and seed to a local SQLite/D1 environment.
4. Reconcile counts, permanent IDs, publication state, source links, and four duplicate-case mappings.
5. After account authentication and plan confirmation, change only the logical D1 binding to `DB` and deploy a private version.
6. Import the reviewed seed into the new D1 database.
7. Run the application in shadow-read mode: JSON continues serving the public page while D1 responses are compared automatically.
8. Require exact agreement for case count, claim count, published IDs, status labels, and citation URLs.
9. Switch the read path to D1 only after the comparison passes and a rollback export has been saved.
10. Keep the JSON importer for at least one release as the rollback path.

## R2 activation and document policy

Use an `EVIDENCE` logical binding only when an approved document needs preservation. Recommended object keys are immutable and content-addressed:

```text
sources/<source_id>/<sha256>.<extension>
exports/<yyyy>/<mm>/<timestamp>-<source_hash>.sql.gz
```

Do not overwrite an existing object key. A new capture creates a new `document_snapshots` row and object. The D1 row—not the filename—states which snapshot is current.

Preserve full copies only when the project has a recorded basis such as public domain, a government record available for redistribution, permission, or a specifically reviewed limited use. For ordinary copyrighted journalism, retain the URL, metadata, locator, a restrained excerpt if needed, and the project’s independent analysis—not a wholesale copy.

## Search activation

At the search gate, add an FTS5 virtual table over published case titles, summaries, claim text, entity names, and source titles. Treat it as a cache:

- Rebuild it from authoritative tables after an import or restore.
- Do not include it in the portable export.
- Keep filters for status, category, entity, date, and source tier on ordinary indexed tables.
- Use pagination and return only fields needed by the result card.

D1 exports do not include virtual tables, so the restore runbook must explicitly recreate and repopulate FTS5.

## Backup and restore plan after activation

- Git retains reviewed research inputs, schema, migration, and export tooling on every change.
- D1 Time Travel provides the platform recovery window.
- Schedule a full D1 SQL export to R2 at least weekly; increase to daily when publication becomes collaborative or continuous.
- Keep monthly exports outside the rolling short-term set.
- Run a quarterly restore rehearsal into a nonproduction database and compare counts and hashes.
- Rebuild FTS5 after every restore.
- Record the backup source hash and restore rehearsal in `import_runs` or an operations log.

Official platform references:

- [D1 limits](https://developers.cloudflare.com/d1/platform/limits/)
- [D1 import and export](https://developers.cloudflare.com/d1/best-practices/import-export-data/)
- [D1 Time Travel and backups](https://developers.cloudflare.com/d1/reference/time-travel/)
- [D1 SQL and FTS5 support](https://developers.cloudflare.com/d1/sql-api/sql-statements/)
- [R2 limits](https://developers.cloudflare.com/r2/platform/limits/)

## Rollback

Until the D1 cutover is complete, rollback means restoring the previous application commit; the public site continues reading JSON. After cutover, rollback means deploying the last known-good application version and importing the matching portable export into a fresh D1 database rather than destructively rewriting the failed database in place.
