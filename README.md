# TDS — The Evidence Archive

TDS is an explicitly critical, evidence-first archive of Donald Trump’s public record, the people and institutions enabling it, and the contradiction between Trumpism and Christian teaching.

The editorial argument is forceful; the evidence standard is deliberately conservative. Case files distinguish jury verdicts, court findings, official investigations, charges, allegations, settlements, dismissals, appeals, political judgments, direct statements, reporting, and editorial analysis.

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

The initial research catalog contains 59 raw case files, 159 evidence links, and 40 Christian-teaching links. The public site presents 55 files after suppressing four purely duplicative legal/business records. See `research/README.md` for the lane breakdown and maintenance notes.

## Deployment

The workflow in `.github/workflows/pages.yml` builds the static export and deploys it to GitHub Pages on every push to `main`.
