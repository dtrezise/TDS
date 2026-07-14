# Research catalog

The launch research was completed on July 13, 2026 in three independent lanes:

- `legal_power.json` — 19 legal, accountability, democracy, clemency, conflict, immigration, and oversight records.
- `conduct_family.json` — 20 public-conduct, falsehood, family/business, and Republican-enabling records.
- `faith_movements.json` — 21 Christianity, Christian-nationalism, MAGA, America First, Heritage, and Project 2025 records, with 42 linked teaching references.

Together the files contain 60 researched records and 163 direct evidence links. The public site publishes 56 case files because four business/legal entries that were duplicated across research lanes are suppressed in `data/cases.ts`. Faith entries remain separate when they apply a distinct moral analysis to an event covered elsewhere.

Each JSON record includes a status label, summary, significance statement, evidence list, tags, confidence, and an editorial caution. Those cautions are part of the maintenance record even when they are not shown verbatim on the public card.

Apply the prepublication gate in `../EDITORIAL_STANDARDS.md` before a new record is published. A linked source does not by itself make a repeated allegation safe or accurate.

Run:

```bash
npm run audit:research
npm run audit:links
```

The link audit treats access restrictions such as `403` and `429` separately from dead links because many courts, Congress, USCCB, Heritage, and document hosts reject automated requests while remaining available in a browser.
