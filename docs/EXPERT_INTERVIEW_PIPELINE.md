# Expert interview pipeline

Every public eBox has a private companion record that defines the expertise needed to test the archive's interpretation and identifies qualified people who may be worth interviewing. The expert pipeline is an editorial verification and future reporting system; it is not an endorsement list.

## Required companion record

An eBox is expert-ready only when its private record contains:

1. The permanent eBox ID and current title.
2. The relevant technical, legal, policy, historical, ethical, or professional domains.
3. At least two candidate assignments verified through public professional sources.
4. A candidate-specific fit rationale and proposed interview angle.
5. Questions designed to test the claim, expose uncertainty, and identify missing evidence.
6. A review date, coverage status, and disclosure or conflict notes.

The candidate pool should seek more than prestige. It should include the people closest to the operative facts: practitioners, researchers, former public officials, inspectors, engineers, scientists, lawyers, historians, affected-community specialists, and other field experts. Candidate selection should also avoid a single institutional, ideological, demographic, or professional monoculture.

## Privacy boundary

Named candidates, public professional contact routes, fit notes, outreach status, consent records, unpublished interview notes, and production files live only under the git-ignored `private/` directory. The public repository contains the schema, rules, and audit tooling, but not the registry.

Collect only information needed for professional outreach. Do not store private contact information, home addresses, family information, or personal data unrelated to the interview.

## Candidate states

- `Researching` — a possible candidate whose expertise or current role still needs verification.
- `Verified candidate` — the expertise, affiliation, and public professional route were checked; no contact has occurred.
- `Approved for outreach` — Dan has explicitly authorized contact. Approval is candidate-specific and time-limited.
- `Contacted` — an invitation was sent and the date and channel were logged.
- `Interested`, `Declined`, or `No response` — the candidate's response state.
- `Interviewed` — an interview occurred; this does not itself grant publication rights.
- `Cleared for publication` — consent, attribution, recording, edit, and licensing terms are documented.

No automation may advance a candidate from research to outreach.

## Interview standard

An interview brief should distinguish questions that ask the expert to:

- establish technical or professional facts;
- explain governing standards and normal practice;
- test the archive's framing and identify counterevidence;
- separate known facts from inference or opinion;
- explain consequences and affected communities;
- identify primary records and further experts;
- state relevant conflicts, limitations, and uncertainty.

Before publication, verify quotations against the recording or approved transcript, preserve context, confirm the expert's title and affiliation, document consent and licensing, and give the interview its own permanent source metadata. Never describe an uncontacted candidate as a contributor, adviser, supporter, or source.

## Local operations

The private registry is expected at `private/expert-interviews/expert-registry.json` and follows `formats/expert-interview-registry-v1.schema.json`.

Run:

```bash
pnpm run audit:experts
```

The audit compares the registry with the canonical research lanes, rejects missing or duplicate eBox briefs, requires at least two verified assignments per eBox, checks public HTTPS profile routes and review dates, and blocks any outreach state that lacks explicit approval metadata.

The review workbook is generated into the ignored `outputs/` directory. It is an editorial working document and must not be added to the static site or Git history.
