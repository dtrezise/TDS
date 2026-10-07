import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildCaseTestLenses } from "@/data/case-test-lenses";
import { caseFiles } from "@/data/cases";
import { ShareEBox } from "../../share-ebox";
import { SiteFooter, SiteHeader } from "../../site-chrome";

const publicBase = "https://dtrezise.github.io/TDS";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function caseById(id: string) {
  return caseFiles.find((item) => item.id === id);
}

export function generateStaticParams() {
  return caseFiles.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = caseById(id);
  if (!item) return { title: "Evidence case not found | TDS" };

  const url = `${publicBase}/evidence/${item.id}/`;
  return {
    title: `${item.title} | TDS Evidence`,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: `${item.status} ${item.summary}`,
      url,
      type: "article",
      images: [{
        url: `${publicBase}/share-banner.png`,
        width: 1731,
        height: 909,
        alt: "TDS — The Evidence Archive",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
      images: [`${publicBase}/share-banner.png`],
    },
  };
}

export default async function EvidenceCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = caseById(id);
  if (!item) notFound();

  const testLenses = buildCaseTestLenses(item);
  const canonicalUrl = `${publicBase}/evidence/${item.id}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.summary,
    dateModified: item.lastSourceCheck,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    citation: item.sources.map((source) => source.url),
    isPartOf: {
      "@type": "CollectionPage",
      name: "TDS Evidence Archive",
      url: `${publicBase}/`,
    },
  };

  return (
    <main className="case-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader active="evidence" />

      <article className="case-detail" id={item.id}>
        <nav className="case-detail__breadcrumb" aria-label="Breadcrumb">
          <Link href="/#evidence">Evidence archive</Link><span aria-hidden="true">/</span><span>{item.category}</span>
        </nav>

        <header className="case-detail__header">
          <p className="section-label">Permanent evidence case file · {item.category}</p>
          <h1>{item.title}</h1>
          <div className="case-detail__meta">
            <span><strong>Event date</strong>{item.date}</span>
            <span><strong>Latest source check</strong><time dateTime={item.lastSourceCheck}>{item.lastSourceCheck}</time></span>
            <span><strong>Archive case ID</strong><code>{item.id}</code></span>
          </div>
        </header>

        <section className="case-detail__status" aria-labelledby="case-status-title">
          <div>
            <p className="section-label">Procedural and evidentiary posture</p>
            <h2 id="case-status-title">Record status</h2>
          </div>
          <p>{item.status}</p>
        </section>

        <section className="case-detail__claim-grid" aria-label="Claim boundaries">
          <article>
            <span>What the record establishes</span>
            <p>{item.summary}</p>
          </article>
          <article>
            <span>Why this archive includes it</span>
            <p>{item.significance}</p>
          </article>
          <article>
            <span>Required reading boundary</span>
            <p>This file establishes only the claim stated above at the status shown. It does not silently convert an allegation, report, civil finding, settlement, official action, or editorial judgment into a different legal category.</p>
          </article>
        </section>

        <ShareEBox
          anchor={item.id}
          permalink={`/evidence/${item.id}/`}
          title={item.title}
          summary={item.summary}
          status={item.status}
          context={`${item.category} · permanent evidence case file`}
        />

        <section className="case-detail__sources" aria-labelledby="case-sources-title">
          <div className="case-detail__section-heading">
            <p className="section-label">Inspect the record</p>
            <h2 id="case-sources-title">Sources and retrieval dates</h2>
            <p>Source type describes the document—not the truth of every statement inside it. Readers should inspect the linked record, its context, and the case status above.</p>
          </div>
          <div className="case-detail__source-list">
            {item.sources.map((source, index) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <span>{String(index + 1).padStart(2, "0")} · {source.kind}</span>
                <strong>{source.label}</strong>
                <small>{source.publisher} · retrieved {source.accessed} <ArrowIcon /></small>
              </a>
            ))}
          </div>
        </section>

        {item.faithLens?.length ? (
          <section className="case-detail__faith" aria-labelledby="case-faith-title">
            <div>
              <p className="section-label">Christianity Test · editorial analysis</p>
              <h2 id="case-faith-title">Documented conduct compared with cited teaching</h2>
              <p>{item.faithAnalysis}</p>
            </div>
            <div>
              {item.faithLens.map((lens) => (
                <a href={lens.url} target="_blank" rel="noreferrer" key={lens.reference}>
                  <strong>{lens.reference}</strong><span>{lens.teaching}</span><ArrowIcon />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="case-detail__tests" aria-labelledby="case-tests-title">
          <div className="case-detail__section-heading">
            <p className="section-label">Qualitative editorial review</p>
            <h2 id="case-tests-title">Additional test lenses</h2>
            <p>These are prompts for evidence-specific human review, not automated verdicts or numerical scores.</p>
          </div>
          <div className="case-test-stack">
            {testLenses.map((test) => (
              <article className={`case-test-note case-test-note--${test.id}`} key={test.id}>
                <div className="case-test-note__heading"><Link href={test.href}>{test.label}</Link><span>{test.finding}</span></div>
                <p>{test.analysis}</p>
              </article>
            ))}
          </div>
        </section>

        <nav className="case-detail__actions" aria-label="Evidence case actions">
          <Link href="/#evidence">← Return to all evidence</Link>
          <Link href="/methodology/">Read the publication method <ArrowIcon /></Link>
          <Link href="/corrections/">Corrections and updates <ArrowIcon /></Link>
        </nav>
      </article>

      <SiteFooter tagline="One claim. Exact status. Inspectable sources." />
    </main>
  );
}
