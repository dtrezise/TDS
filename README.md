# TDS — The Evidence Archive

TDS is an explicitly critical, evidence-first archive of Donald Trump’s public record, the people and institutions enabling it, and the contradiction between Trumpism and Christian teaching.

The editorial argument is forceful; the evidence standard is deliberately conservative. Case files distinguish jury verdicts, court findings, official investigations, charges, allegations, settlements, dismissals, appeals, political judgments, direct statements, reporting, and editorial analysis.

The public information architecture keeps six primary header sections and a linked suite of five evidence tests:

- **What’s New** is a rolling 14-day index of newly published or materially updated Evidence and Voices records. Items link to permanent archive locations and leave the index—not the archive—after the window closes.
- **Evidence** is the main searchable case-file archive. Relevant case-level Christianity Tests remain visible beside the documented conduct.
- **Voices** hosts the Rooftops, Blind Eyes, and Anti Christ projects.
- **Tests** is the springboard for the Christianity, Patriotic, America First, Deal, and World Standing tests.
- **Methods** publishes the source hierarchy, status language, defamation safeguards, revision rules, and prepublication workflow.
- **Archive** is the compact, searchable chronology of all 124 Evidence case files and 43 top-level Voices entries. It sorts dated material by the underlying incident date, not the date TDS published it; ongoing Rooftops profiles without a single incident date follow the chronology.
- **Christianity Test** explains the teaching-based comparison.
- **Patriotic Test** compares documented conduct with constitutional loyalty, rule of law, free elections, checks and balances, free speech and press, equal citizenship, and the public-trust obligations of office.
- **America First Test** measures foreign policy against American security, prosperity, constitutional war powers, alliances, sovereignty, diplomatic capacity, and durable credibility.
- **Deal Test** audits business, subsidy, diplomatic, trade, and foreign-government transactions by promise, leverage, concessions, verification, delivery, durability, public cost, and beneficiary.
- **World Standing Test** measures the effect of conduct on U.S. credibility, alliances, expertise, financial influence, and global leverage.
Every public eBox links to a permanent evidence page with its own canonical URL, record status, retrieval dates, claim boundary, sources, share composer, and qualitative test lenses. Public accountability pages disclose the project's purpose, editorial independence, privacy posture, AI use, and correction rules.

The public **Suggest derangements here** form creates a versioned research-lead packet from whatever detail a reader can provide, including incident dates, source URLs, contrary context, and optional follow-up information. No field is mandatory. Suggestions never publish automatically. In the current static build, the form truthfully prepares a local copy/download packet unless a dedicated project email or secure endpoint is configured.

Configure only a project-controlled, privacy-reviewed intake channel—not a personal address:

```bash
NEXT_PUBLIC_SUGGESTIONS_EMAIL=suggestions@example.org
# or
NEXT_PUBLIC_SUGGESTIONS_ENDPOINT=https://intake.example.org/v1/suggestions
```

When an endpoint is configured it must accept the JSON contract documented in `docs/SUGGESTION_INTAKE.md`, enforce abuse controls and request-size limits, return a non-2xx status when storage fails, and write only to a restricted lead queue. Do not connect the endpoint directly to published Evidence or Voices data.

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
- Treat automated monitoring as lead generation. It may update a private review queue, but it may not publish, commit, push, or deploy a factual claim without human review. The deterministic What’s New reconciler is a narrow exception: it may index navigation metadata for already-reviewed records that are already committed to the public Evidence or Voices data.
- Run `npm run whats-new:sync` after approved public Evidence or Voices changes. Run `npm run audit:whats-new` to verify that the rolling index matches the committed public catalog.
- Run the deterministic archive portability audit before changing the database schema or import format.

The research catalog contains 128 raw case files and 376 evidence links. The public site presents 124 canonical files after suppressing four purely duplicative legal/business records. The October 2026 scope expansion adds election-control orders, retaliation against legal and press institutions, domestic military deployment, impoundment, territorial coercion, institutional withdrawal, authoritarian-leader courtship, clemency, family-business conflicts, Epstein transparency, public-project failures, and presidential self-branding. See `research/README.md` for the lane breakdown and maintenance notes, and `EDITORIAL_STANDARDS.md` for the defamation, status-language, trademark, and prepublication rules.

The archive includes Trump administration action involving Marco Rubio, J.D. Vance, and Stephen Miller where a specific role is evidenced; institutional withdrawal; NATO and allied coercion; Ukraine; Iran; Venezuela; tariffs; immigration due process; the foreign service; business failures; subsidy announcements; summit diplomacy; Afghanistan; and the Qatari aircraft gift. Unsupported or misleading shorthand is narrowed, excluded, or held in the git-ignored private editorial review queue rather than published as fact.

The site also includes two complementary church-witness directories: **Rooftops** amplifies Christians resisting Christian nationalism, while **Blind Eyes** documents ten leaders, churches, networks, and political ministries that advance, normalize, or religiously legitimize it. Blind Eyes publishes denials and limiting context beside the criticism and labels its scriptural comparisons as editorial analysis.

**Anti Christ** organizes Trump's documented conduct into eight teaching-based categories, presents five headline cases in each, and provides an expanded source collection with short recorded quotations and direct transcript or video links. The title is used in the plain two-word sense—conduct against Christ's teaching—not as an apocalyptic identification.

The five tests now use qualitative review frameworks. Automated keyword-derived `/100` scores were removed because they implied measurement precision the evidence could not support. A published conclusion must identify the criterion, factual record, status, limiting evidence, and editorial reasoning.

The database-ready schema and migration plan live in `docs/ARCHIVE_DATA_ARCHITECTURE.md`. D1 and R2 remain inactive; the public site continues to read the reviewed JSON research until the documented activation and shadow-read gates are satisfied.

## iPhone app

The first native SwiftUI companion lives in `ios/TDSArchive`. It includes all 124 canonical case files, search, category filters, sources, test lenses, share links, the Voices collections, and the Methods summary.

Refresh its offline evidence bundle from the canonical website data with:

```bash
pnpm mobile:export
```

Open `ios/TDSArchive/TDSArchive.xcodeproj` in Xcode and run the `TDSArchive` scheme on an iPhone simulator. See `ios/README.md` for the first-version scope.

## Deployment

The GitHub Pages workflow validates research structure, the portable archive, privacy boundaries, lint, the static build, and rendered output before publishing the `out/` artifact. Deployment occurs only from reviewed changes on `main`. The public site does not link back to the repository.
