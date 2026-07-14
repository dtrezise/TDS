# TDS legal and editorial standards

TDS is an independent editorial and public-records project. It is not affiliated with Donald Trump, the Trump Organization, the Trump family, Turning Point USA, the Heritage Foundation, any political party, or any person or organization discussed in the archive.

This document is an internal publication standard, not legal advice. A media lawyer should review unusually high-risk investigations, commercial merchandise, and any demand letter or threatened claim.

## Name and trademark posture

“Trump Derangement Syndrome” is a short phrase and slogan. The U.S. Copyright Office says names, titles, slogans, and short phrases are not protected by copyright, even when they are novel or distinctive.

A trademark is different: it protects a source identifier in connection with specified goods or services. On July 13, 2026, an exact-wording search of the USPTO federal trademark database returned no record for `TRUMP DERANGEMENT SYNDROME`. That is a preliminary search, not a comprehensive clearance opinion. Before using the title on paid products, events, newsletters, fundraising, or merchandise, search similar federal marks, state registrations, domain and marketplace use, and common-law uses. Avoid presentation that implies endorsement, sponsorship, or affiliation.

Authoritative background:

- [U.S. Copyright Office Circular 33](https://www.copyright.gov/circs/circ33.pdf)
- [USPTO federal trademark searching guidance](https://www.uspto.gov/trademarks/search/federal-trademark-searching)
- [USPTO likelihood-of-confusion guidance](https://www.uspto.gov/trademarks/search/likelihood-confusion)
- [USPTO scope-of-protection guidance](https://www.uspto.gov/trademarks/basics/scope-protection)

## Defamation and accuracy rules

A link is evidence, not immunity. Repeating a defamatory falsehood can create republication liability even when the source is named. Every factual assertion must therefore be independently checked against the strongest available record.

1. **Write no broader than the proof.** A harsh editorial conclusion must rest on a narrower factual statement that the cited record directly supports.
2. **Use the exact procedural label.** Convicted, found civilly liable, charged, accused, investigated, settled, dismissed, acquitted, pardoned, reversed, and appealed are not synonyms.
3. **Attribute unresolved claims.** Identify who alleges what, link the filing or report, state any denial, and never turn an allegation into narrative fact through a headline or shorthand.
4. **Separate act, inference, and opinion.** State the documented act first. Label the inference. Make the moral or political judgment from disclosed facts so readers can evaluate it themselves.
5. **Do not infer secret intent.** Describe words, conduct, sequence, and consequences. State intent only when admitted, adjudicated, or supported by unusually strong evidence—and explain that basis.
6. **Include material contrary facts.** Denials, acquittals, dismissals, appeals, reversals, limitations, evidentiary gaps, and credible alternative explanations belong in the same record.
7. **No guilt by relationship.** A family tie, political alliance, organizational role, photograph, dinner, donation, or shared movement does not prove another person’s misconduct.
8. **Review headlines independently.** A defensible article can still be distorted by a headline, card title, image, caption, social preview, or search snippet.
9. **Preserve the audit trail.** Keep the source, access date, relevant quotation or page, status-check date, editorial caution, and later corrections in the research record.
10. **Offer correction and response.** Correct material errors visibly and promptly. For original accusations or disputed claims not already tested in a public proceeding, seek a response before publication when practicable.

## Structured-record requirements

The normalized archive treats a case, a claim, a source, and the relationship between a claim and source as separate records. Before a database-backed claim is published:

- Assign a permanent claim ID that does not change when its wording or public slug changes.
- Classify the claim as factual, procedural status, allegation, attribution, editorial analysis, or faith analysis.
- Record its exact status; do not use confidence as a substitute for legal or evidentiary posture.
- Attach at least one claim-to-source relationship that says what the source does: supports, contradicts, contextualizes, documents status, contains a denial, or contains a response.
- Record source retrieval and last-check dates, authority tier, access state, and copyright handling.
- Add a page, paragraph, section, exhibit, or timestamp locator before quoting a long source.
- Keep excerpts restrained. The database enforces a 100-word maximum per stored citation excerpt, but ordinary reporting should generally be much shorter and remain `link_only`.
- Record material denials, responses, appeals, reversals, dismissals, and later status events without erasing the earlier record.
- Append revisions and visible corrections; do not rewrite the audit trail in place.
- Record required source, legal-status, defamation, headline, faith, correction, and link reviews with the actual reviewer and outcome. Never manufacture a historical approval during import.

Full schema, import/export, R2 rights, search, backup, and rollback rules are in `docs/ARCHIVE_DATA_ARCHITECTURE.md`.

Useful prepublication guidance: [Reporters Committee for Freedom of the Press](https://www.rcfp.org/resources/pre-publication-review-guide/).

## Status language

Use these formulations unless a source supports something more precise:

| Record | Preferred formulation | Avoid |
| --- | --- | --- |
| Criminal verdict | “A jury convicted X of…” plus appeal and sentence status | “Proved guilty forever” while review remains pending |
| Civil verdict | “A civil jury found X liable for…” plus burden and appeal status | “Criminally convicted” |
| Charge or indictment | “Prosecutors charged/alleged…” and “X has not been convicted” | “X committed…” |
| Settlement | “The parties settled; the agreement included…” | “Admitted guilt” unless the agreement says so |
| Official report | “The report found/concluded…” | Treating a legislative or agency conclusion as a court verdict |
| Reputable reporting | “Outlet reported…” with independent corroboration where possible | Repeating a source’s accusation as established fact |
| Editorial judgment | “This archive argues…” after disclosing the facts | An “opinion” that implies undisclosed criminal facts |

## Christianity analysis

Christianity case files compare documented public conduct with cited teachings; they do not claim authority to judge a person’s soul or speak for every Christian tradition.

- State the teaching and link it.
- State the conduct and its legal or evidentiary status.
- Explain the comparison as editorial analysis.
- Distinguish sin-language from criminal-law labels. “Stealing” and “adultery” are theological categories, but the site must not present them as adjudicated crimes when the record does not.
- Do not call a disputed affair proven. The New York falsified-business-records verdict did not adjudicate adultery.
- Do not call charity misuse criminal theft unless a criminal judgment says that. Describe the civil findings, admissions, settlement, or court order precisely, then make the stewardship comparison.
- Quote scripture as a standard for conduct, not as a weapon against Christians as a protected religious group.

## Prepublication gate

Before any new case goes live, an editor must be able to answer yes to each question:

- Does every material factual sentence have a source that actually supports it?
- Is the strongest available primary record included?
- Is the legal and procedural status current as of the displayed review date?
- Are denials, appeals, reversals, acquittals, and limiting facts included?
- Does the headline say no more than the body proves?
- Are fact, attribution, inference, and opinion visibly distinct?
- Would the wording remain accurate if read alone in a search result or screenshot?
- Has the Christianity comparison avoided turning a moral analogy into an unsupported legal accusation?
- Are correction and contact channels available before broad promotion?
