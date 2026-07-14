# TDS — The Evidence Archive

TDS is an explicitly critical, evidence-first archive of Donald Trump’s public record, the people and institutions enabling it, and the contradiction between Trumpism and Christian teaching.

The editorial argument is forceful; the evidence standard is deliberately conservative. Case files distinguish jury verdicts, court findings, official investigations, charges, allegations, settlements, dismissals, appeals, political judgments, direct statements, reporting, and editorial analysis.

The public information architecture has four primary sections:

- **Evidence** is the main searchable case-file archive. Relevant case-level Christianity Tests remain visible beside the documented conduct.
- **Christianity Test** explains the teaching-based comparison and hosts the Rooftops, Blind Eyes, and Anti Christ projects.
- **Patriotic Test** compares documented conduct with constitutional loyalty, rule of law, free elections, checks and balances, free speech and press, equal citizenship, and the public-trust obligations of office.
- **Methodology** publishes the source hierarchy, status language, defamation safeguards, revision rules, and prepublication workflow.

## Local development

```bash
npm install
npm run dev
```

The Vinext development server supports the local Codex preview. GitHub Pages uses the static Next.js export:

```bash
npm run build:pages
npm test
```

## Evidence maintenance

- Research notes live in `research/`.
- Published case files live in `data/cases.ts`.
- Prefer courts, agencies, Congress, official transcripts, and direct records.
- Preserve the procedural status of every claim.
- Add material reversals, dismissals, appeals, and corrections to the record.
- Never treat association, family relationship, party membership, or religious identity as proof of misconduct.
- Run the deterministic archive portability audit before changing the database schema or import format.

The research catalog contains 60 raw case files, 163 evidence links, and 42 Christian-teaching links. The public site presents 56 files after suppressing four purely duplicative legal/business records. See `research/README.md` for the lane breakdown and maintenance notes, and `EDITORIAL_STANDARDS.md` for the defamation, status-language, trademark, and prepublication rules.

The site also includes two complementary church-witness directories: **Rooftops** amplifies Christians resisting Christian nationalism, while **Blind Eyes** documents eight leaders, churches, networks, and political ministries that advance, normalize, or religiously legitimize it. Blind Eyes uses 24 claim-specific evidence records, publishes denials and limiting context beside the criticism, and labels its scriptural comparisons as editorial analysis.

**Anti Christ** organizes Trump's documented conduct into eight teaching-based categories, presents five headline cases in each, and provides an expanded 47-case source collection with short recorded quotations and direct transcript or video links. The title is used in the plain two-word sense—conduct against Christ's teaching—not as an apocalyptic identification.

The database-ready schema and migration plan live in `docs/ARCHIVE_DATA_ARCHITECTURE.md`. D1 and R2 remain inactive; the public site continues to read the reviewed JSON research until the documented activation and shadow-read gates are satisfied.

## Deployment

The workflow in `.github/workflows/pages.yml` builds the static export and deploys it to GitHub Pages on every push to `main`.
