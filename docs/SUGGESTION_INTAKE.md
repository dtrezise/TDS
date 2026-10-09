# Incident suggestion intake

## Purpose and hard boundary

The public form creates research leads. A submitted lead is not evidence, a verified claim, an editorial finding, or permission to publish personal information. No automated process may convert a lead into a public Evidence or Voices record. Every candidate must pass the project’s ordinary sourcing, legal-status, contrary-context, defamation, and human prepublication review.

The default GitHub Pages build has no first-party form backend. When neither intake environment variable is configured, the browser prepares a plain-text packet for the reader to copy, download, or share and explicitly states that nothing was uploaded. This is intentional: the interface must never display a false receipt.

## Delivery modes

1. `NEXT_PUBLIC_SUGGESTIONS_ENDPOINT` — preferred after a secure project intake service exists. The browser sends a JSON `POST` and reports delivery only after a successful HTTP response.
2. `NEXT_PUBLIC_SUGGESTIONS_EMAIL` — transitional option. The browser opens the visitor’s email client with the packet addressed to a monitored, project-separated inbox. The interface explains that opening a draft is not delivery.
3. `NEXT_PUBLIC_CORRECTIONS_EMAIL` — fallback only when the project deliberately uses one monitored editorial desk for both corrections and leads.
4. No variable — local packet preparation only.

Never configure a personal address. Before direct collection, update the public privacy notice with the service operator, retention period, permitted access, lawful purpose, deletion process, breach plan, and any cross-border transfer.

## JSON contract · version 1.0

The endpoint receives `Content-Type: application/json` with:

```json
{
  "title": "Precise working title",
  "incidentDate": "2026-10-08",
  "datePrecision": "Exact date",
  "people": "People, offices, agencies, or organizations",
  "summary": "Conduct described without assuming motive",
  "primarySource": "https://public.example/primary-record",
  "supportingSource": "https://public.example/independent-context",
  "relevance": "Why the incident may fall within archive scope",
  "contraryContext": "Denial, defense, correction, or limiting facts",
  "contact": "optional@example.org",
  "submittedAt": "2026-10-08T12:00:00.000Z",
  "intakeVersion": "1.0"
}
```

The public page states that suggestions should use public-source material and exclude confidential, privileged, intimate, hacked, or illegally obtained information. No individual form field is mandatory: partial recollections and undeveloped ideas may still produce useful research leads. The endpoint must accept partial packets, validate every field that is supplied, and preserve the same boundary when direct intake is activated.

## Endpoint requirements

- Permit requests only from approved production origins. Treat CORS as browser policy, not authentication.
- Enforce HTTPS, supported content types, field allowlists, maximum lengths, URL parsing, and an overall body-size limit.
- Add rate limiting, bot friction, duplicate detection, abuse logging, and safe failure responses. Do not echo submitted text into error pages.
- Strip active markup. Never fetch a submitted URL in the request path; enqueue link inspection in an isolated process with SSRF protections.
- Generate an opaque lead ID server-side. Do not expose sequential database identifiers.
- Encrypt data in transit and at rest. Restrict access to authorized reviewers and record administrative access.
- Separate submitter contact data from research text where practical. Delete contact data when it is no longer needed.
- Keep submissions out of Git, build logs, analytics, notifications, and public issue trackers.
- Return success only after durable queue storage. A successful response means “received for review,” never “verified” or “accepted for publication.”

## Review states

Use an internal state machine such as:

`received → triage → duplicate | out_of_scope | needs_sources | research → legal_review → editorial_review → approved | declined`

Publication is a separate, human-authorized action that creates or updates a canonical record with permanent IDs and revision history. The intake system should retain the originating lead ID privately for audit without identifying a submitter publicly.

## Retention recommendation

Until counsel approves a final policy, minimize collection and use conservative defaults: delete obvious spam promptly, separate contact information, periodically purge declined leads, and retain only the audit metadata necessary to explain an editorial decision. Never promise anonymity against legal process or a determined technical adversary.
