# TDS — The Evidence Archive

TDS is an explicitly critical, evidence-first archive of Donald Trump’s public record, the people and institutions enabling it, and the contradiction between Trumpism and Christian teaching.

The editorial argument is forceful; the evidence standard is deliberately conservative. Case files distinguish jury verdicts, court findings, official investigations, charges, allegations, settlements, dismissals, appeals, political judgments, direct statements, reporting, and editorial analysis.

The public information architecture keeps four primary header sections and a linked suite of five evidence tests:

- **Evidence** is the main searchable case-file archive. Relevant case-level Christianity Tests remain visible beside the documented conduct.
- **Voices** hosts the Rooftops, Blind Eyes, and Anti Christ projects.
- **Tests** is the springboard for the Christianity, Patriotic, America First, Deal, and World Standing tests.
- **Christianity Test** explains the teaching-based comparison.
- **Patriotic Test** compares documented conduct with constitutional loyalty, rule of law, free elections, checks and balances, free speech and press, equal citizenship, and the public-trust obligations of office.
- **America First Test** measures foreign policy against American security, prosperity, constitutional war powers, alliances, sovereignty, diplomatic capacity, and durable credibility.
- **Deal Test** audits business, subsidy, diplomatic, trade, and foreign-government transactions by promise, leverage, concessions, verification, delivery, durability, public cost, and beneficiary.
- **World Standing Test** measures the effect of conduct on U.S. credibility, alliances, expertise, financial influence, and global leverage.
- **Methods** publishes the source hierarchy, status language, defamation safeguards, revision rules, and prepublication workflow.

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

The research catalog contains 85 raw case files and 231 evidence links. The public site presents 81 canonical files after suppressing four purely duplicative legal/business records. See `research/README.md` for the lane breakdown and maintenance notes, and `EDITORIAL_STANDARDS.md` for the defamation, status-language, trademark, and prepublication rules.

The July 14 expansion adds 14 **America First** records and 10 **Deal** records. It covers Trump administration action involving Marco Rubio, J.D. Vance, and Stephen Miller where a specific role is evidenced; institutional withdrawal; NATO and allied coercion; Ukraine; Iran; Venezuela; tariffs; immigration due process; the foreign service; business failures; subsidy announcements; summit diplomacy; Afghanistan; and the Qatari aircraft gift. Unsupported or misleading shorthand is narrowed, excluded, or held in `docs/EDITORIAL_REVIEW_LOG.md` rather than presented as a public-facing corrections feature.

The site also includes two complementary church-witness directories: **Rooftops** amplifies Christians resisting Christian nationalism, while **Blind Eyes** documents eight leaders, churches, networks, and political ministries that advance, normalize, or religiously legitimize it. Blind Eyes uses 24 claim-specific evidence records, publishes denials and limiting context beside the criticism, and labels its scriptural comparisons as editorial analysis.

**Anti Christ** organizes Trump's documented conduct into eight teaching-based categories, presents five headline cases in each, and provides an expanded 47-case source collection with short recorded quotations and direct transcript or video links. The title is used in the plain two-word sense—conduct against Christ's teaching—not as an apocalyptic identification.

The database-ready schema and migration plan live in `docs/ARCHIVE_DATA_ARCHITECTURE.md`. D1 and R2 remain inactive; the public site continues to read the reviewed JSON research until the documented activation and shadow-read gates are satisfied.

## iPhone app

The first native SwiftUI companion lives in `ios/TDSArchive`. It includes all 81 canonical case files, search, category filters, sources, test lenses, share links, the Voices collections, and the Methods summary.

Refresh its offline evidence bundle from the canonical website data with:

```bash
pnpm mobile:export
```

Open `ios/TDSArchive/TDSArchive.xcodeproj` in Xcode and run the `TDSArchive` scheme on an iPhone simulator. See `ios/README.md` for the first-version scope.

## Deployment

The workflow in `.github/workflows/pages.yml` builds the static export and deploys it to GitHub Pages on every push to `main`.
