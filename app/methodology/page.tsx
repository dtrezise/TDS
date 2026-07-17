import type { Metadata } from "next";
import Link from "next/link";
import { lastReviewed } from "@/data/cases";
import { PageMasthead, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Methodology | TDS",
  description: "The TDS Evidence Archive's source hierarchy, status language, defamation safeguards, correction rules, and publication workflow.",
  alternates: {
    canonical: "https://dtrezise.github.io/TDS/methodology/",
  },
  openGraph: {
    title: "Methodology — Facts first. Status always.",
    description: "Harsh argument, exact record: the archive's research and publication standards.",
    url: "https://dtrezise.github.io/TDS/methodology/",
    type: "website",
    images: [{
      url: "https://dtrezise.github.io/TDS/share-banner.png",
      width: 1731,
      height: 909,
      alt: "TDS — Trump Derangement Syndrome. The Evidence Archive.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology | TDS",
    description: "Harsh argument. Exact record.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const rules = [
  ["Primary records first", "Court opinions, verdicts, statutes, transcripts, agency reports, official filings, and direct statements outrank commentary."],
  ["Status is part of the fact", "Verdict, liability finding, charge, allegation, settlement, acquittal, dismissal, appeal, and political judgment are not interchangeable."],
  ["No guilt by association", "Family members, officials, organizations, and movements appear only for their own documented conduct or a specific evidenced connection."],
  ["Analysis is labeled", "The moral and political conclusion is openly editorial. The source link shows what the underlying record actually says."],
  ["A citation is not immunity", "Repeating an accusation can create liability. We verify the underlying claim, disclose denials and limiting facts, and never let a headline outrun the evidence."],
  ["Corrections stay visible", "Material reversals, dismissals, appeal outcomes, and source corrections are added to the case file instead of quietly erased."],
] as const;

const sourceHierarchy = [
  ["01", "Primary legal and official records", "Court opinions, dockets, verdict forms, statutes, agency findings, congressional records, government reports, and filed documents."],
  ["02", "Direct first-party evidence", "Authenticated speeches, interviews, recordings, transcripts, posts, policy documents, financial filings, and institutional materials."],
  ["03", "Independent reporting", "Reputable reporting used with attribution, corroboration, the underlying document when available, and clear separation between report and established fact."],
  ["04", "Analysis and commentary", "Useful for context and interpretation, never silently upgraded into proof of a disputed factual assertion."],
] as const;

const statusRows = [
  ["Criminal verdict", "A jury convicted X of…", "Include sentence and appeal status."],
  ["Civil verdict", "A civil jury found X liable for…", "Do not call it a criminal conviction."],
  ["Charge or indictment", "Prosecutors charged or alleged…", "State that the person has not been convicted."],
  ["Settlement", "The parties settled; the agreement included…", "Do not imply an admission unless the agreement contains one."],
  ["Official report", "The report found or concluded…", "Do not present it as a court verdict."],
  ["Reputable reporting", "The outlet reported…", "Attribute and corroborate where possible."],
  ["Editorial judgment", "This archive argues…", "Disclose the facts supporting the conclusion."],
] as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function MethodologyPage() {
  return (
    <main className="methodology-page">
      <SiteHeader active="methodology" />
      <PageMasthead src="/methodology-hero.jpg" alt="Methodology — Facts first. Status always." priority />

      <section className="methodology-intro">
        <div>
          <p className="section-label">The publication standard</p>
          <h1>Harsh argument.<br />Exact record.</h1>
        </div>
        <div>
          <p className="methodology-intro__lead">This site is not neutral about Donald Trump. It is disciplined about facts.</p>
          <p>The archive makes an explicit political and moral argument. Its factual foundation must remain independently inspectable, precisely worded, current in procedural status, and honest about every material limitation.</p>
          <p>“Derangement” is political rhetoric here, not a medical diagnosis. Criticism is aimed at public conduct, public power, institutions, and documented choices—not protected identity.</p>
        </div>
      </section>

      <section className="method-rules" aria-labelledby="method-rules-title">
        <div className="method-rules__heading">
          <p className="section-label">Six non-negotiable rules</p>
          <h2 id="method-rules-title">What every case file owes the reader.</h2>
        </div>
        <ol>
          {rules.map((rule, index) => (
            <li key={rule[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{rule[0]}</h3><p>{rule[1]}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="source-hierarchy" aria-labelledby="source-hierarchy-title">
        <div>
          <p className="section-label">Source hierarchy</p>
          <h2 id="source-hierarchy-title">The strongest available record leads.</h2>
          <p>A linked headline is not the endpoint. The archive looks beneath the summary for the document, recording, procedural status, and contrary context.</p>
        </div>
        <div className="source-hierarchy__grid">
          {sourceHierarchy.map((source) => (
            <article key={source[0]}><span>{source[0]}</span><h3>{source[1]}</h3><p>{source[2]}</p></article>
          ))}
        </div>
      </section>

      <section className="status-language" aria-labelledby="status-language-title">
        <div className="status-language__heading">
          <p className="section-label">Status language</p>
          <h2 id="status-language-title">Precision is not a concession.</h2>
          <p>A narrower accurate claim is more durable—and often more damning—than an inflated one.</p>
        </div>
        <div className="status-table" role="table" aria-label="Preferred language by record status">
          <div className="status-table__row status-table__head" role="row"><strong role="columnheader">Record</strong><strong role="columnheader">Preferred formulation</strong><strong role="columnheader">Required boundary</strong></div>
          {statusRows.map((row) => (
            <div className="status-table__row" role="row" key={row[0]}><strong role="cell">{row[0]}</strong><span role="cell">{row[1]}</span><span role="cell">{row[2]}</span></div>
          ))}
        </div>
      </section>

      <section className="publication-workflow" aria-labelledby="publication-workflow-title">
        <div>
          <p className="section-label">Case-file workflow</p>
          <h2 id="publication-workflow-title">From grievance to publishable record.</h2>
        </div>
        <ol>
          <li><span>01</span><strong>Frame a narrow, testable claim</strong><p>Separate the event, the factual assertion, the status, and the archive&apos;s conclusion.</p></li>
          <li><span>02</span><strong>Verify and retrieve</strong><p>Capture the strongest source, access date, relevant locator, authority tier, and copyright handling.</p></li>
          <li><span>03</span><strong>Search for contrary context</strong><p>Record denials, responses, acquittals, dismissals, reversals, appeals, credible alternatives, and evidentiary gaps.</p></li>
          <li><span>04</span><strong>Review every surface</strong><p>The headline, card, caption, social preview, and search snippet must remain accurate when separated from the body.</p></li>
          <li><span>05</span><strong>Publish with an audit trail</strong><p>Permanent IDs, revisions, claim-to-source relationships, status events, and visible corrections preserve what changed and why.</p></li>
        </ol>
      </section>

      <section className="legal-safeguards" aria-labelledby="legal-safeguards-title">
        <div>
          <p className="section-label">Defamation and legal safeguards</p>
          <h2 id="legal-safeguards-title">Write no broader than the proof.</h2>
        </div>
        <div>
          <p>A source link does not immunize a false republication. Unresolved claims are attributed. Secret intent is not invented. Fact, inference, and opinion are separated. Original disputed accusations receive a response opportunity when practicable, and unusually high-risk work should receive media-law review.</p>
          <p>Every test follows the same discipline. Sin-language and moral analogy never become unsupported criminal-law labels; constitutional criticism preserves the exact posture of a ruling; foreign-policy criticism separates threats from completed acts and mixed outcomes; deal criticism compares the public promise with written terms, concessions, cost, performance, and durability.</p>
          <span>Full legal and editorial standards are maintained privately with the archive.</span>
        </div>
      </section>

      <section className="methodology-note">
        <div><strong>Last evidence review</strong><span>{lastReviewed}</span></div>
        <p>This is a curated archive, not a claim that every grievance has already been captured. TDS is an independent editorial project and is not affiliated with Trump, his organizations, or any person or institution discussed here.</p>
        <div className="methodology-note__links">
          <span>Data architecture and revision history are maintained privately with the archive.</span>
          <Link href="/christianity-test/">Christianity Test standards <ArrowIcon /></Link>
          <Link href="/patriotic-test/">Patriotic Test standards <ArrowIcon /></Link>
          <Link href="/america-first-test/">America First Test standards <ArrowIcon /></Link>
          <Link href="/deal-test/">Deal Test scorecard <ArrowIcon /></Link>
          <Link href="/#evidence">Open the evidence archive <ArrowIcon /></Link>
        </div>
      </section>

      <SiteFooter tagline="Facts first. Status always." />
    </main>
  );
}
