import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { SuggestionForm } from "./suggestion-form";

export const metadata: Metadata = {
  title: "Suggest Derangements Here | TDS",
  description: "Submit a public-record lead for independent editorial review by the TDS Evidence Archive.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/suggest/" },
  openGraph: {
    title: "Suggest Derangements Here | TDS",
    description: "Help identify documented conduct that may belong in the archive. Suggestions are leads, not automatic publications.",
    url: "https://dtrezise.github.io/TDS/suggest/",
    type: "website",
    images: [{
      url: "https://dtrezise.github.io/TDS/share-banner.png",
      width: 1731,
      height: 909,
      alt: "TDS — The Evidence Archive.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suggest Derangements Here | TDS",
    description: "Send a public-record lead for independent editorial review.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const submissionEndpoint = process.env.NEXT_PUBLIC_SUGGESTIONS_ENDPOINT;
const suggestionEmail = process.env.NEXT_PUBLIC_SUGGESTIONS_EMAIL ?? process.env.NEXT_PUBLIC_CORRECTIONS_EMAIL;

export default function SuggestPage() {
  const deliveryMode = submissionEndpoint ? "endpoint" : suggestionEmail ? "email" : "local";

  return (
    <main className="suggest-page">
      <SiteHeader active="archive" />
      <header className="suggest-hero">
        <div>
          <p className="section-label">Public lead intake · editorial review required</p>
          <h1>Suggest derangements here.</h1>
        </div>
        <div>
          <p>Point the archive toward documented conduct worth examining. A suggestion enters the research process as a lead. It does not become a case file, a factual finding, or an accusation merely because it was submitted.</p>
          <p>Nothing on the form is required. Share whatever you know—the more detail, dates, names, and public links you can provide, the better we will be able to research the incident.</p>
        </div>
      </header>

      <section className="suggest-boundary" aria-label="Suggestion rules">
        <article><span>01</span><strong>Public records only</strong><p>Do not submit confidential, privileged, hacked, intimate, or illegally obtained material.</p></article>
        <article><span>02</span><strong>Lead, not verdict</strong><p>TDS independently verifies status, sources, denials, corrections, and relevance before publication.</p></article>
        <article><span>03</span><strong>Protect people</strong><p>Do not include home addresses, private phone numbers, family details, or unrelated personal information.</p></article>
      </section>

      <SuggestionForm
        submissionEndpoint={submissionEndpoint}
        suggestionEmail={suggestionEmail}
        deliveryMode={deliveryMode}
      />

      <section className="suggest-method">
        <div>
          <p className="section-label">What happens next</p>
          <h2>A queue is not a publication pipeline.</h2>
        </div>
        <div>
          <p>Editors first check whether the proposed event is within scope and locate the strongest available public record. Qualifying leads then receive the same source hierarchy, legal-status language, contrary-context review, and prepublication checks as every other record.</p>
          <p>Duplicate, unsupported, misleading, private, or out-of-scope leads may be declined without publication. Material corrections belong in the separate correction process.</p>
          <div className="suggest-method__links">
            <Link href="/methodology/">Read the publication methods →</Link>
            <Link href="/corrections/">Request a correction →</Link>
            <Link href="/archive/">Browse the complete archive →</Link>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Bring the lead. The archive still has to prove the case." />
    </main>
  );
}
