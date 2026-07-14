import type { Metadata } from "next";
import Link from "next/link";
import directory from "@/research/blind-eyes/directory.json";
import { PageMasthead, SiteFooter, SiteHeader } from "../site-chrome";
import { ShareTools } from "../share-tools";
import { ShareEBox } from "../share-ebox";
import { TestScoreBadge } from "../test-score-badge";
import { scoreTextAgainstRubric } from "@/data/test-rubrics";

export const metadata: Metadata = {
  title: "Blind Eyes | TDS",
  description: "An evidence-led directory of Christian leaders, churches, and political ministries that advance, normalize, or religiously legitimize Christian nationalism and Trump-centered partisan Christianity.",
  alternates: {
    canonical: "https://dtrezise.github.io/TDS/blind-eyes/",
  },
  openGraph: {
    title: "Blind Eyes — The pulpits that bless political power",
    description: "Documented words, movement ties, limiting context, and Christian teaching comparisons.",
    url: "https://dtrezise.github.io/TDS/blind-eyes/",
    type: "website",
    images: [
      {
        url: "https://dtrezise.github.io/TDS/share-banner.png",
        width: 1731,
        height: 909,
        alt: "TDS — Trump Derangement Syndrome. The Evidence Archive.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blind Eyes | TDS",
    description: "A sourced index of the pulpits and ministries that bless Christian nationalism and Trump-centered power.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Blind Eyes",
  description: metadata.description,
  url: "https://dtrezise.github.io/TDS/blind-eyes/",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: directory.profiles.length,
    itemListElement: directory.profiles.map((profile, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: profile.name,
      url: `https://dtrezise.github.io/TDS/blind-eyes/#${profile.id}`,
    })),
  },
};

export default function BlindEyesPage() {
  return (
    <main className="blind-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader active="voices" />
      <PageMasthead src="/blind-eyes-hero.jpg" alt="Blind Eyes — The pulpits that bless political power" priority />

      <section className="blind-hero">
        <div className="blind-hero__copy">
          <p className="section-label">The other side of the church witness</p>
          <h1>Blind eyes.<br /><em>Loud pulpits.</em></h1>
          <p className="blind-hero__lede">
            <em>Rooftops</em> amplifies Christians resisting Christian nationalism. <em>Blind Eyes</em> documents the leaders, churches, and political ministries that bless it, build it, or give Trump-centered power the language of God.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#profiles">Examine the profiles</a>
            <a className="button button--text" href="#method">Read the labeling rules <ArrowIcon /></a>
          </div>
        </div>
        <aside className="blind-scripture">
          <span className="blind-scripture__number" aria-hidden="true">8:18</span>
          <p className="eyebrow">The question</p>
          <blockquote>
            “Do you have eyes<br />and not see?”
          </blockquote>
          <a href={directory.scripture.url} target="_blank" rel="noreferrer">Mark 8:18 <ArrowIcon /></a>
          <p>The page does not ask readers to accept a label on faith. It asks them to look directly at the words, organizing, denials, and moral contradiction.</p>
        </aside>
      </section>

      <section className="blind-banner" aria-label="Editorial safeguard">
        <strong>No guilt by association.</strong>
        <span>Every profile stands on the subject&apos;s own statement, documented conduct, institutional program, or specifically evidenced movement role.</span>
      </section>

      <section className="blind-intro">
        <div>
          <p className="section-label">A precise accusation</p>
          <h2>Follow the evidence.<br />Respect the distinction.</h2>
        </div>
        <div className="blind-intro__copy">
          <p>Christian nationalism is not a synonym for Christianity, conservatism, patriotism, or voting Republican. It is a political project that fuses a preferred form of Christianity with national identity and seeks privileged Christian power in public life.</p>
          <p>This directory separates people who embrace the label from institutions that operationalize the project and Trump-aligned clergy whose conduct fits a narrower description even when they reject the label.</p>
          <div className="alignment-key" aria-label="Alignment labels explained">
            <span><strong>First-party advocacy</strong> Their own words state the program.</span>
            <span><strong>Documented alignment</strong> The conduct is named without overriding a denial.</span>
            <span><strong>Movement infrastructure</strong> The institution trains, funds, hosts, or mobilizes the project.</span>
          </div>
          <p className="directory-note"><strong>Editorial note:</strong> {directory.editorial_note} Profiles were reviewed {directory.reviewed}.</p>
        </div>
      </section>

      <section className="blind-directory" id="profiles" aria-labelledby="profiles-title">
        <div className="blind-directory__heading">
          <div>
            <p className="section-label">The record</p>
            <h2 id="profiles-title">Who is blessing the power?</h2>
          </div>
          <p>Each file shows what the evidence establishes, what it does not, and the Christian teaching used for the editorial comparison.</p>
        </div>

        <div className="blind-grid">
          {directory.profiles.map((profile, index) => {
            const score = scoreTextAgainstRubric(
              "christianity",
              [
                profile.name,
                profile.alignment,
                profile.summary,
                profile.response_context,
                profile.christian_analysis,
                ...profile.evidence.map((item) => item.finding),
                ...profile.teachings.flatMap((teaching) => [teaching.reference, teaching.principle]),
              ].join(" "),
              "Fails",
            );
            return (
            <article className="blind-card" id={profile.id} key={profile.id}>
              <div className="blind-card__topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{profile.role}</span>
              </div>
              <h3>{profile.name}</h3>
              <div className="alignment-label">
                <span>Alignment finding</span>
                <strong>{profile.alignment}</strong>
                <small>{profile.alignment_strength}</small>
              </div>
              <p className="blind-card__summary">{profile.summary}</p>
              <ShareEBox
                anchor={profile.id}
                title={profile.name}
                summary={profile.summary}
                status={`${profile.alignment} · ${profile.alignment_strength}`}
                context="Blind Eyes · Documented public witness"
              />

              <div className="blind-record" aria-label={`Evidence concerning ${profile.name}`}>
                <h4>Documented record</h4>
                {profile.evidence.map((item, evidenceIndex) => (
                  <article key={`${profile.id}-${evidenceIndex}`}>
                    <div><span>{item.date}</span><span>{item.type}</span></div>
                    <p>{item.finding}</p>
                    <a href={item.url} target="_blank" rel="noreferrer">{item.source_label} · {item.publisher} <ArrowIcon /></a>
                  </article>
                ))}
              </div>

              <aside className="contrary-context">
                <span>Denial, response, or limiting context</span>
                <p>{profile.response_context}</p>
              </aside>

              <aside className="blind-faith-test">
                <TestScoreBadge score={score} id={`${profile.id}-christianity-score`} />
                <span className="blind-faith-test__label">Christianity test · editorial analysis</span>
                <p>{profile.christian_analysis}</p>
                <div>
                  {profile.teachings.map((teaching) => (
                    <a href={teaching.url} target="_blank" rel="noreferrer" key={`${profile.id}-${teaching.reference}`}>
                      <strong>{teaching.reference}</strong>
                      <span>{teaching.principle}</span>
                      <ArrowIcon />
                    </a>
                  ))}
                </div>
              </aside>
            </article>
            );
          })}
        </div>
      </section>

      <section className="blind-method" id="method" aria-labelledby="blind-method-title">
        <div>
          <p className="section-label">Publication method</p>
          <h2 id="blind-method-title">Name the conduct.<br />Never invent the case.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Labels have levels</strong><p>Self-identification, direct advocacy, movement infrastructure, and documented alignment are different findings.</p></div></li>
          <li><span>02</span><div><strong>Denials stay visible</strong><p>If someone rejects Christian nationalism or theocracy, the profile says so—even while criticizing documented conduct.</p></div></li>
          <li><span>03</span><div><strong>Institutions are not individuals</strong><p>A network statement is not silently assigned to every pastor or member, and association alone proves nothing.</p></div></li>
          <li><span>04</span><div><strong>Theology is analysis</strong><p>The archive compares public conduct with cited teachings. It does not declare who is saved, damned, or a true Christian.</p></div></li>
        </ol>
        <div className="blind-method__sources">
          <strong>Definition and movement context</strong>
          {directory.definition_sources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} · {source.publisher} <ArrowIcon /></a>
          ))}
          <Link href="/rooftops">Hear the Christians resisting this movement <ArrowIcon /></Link>
        </div>
      </section>

      <section className="share-section blind-share" id="share" aria-labelledby="blind-share-title">
        <div>
          <p className="section-label">Put the record in the room</p>
          <h2 id="blind-share-title">Do not let political religion hide behind a church title.</h2>
          <p>Share the evidence, including the denials and limiting facts. The argument is strongest when readers can inspect exactly what was said and decide whether the public witness resembles the teaching.</p>
        </div>
        <ShareTools
          canonicalUrl="https://dtrezise.github.io/TDS/blind-eyes/"
          shareTitle="Blind Eyes — The pulpits that bless political power"
          shareText="A sourced directory of Christian leaders, churches, and political ministries advancing or legitimizing Christian nationalism and Trump-centered partisan Christianity."
          label="Share the Blind Eyes directory"
        />
      </section>

      <SiteFooter tagline="Look directly at the record. Then test the witness by its fruit." />
    </main>
  );
}
