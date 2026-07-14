"use client";

import { useMemo, useState } from "react";
import { caseFiles, categories, lastReviewed, type CaseFile } from "@/data/cases";

const categoryShort: Record<CaseFile["category"], string> = {
  "Law & accountability": "Accountability",
  "Democracy & power": "Democracy",
  "Truth & public conduct": "Truth & conduct",
  "Family & business": "Family & business",
  "Christianity & character": "Faith & character",
  "MAGA & movement": "Movement",
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function EvidenceCard({ item, index }: { item: CaseFile; index: number }) {
  return (
    <article className={`case-card ${item.featured ? "case-card--featured" : ""}`} id={item.id}>
      <div className="case-card__rail" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="case-card__body">
        <div className="case-card__meta">
          <span className="eyebrow">{categoryShort[item.category]}</span>
          <span>{item.date}</span>
        </div>
        <h3>{item.title}</h3>
        <p className="status-line"><span>Record status</span>{item.status}</p>
        <p className="case-summary">{item.summary}</p>
        <p className="case-significance"><strong>Why it matters:</strong> {item.significance}</p>

        {item.faithLens?.length ? (
          <aside className="faith-note">
            <span className="faith-note__label">Christianity test</span>
            <p>{item.faithAnalysis}</p>
            <div className="faith-note__links">
              {item.faithLens.map((lens) => (
                <a href={lens.url} target="_blank" rel="noreferrer" key={`${item.id}-${lens.reference}`}>
                  {lens.reference}: {lens.teaching} <ArrowIcon />
                </a>
              ))}
            </div>
          </aside>
        ) : null}

        <details className="evidence-drawer">
          <summary>
            Examine the evidence <span>{item.sources.length} source{item.sources.length === 1 ? "" : "s"}</span>
          </summary>
          <div className="source-list">
            {item.sources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={`${item.id}-${source.url}`}>
                <span className="source-kind">{source.kind}</span>
                <strong>{source.label}</strong>
                <small>{source.publisher} <ArrowIcon /></small>
              </a>
            ))}
          </div>
        </details>
      </div>
    </article>
  );
}

