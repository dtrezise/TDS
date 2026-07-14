import type { Metadata } from "next";
import Link from "next/link";
import {
  antiChristCategories,
  antiChristEditorialNote,
  antiChristQuotes,
  antiChristReviewed,
  antiChristScope,
  antiChristScripture,
  antiChristStats,
  antiChristTitleNote,
} from "@/data/anti-christ";
import type { EvidenceSource } from "@/data/cases";
import { ShareTools } from "../voices/share-tools";

export const metadata: Metadata = {
  title: "Anti Christ | TDS",
  description: "A sourced comparison of Donald Trump's documented conduct with the teachings and example of Jesus Christ—organized by lies, dishonest gain, sexual entitlement, cruelty, vengeance, pride, racism, and domination.",
  alternates: {
    canonical: "https://dtrezise.github.io/TDS/anti-christ/",
  },
  openGraph: {
    title: "Anti Christ — The conduct against the teaching",
    description: "Eight moral categories. Forty headline examples. Every status and source visible.",
    url: "https://dtrezise.github.io/TDS/anti-christ/",
    type: "website",
    images: [
      {
        url: "https://dtrezise.github.io/TDS/anti-christ-og.png",
        width: 1732,
        height: 908,
        alt: "Anti Christ — The conduct against the teaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anti Christ | TDS",
    description: "Documented conduct tested against the words and example of Christ.",
    images: ["https://dtrezise.github.io/TDS/anti-christ-og.png"],
  },
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function sourceAction(source: EvidenceSource) {
  if (/video|recording/i.test(`${source.label} ${source.kind}`)) return "Watch / inspect";
  if (/audio/i.test(source.label)) return "Listen / inspect";
  if (/transcript|remarks|speech|statement/i.test(source.label)) return "Read the words";
  return "Open the record";
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Anti Christ",
  description: metadata.description,
  url: "https://dtrezise.github.io/TDS/anti-christ/",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: antiChristStats.uniqueCases,
    itemListElement: antiChristCategories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.label,
      url: `https://dtrezise.github.io/TDS/anti-christ/#${category.id}`,
    })),
  },
};

