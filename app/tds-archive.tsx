"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { caseFiles, categories, type CaseFile } from "@/data/cases";

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
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="section-label">A documented case against denial</p>
          <h1>DERANGEMENT <em>denying the record.</em></h1>
          <p className="hero__lede">
            Accountability is not derangement. Refusing the record is.<br />
            How much verified misconduct must be ignored, excused, or celebrated to keep believing the myth?
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#evidence">Open the case files</a>
            <Link className="button button--text" href="/methodology">Read our evidence rules <ArrowIcon /></Link>
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

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Accountability is not derangement. Refusing the record is.</p>
        <div className="footer-links"><Link href="/christianity-test">Christianity Test</Link><Link href="/methodology">Methodology</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </>
  );
}