export function TdsArchive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All evidence");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const visibleCases = useMemo(() => {
    const term = query.trim().toLowerCase();
    return caseFiles
      .filter((item) => category === "All evidence" || item.category === category)
      .filter((item) => {
        if (!term) return true;
        return [item.title, item.summary, item.significance, item.status, ...item.subjects, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(term);
      })
      .sort((a, b) => sort === "newest" ? b.sortDate.localeCompare(a.sortDate) : a.sortDate.localeCompare(b.sortDate));
  }, [category, query, sort]);

  const sourceCount = new Set(caseFiles.flatMap((item) => item.sources.map((source) => source.url))).size;
  const primaryCount = caseFiles.filter((item) => item.sources.some((source) => source.kind !== "Reporting" && source.kind !== "Analysis")).length;
  const faithCount = caseFiles.filter((item) => item.faithLens).length;

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="TDS Evidence Archive home">
          <span className="wordmark__mark">TDS</span>
          <span className="wordmark__text">Trump Derangement Syndrome | The Evidence Archive</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#evidence">Evidence</a>
          <a href="#faith">Christianity test</a>
          <a href="#method">Method</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="section-label">A documented case against denial</p>
          <h1>The derangement is <em>denying the record.</em></h1>
          <p className="hero__lede">
            “Trump Derangement Syndrome” is usually deployed to dismiss critics. This archive turns the phrase back on the loyalty test: how much verified misconduct must be ignored, excused, or celebrated to keep believing the myth?
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#evidence">Open the case files</a>
            <a className="button button--text" href="#method">Read our evidence rules <ArrowIcon /></a>
          </div>
        </div>
        <aside className="hero__brief">
          <p className="hero__brief-number">01</p>
          <p className="eyebrow">Editorial position</p>
          <h2>This site is not neutral about Trump. It is disciplined about facts.</h2>
          <p>
            We argue that sustained support for Donald Trump requires a profound break with evidence, democratic accountability, and the moral language many supporters claim—especially Christianity.
          </p>
          <p className="hero__caution">
            “Derangement” is political rhetoric here, not a medical diagnosis. Criticism is aimed at public conduct, power, institutions, and documented choices—not protected identity.
          </p>
        </aside>
      </section>

      <section className="scoreboard" aria-label="Archive statistics">
        <div><strong>{caseFiles.length}</strong><span>documented case files</span></div>
        <div><strong>{sourceCount}</strong><span>direct evidence links</span></div>
        <div><strong>{primaryCount}</strong><span>files with primary records</span></div>
        <div><strong>{faithCount}</strong><span>Christianity tests</span></div>
      </section>

      <section className="thesis" id="faith">
        <div>
          <p className="section-label">The central contradiction</p>
          <h2>A politics of cruelty wrapped in the language of Christ.</h2>
        </div>
        <div className="thesis__copy">
          <p>
            The sharpest TDS contradiction is not that Christians vote Republican. It is that leaders and institutions have recast dominance, vengeance, contempt, false witness, wealth worship, and indifference to strangers as evidence of Christian strength.
          </p>
          <p>
            This archive pairs conduct with teachings about truth, humility, mercy, fidelity, the stranger, the poor, peacemaking, and repentance. It does not claim every Christian interprets policy alike. It asks whether the public character being defended resembles the character being preached.
          </p>
          <a href="#evidence" onClick={() => setCategory("Christianity & character")}>View the Christianity case files <ArrowIcon /></a>
        </div>
      </section>

      <section className="archive" id="evidence">
        <div className="archive__heading">
          <div>
            <p className="section-label">The record</p>
            <h2>Case files, not catchphrases.</h2>
          </div>
          <p>Search the catalog, narrow by theme, and open every source. The argument is ours. The evidence should be inspectable by anyone.</p>
        </div>

        <div className="controls" aria-label="Evidence filters">
          <label className="search-field">
            <span>Search the archive</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: election, fraud, mercy…" type="search" />
          </label>
          <label className="sort-field">
            <span>Order</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as "newest" | "oldest")}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
          <div className="category-filter" role="group" aria-label="Filter by category">
            {categories.map((item) => (
              <button key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="results-line" aria-live="polite">
          <span>{visibleCases.length} case file{visibleCases.length === 1 ? "" : "s"}</span>
          {query || category !== "All evidence" ? <button type="button" onClick={() => { setQuery(""); setCategory("All evidence"); }}>Clear filters</button> : null}
        </div>

        <div className="case-grid">
          {visibleCases.map((item, index) => <EvidenceCard item={item} index={index} key={item.id} />)}
        </div>
        {visibleCases.length === 0 ? (
          <div className="no-results"><h3>No matching case file.</h3><p>Try a broader term or clear the category filter.</p></div>
        ) : null}
      </section>

      <section className="method" id="method">
        <div className="method__heading">
          <p className="section-label">Evidence rules</p>
          <h2>Harsh argument.<br />Exact record.</h2>
        </div>
        <ol className="method__rules">
          <li><span>01</span><div><h3>Primary records first</h3><p>Court opinions, verdicts, statutes, transcripts, agency reports, official filings, and direct statements outrank commentary.</p></div></li>
          <li><span>02</span><div><h3>Status is part of the fact</h3><p>Verdict, liability finding, charge, allegation, settlement, acquittal, dismissal, appeal, and political judgment are not interchangeable.</p></div></li>
          <li><span>03</span><div><h3>No guilt by association</h3><p>Family members, officials, organizations, and movements appear only for their own documented conduct or a specific evidenced connection.</p></div></li>
          <li><span>04</span><div><h3>Analysis is labeled</h3><p>The moral and political conclusion is openly editorial. The source link shows what the underlying record actually says.</p></div></li>
          <li><span>05</span><div><h3>Corrections stay visible</h3><p>Material reversals, dismissals, appeal outcomes, and source corrections are added to the case file instead of quietly erased.</p></div></li>
        </ol>
        <div className="method__note">
          <strong>Last evidence review</strong>
          <span>{lastReviewed}</span>
          <p>This is a curated launch archive, not a claim that every grievance has already been captured. The catalog is designed to expand without lowering its evidence standard.</p>
        </div>
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Accountability is not derangement. Refusing the record is.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