export default function AntiChristPage() {
  return (
    <main className="anti-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="site-header anti-site-header">
        <Link className="wordmark" href="/" aria-label="TDS Evidence Archive home">
          <span className="wordmark__mark">TDS</span>
          <span className="wordmark__text">Trump Derangement Syndrome | The Evidence Archive</span>
        </Link>
        <nav aria-label="Anti Christ page navigation">
          <a href="#categories">Categories</a>
          <a href="#words">His words</a>
          <a href="#full-record">Full record</a>
          <Link href="/blind-eyes">Blind Eyes</Link>
          <Link className="nav-archive" href="/">Evidence</Link>
        </nav>
      </header>

      <section className="anti-hero" id="top">
        <div className="anti-hero__copy">
          <p className="section-label">The conduct against the teaching</p>
          <h1><span>ANTI</span><em>CHRIST</em></h1>
          <p className="anti-hero__lede">
            Not a prophecy. Not a claim about Trump&apos;s soul. Two plain words: the documented actions that run against the truth, mercy, humility, fidelity, neighbor-love, and servant leadership taught by Jesus.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#categories">See the top cases</a>
            <a className="button button--text" href="#definition">Read the definition <ArrowIcon /></a>
          </div>
        </div>
        <aside className="anti-scripture">
          <span className="anti-scripture__number" aria-hidden="true">2:6</span>
          <p className="eyebrow">The test</p>
          <blockquote>Claim the name?<br />Walk the way.</blockquote>
          <a href={antiChristScripture.url} target="_blank" rel="noreferrer">{antiChristScripture.reference} <ArrowIcon /></a>
          <p>{antiChristScripture.principle}</p>
        </aside>
      </section>

      <section className="anti-definition" id="definition" aria-labelledby="anti-definition-title">
        <div>
          <p className="section-label">Read this first</p>
          <h2 id="anti-definition-title">Against Christ.<br />Not <em>the</em> Antichrist.</h2>
        </div>
        <div>
          <p>{antiChristTitleNote}</p>
          <p>{antiChristEditorialNote}</p>
          <p className="directory-note"><strong>Scope:</strong> {antiChristScope} Reviewed {antiChristReviewed}.</p>
        </div>
      </section>

      <section className="anti-scoreboard" aria-label="Anti Christ collection statistics">
        <div><strong>{antiChristStats.categories}</strong><span>moral categories</span></div>
        <div><strong>{antiChristStats.featuredPlacements}</strong><span>top-five placements</span></div>
        <div><strong>{antiChristStats.uniqueCases}</strong><span>distinct documented cases</span></div>
        <div><strong>{antiChristStats.directSources}</strong><span>direct evidence links</span></div>
      </section>

      <nav className="anti-category-jump" aria-label="Jump to an Anti Christ category">
        {antiChristCategories.map((category) => <a href={`#${category.id}`} key={category.id}>{category.label}</a>)}
      </nav>

      <section className="anti-categories" id="categories" aria-labelledby="categories-title">
        <div className="anti-section-heading">
          <div>
            <p className="section-label">The top five in each category</p>
            <h2 id="categories-title">The contradiction,<br />made inspectable.</h2>
          </div>
          <p>These are editorial selections for clarity and salience—not a claim that harm can be objectively ranked. Every card links to its underlying record.</p>
        </div>

        {antiChristCategories.map((category, categoryIndex) => (
          <article className="anti-category" id={category.id} key={category.id}>
            <header>
              <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{category.label}</p>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <a href={`#all-${category.id}`}>See all {category.allCases.length} <ArrowIcon /></a>
            </header>
            <ol className="anti-top-five">
              {category.featuredCases.map((item, index) => (
                <li key={`${category.id}-${item.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="anti-case-date">{item.date}</p>
                    <h4>{item.title}</h4>
                    <p>{item.summary}</p>
                    <small><strong>Status:</strong> {item.status}</small>
                  </div>
                  <a href={item.sources[0].url} target="_blank" rel="noreferrer" aria-label={`${sourceAction(item.sources[0])}: ${item.title}`}>
                    {sourceAction(item.sources[0])} <ArrowIcon />
                  </a>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <section className="anti-words" id="words" aria-labelledby="anti-words-title">
        <div className="anti-words__heading">
          <p className="section-label">No paraphrase required</p>
          <h2 id="anti-words-title">His words.<br />The record.</h2>
          <p>Short excerpts are paired with context and the underlying transcript, recording, or video. Ellipses and viral captions are not doing the argumentative work.</p>
        </div>
        <div className="anti-quote-grid">
          {antiChristQuotes.map((item, index) => (
            <figure key={`${item.case_id}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>{item.context}</figcaption>
              <a href={item.url} target="_blank" rel="noreferrer">{item.media_type}: {item.source_label} <ArrowIcon /></a>
            </figure>
          ))}
        </div>
      </section>

      <section className="anti-full-record" id="full-record" aria-labelledby="full-record-title">
        <div className="anti-section-heading">
          <div>
            <p className="section-label">The expanded collection</p>
            <h2 id="full-record-title">See all the evidence.</h2>
          </div>
          <p>Cases can appear under more than one teaching because the same documented act may involve falsehood, cruelty, vengeance, or misuse of power at once.</p>
        </div>

        {antiChristCategories.map((category) => (
          <section className="anti-collection" id={`all-${category.id}`} key={`all-${category.id}`} aria-labelledby={`all-${category.id}-title`}>
            <header>
              <div>
                <p className="eyebrow">{category.label} · {category.allCases.length} records</p>
                <h3 id={`all-${category.id}-title`}>{category.title}</h3>
              </div>
              <a href={category.teaching.url} target="_blank" rel="noreferrer">
                <strong>{category.teaching.reference}</strong>
                <span>{category.teaching.principle}</span>
                <ArrowIcon />
              </a>
            </header>
            <p className="anti-category-caution"><strong>Editorial boundary:</strong> {category.theologicalCaution}</p>
            <div className="anti-collection-grid">
              {category.allCases.map((item) => (
                <article className="anti-record-card" key={`${category.id}-all-${item.id}`}>
                  <div className="anti-record-card__meta"><span>{item.date}</span><span>{item.category}</span></div>
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                  <div className="anti-record-status"><strong>Record status</strong><span>{item.status}</span></div>
                  {item.faithAnalysis ? <p className="anti-record-faith"><strong>Christianity test · editorial analysis:</strong> {item.faithAnalysis}</p> : null}
                  <div className="anti-record-sources">
                    {item.sources.map((source) => (
                      <a href={source.url} target="_blank" rel="noreferrer" key={`${item.id}-${source.url}`}>
                        <span>{sourceAction(source)}</span>
                        <strong>{source.label}</strong>
                        <small>{source.publisher} · {source.kind}</small>
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="anti-method" aria-labelledby="anti-method-title">
        <div>
          <p className="section-label">The publication rule</p>
          <h2 id="anti-method-title">Condemn the conduct.<br />Keep the status exact.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Theology is labeled</strong><p>“Anti Christ,” “stealing,” and similar headings are moral analysis, not invented criminal charges.</p></div></li>
          <li><span>02</span><div><strong>Contrary facts stay</strong><p>Appeals, acquittals, dismissals, denials, lawful authority, and disputed intent remain visible.</p></div></li>
          <li><span>03</span><div><strong>Christ is the stated test</strong><p>The page cites a teaching and explains the comparison; it does not claim one interpretation binds every Christian.</p></div></li>
          <li><span>04</span><div><strong>The archive can grow</strong><p>“See all” means all currently curated records in that category, not every act in a lifetime or presidency.</p></div></li>
        </ol>
        <Link href="/">Open the complete Evidence Archive <ArrowIcon /></Link>
      </section>

      <section className="share-section anti-share" id="share" aria-labelledby="anti-share-title">
        <div>
          <p className="section-label">Share the comparison</p>
          <h2 id="anti-share-title">Do not debate the label before reading the record.</h2>
          <p>Share the documented words, the actual legal status, and the teaching together. The contradiction is strongest when none of the context is hidden.</p>
        </div>
        <ShareTools
          canonicalUrl="https://dtrezise.github.io/TDS/anti-christ/"
          shareTitle="Anti Christ — The conduct against the teaching"
          shareText="A sourced comparison of Donald Trump's documented conduct with the teachings and example of Jesus Christ."
          label="Share the Anti Christ evidence page"
        />
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Test the public witness by the public record.</p>
        <div className="footer-links"><Link href="/blind-eyes">Blind Eyes</Link><Link href="/voices">Rooftops</Link><Link href="/">Evidence</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
