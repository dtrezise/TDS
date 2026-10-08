# Daily evidence monitoring runbook

The scheduled monitor is a discovery and reconciliation system, not an autonomous factual publisher. Its only public-write exception is the deterministic What’s New navigation index described below.

## Daily scope

1. Search for material developments involving Donald Trump and specifically evidenced conduct by administration officials, family members, businesses, campaigns, MAGA/America First organizations, and Christian-nationalist infrastructure.
2. Apply the full case-file scope: legal accountability; elections and democratic institutions; misuse or personalization of public power; clemency; appointments and retaliation; conflicts and private benefit; reckless presidential conduct; territorial coercion; alliances, treaties, wars and international organizations; authoritarian courtship; public-project competence; and measurable gaps between promises and outcomes.
3. Recheck open legal, regulatory, legislative, correction, appeal, dismissal, and policy-status questions attached to existing evidence files.
4. Prefer courts, dockets, statutes, agencies, Congress, official transcripts, filed financial records, authenticated recordings, and direct institutional material. Use reputable reporting to find and contextualize the underlying record.
5. Record retrieval date, exact status, source relationship, denial or response, contrary evidence, unresolved gaps, and the existing permanent case ID when the development belongs to a published file.
6. Reject policy disagreement by itself. A candidate needs a specific act, identifiable public-interest standard, material significance, reliable evidence, and a headline that does not outrun the proof.
7. Run read-only research, archive-portability, privacy-boundary, and link-health checks when the local environment permits.
8. After the research pass, reconcile What’s New against the already-reviewed and committed Evidence and Voices data by running `npm run whats-new:sync`. This step indexes publication metadata only; it must never promote a monitoring candidate or draft claim.

## Output boundary

- Store candidate claims and source notes only in the git-ignored private editorial review queue.
- Never publish or edit a factual Evidence/Voices record, contact an expert, or send a correction request from the scheduled run.
- The monitor may update, verify, commit, and push only `research/whats-new.json` when the deterministic reconciler detects an already-committed public record that was added or materially changed. It must fail closed if the public source inputs have uncommitted changes, if any unrelated tracked file is staged, or if verification fails.
- A What’s New entry is not evidence and cannot make a new claim. It contains a permanent-record reference, publication date, section, and change type; public text is resolved from the reviewed permanent record at build time.
- Never create a numerical test score from keyword matches.
- Remain quiet when no material, well-sourced change is found.
- Notify the editor only when a candidate is materially new, an existing status changed, a published source broke, a correction is indicated, or human action is required.

## Human publication gate

Before a candidate enters the public archive, a human editor must verify the primary record, narrow the claim, preserve status and counterevidence, review every headline/share surface, check defamation and privacy risk, assign permanent identifiers, and approve the change. Unusually high-risk claims require independent media-law review.

After that approved record is committed, the What’s New reconciler may surface it for 14 calendar days. On day 15 the client-side date check removes it from the rolling page automatically; the underlying Evidence or Voices record remains permanently available.
