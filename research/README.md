# Research catalog

The launch research was completed on July 13, 2026 in three independent lanes:

- `legal_power.json` — 19 legal, accountability, democracy, clemency, conflict, immigration, and oversight records.
- `conduct_family.json` — 20 public-conduct, falsehood, family/business, and Republican-enabling records.
- `faith_movements.json` — 21 Christianity, Christian-nationalism, MAGA, America First, Heritage, and Project 2025 records, with 42 linked teaching references.

Together the files contain 60 researched records and 163 direct evidence links. The public site publishes 56 case files because four business/legal entries that were duplicated across research lanes are suppressed in `data/cases.ts`. Faith entries remain separate when they apply a distinct moral analysis to an event covered elsewhere.

`blind-eyes/directory.json` is a separate, profile-based accountability directory. Its first edition contains eight Christian leaders, churches, networks, or political ministries, 24 claim-specific evidence records, and 16 linked Christian-teaching references. Each profile preserves its alignment level and a visible denial, response, or limiting-context field; inclusion is never based on association alone.

`anti-christ/directory.json` curates the reviewed archive into eight moral categories with five headline selections per category and an expanded 47-case collection. Four page-specific direct-record cases cover recorded statements not previously represented in the main 56-case archive. “Anti Christ” is explicitly defined as conduct opposed to Christ's teaching—not a claim about the prophetic Antichrist or a judgment of Trump's soul. Moral headings never replace the underlying procedural status.

Each JSON record includes a status label, summary, significance statement, evidence list, tags, confidence, and an editorial caution. Those cautions are part of the maintenance record even when they are not shown verbatim on the public card.

Apply the prepublication gate in `../EDITORIAL_STANDARDS.md` before a new record is published. A linked source does not by itself make a repeated allegation safe or accurate.

Run:

```bash
npm run audit:research
npm run audit:archive
npm run audit:links
npm run audit:voices
npm run audit:blind-eyes
npm run audit:anti-christ
npm run archive:export
```

`archive:export` creates a deterministic normalized JSON export and a D1-compatible SQL seed under ignored `outputs/`. It does not provision or write to a cloud database. The permanent-ID rules, normalized table map, activation gates, backup policy, and migration runbook are documented in `../docs/ARCHIVE_DATA_ARCHITECTURE.md`; the portable format is defined in `formats/archive-export-v1.schema.json`.

The link audit treats access restrictions such as `403` and `429` separately from dead links because many courts, Congress, USCCB, Heritage, and document hosts reject automated requests while remaining available in a browser.
