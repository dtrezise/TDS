"use client";

import Link from "next/link";
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

const christianStandards = [
  {
    standard: "Truth, not false witness",
    tradition: "Ten Commandments · Jesus",
    references: "Exodus 20:16 · Matthew 5:37",
    href: "https://bible.usccb.org/bible/matthew/5",
    test: "Compare documented lies, concealment, and corrected false claims with the command for truthful witness and dependable speech.",
  },
  {
    standard: "Do not steal; steward faithfully",
    tradition: "Ten Commandments · Jesus",
    references: "Exodus 20:15 · Luke 16:10–13",
    href: "https://bible.usccb.org/bible/luke/16",
    test: "Use precise civil findings about charity, business, or public resources—never turn misuse or fraud findings into an unsupported criminal-theft claim.",
  },
  {
    standard: "Fidelity, not adultery",
    tradition: "Ten Commandments · Jesus",
    references: "Exodus 20:14 · Matthew 5:27–28",
    href: "https://bible.usccb.org/bible/matthew/5",
    test: "Examine authenticated speech and adjudicated conduct while keeping disputed extramarital allegations explicitly disputed.",
  },
  {
    standard: "Mercy and forgiveness",
    tradition: "Beatitudes · Lord's Prayer",
    references: "Matthew 5:7 · 6:14–15",
    href: "https://bible.usccb.org/bible/matthew/6",
    test: "Ask whether grief, crime, and conflict are answered with mercy and forgiveness or converted into a politics of vengeance.",
  },
  {
    standard: "Love enemies; make peace",
    tradition: "Beatitudes · Sermon on the Mount",
    references: "Matthew 5:9 · 5:43–48",
    href: "https://bible.usccb.org/bible/matthew/5",
    test: "Compare threats, dehumanization, and stated hatred with Jesus' commands to make peace, love enemies, and pray for persecutors.",
  },
  {
    standard: "The fruit of the Spirit",
    tradition: "Apostolic teaching",
    references: "Galatians 5:22–23",
    href: "https://bible.usccb.org/bible/galatians/5",
    test: "Look for love, joy, peace, patience, kindness, generosity, faithfulness, gentleness, and self-control in public character.",
  },
  {
    standard: "Authority as service",
    tradition: "Jesus on leadership",
    references: "Mark 10:42–45",
    href: "https://bible.usccb.org/bible/mark/10",
    test: "Test self-exaltation, domination, and loyalty demands against leadership defined as service rather than being served.",
  },
  {
    standard: "Welcome the stranger; serve the poor",
    tradition: "Jesus on judgment",
    references: "Matthew 25:35–40",
    href: "https://bible.usccb.org/bible/matthew/25",
    test: "Judge policy by its documented treatment of migrants, refugees, children, the hungry, the sick, and people with the least power.",
  },
] as const;

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
          <a href="#method">Standards</a>
          <Link href="/anti-christ">Anti Christ</Link>
          <Link href="/blind-eyes">Blind Eyes</Link>
          <Link className="nav-join" href="/voices">Rooftops / Join</Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="section-label">A documented case against denial</p>
          <h1>DERANGEMENT <em>denying the record.</em></h1>
          <p className="hero__lede">
            Accountability is not derangement. Refusing the record is.<br />
            How much verified misconduct must be ignored, excused, or celebrated to keep believing the myth?
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

      <section className="faith-framework" aria-labelledby="faith-framework-title">
        <div className="faith-framework__heading">
          <p className="section-label">The Christian standard</p>
          <h2 id="faith-framework-title">Commands, character, and the teachings of Jesus.</h2>
          <p>These are the recurring tests used in the case files. The archive compares public evidence with the teaching; it does not claim to judge anyone&apos;s soul.</p>
        </div>
        <div className="faith-framework__grid">
          {christianStandards.map((item, index) => (
            <article key={item.standard}>
              <span>{String(index + 1).padStart(2, "0")} · {item.tradition}</span>
              <h3>{item.standard}</h3>
              <a href={item.href} target="_blank" rel="noreferrer">{item.references} <ArrowIcon /></a>
              <p>{item.test}</p>
            </article>
          ))}
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
          <li><span>05</span><div><h3>A citation is not immunity</h3><p>Repeating an accusation can create liability. We verify the underlying claim, disclose denials and limiting facts, and never let a headline outrun the evidence.</p></div></li>
          <li><span>06</span><div><h3>Corrections stay visible</h3><p>Material reversals, dismissals, appeal outcomes, and source corrections are added to the case file instead of quietly erased.</p></div></li>
        </ol>
        <div className="method__note">
          <strong>Last evidence review</strong>
          <span>{lastReviewed}</span>
          <p>This is a curated archive, not a claim that every grievance has already been captured. “Trump Derangement Syndrome” is political rhetoric, not a diagnosis. TDS is an independent editorial project and is not affiliated with Trump, his organizations, or any person or institution discussed here.</p>
          <a href="https://github.com/dtrezise/TDS/blob/main/EDITORIAL_STANDARDS.md" target="_blank" rel="noreferrer">Read the full legal and editorial standards <ArrowIcon /></a>
        </div>
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Accountability is not derangement. Refusing the record is.</p>
        <div className="footer-links"><Link href="/anti-christ">Anti Christ</Link><Link href="/blind-eyes">Blind Eyes</Link><Link href="/voices">Rooftops</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
