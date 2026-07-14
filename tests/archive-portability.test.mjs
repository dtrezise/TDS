import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { buildArchiveExport, toD1Sql, validateArchiveExport } from "../scripts/lib/archive-export.mjs";

test("keeps cloud storage inactive until the activation gate is approved", async () => {
  const hosting = JSON.parse(await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"));

  assert.equal(hosting.d1, null);
  assert.equal(hosting.r2, null);
});

test("normalizes the legacy research into a deterministic portable archive", async () => {
  const first = await buildArchiveExport();
  const second = await buildArchiveExport();

  assert.deepEqual(first, second);
  assert.deepEqual(validateArchiveExport(first), []);
  assert.equal(first.counts.cases, 80);
  assert.equal(first.counts.case_aliases, 84);
  assert.equal(first.counts.claims, 168);
  assert.equal(first.counts.sources, 210);
  assert.equal(first.counts.claim_sources, 454);
  assert.equal(first.counts.document_snapshots, 0);
  assert.equal(first.counts.editorial_reviews, 0);
  assert.equal(first.counts.corrections, 0);
  assert.equal(first.tables.claims.filter((claim) => claim.claim_type === "editorial_analysis").length, 63);
  assert.equal(first.tables.claims.filter((claim) => claim.claim_type === "faith_analysis").length, 21);
  assert.equal(first.tables.claim_sources.filter((citation) => citation.relationship === "supports").length, 227);
  assert.equal(first.tables.claim_sources.filter((citation) => citation.relationship === "contextualizes").length, 227);

  const reviewClaims = first.tables.claims.filter((claim) => claim.publication_state === "review");
  assert.equal(reviewClaims.length, 8, "four suppressed duplicate records should create two review-state claims each");
  assert.ok(first.tables.claim_sources.every((citation) => citation.citation_note && citation.excerpt_word_count === 0));
  assert.ok(first.tables.sources.every((source) => source.retrieved_at && source.copyright_handling === "link_only"));
});

test("generates a D1-compatible seed that loads after the Drizzle migration", async () => {
  const archive = await buildArchiveExport();
  const seedSql = toD1Sql(archive);

  assert.doesNotMatch(seedSql, /BEGIN TRANSACTION|COMMIT;/i);
  assert.match(seedSql, /INSERT INTO "claims"/);
  assert.match(seedSql, /INSERT INTO "claim_sources"/);
  assert.match(seedSql, /INSERT INTO "import_runs"/);

  const migrationFiles = (await readdir(new URL("../drizzle/", import.meta.url)))
    .filter((file) => file.endsWith(".sql"))
    .sort();
  assert.ok(migrationFiles.length >= 1, "expected a generated Drizzle migration");
  const migrations = await Promise.all(
    migrationFiles.map((file) => readFile(new URL(`../drizzle/${file}`, import.meta.url), "utf8")),
  );
  const output = execFileSync("/usr/bin/sqlite3", [":memory:"], {
    encoding: "utf8",
    input: `PRAGMA foreign_keys=ON;\n${migrations.join("\n")}\n${seedSql}\nSELECT count(*) FROM cases;\nSELECT count(*) FROM claims;\nSELECT count(*) FROM claim_sources;\n`,
  });

  assert.equal(output.trim(), "80\n168\n454");
});
