import type { Metadata } from "next";
import Link from "next/link";
import directory from "@/research/voices/directory.json";
import { PageMasthead, SiteHeader } from "../site-chrome";
import { ShareTools } from "../share-tools";
import { ShareEBox } from "../share-ebox";

export const metadata: Metadata = {
  title: "Shout It from the Rooftops | TDS",
  description: "Christian leaders, writers, pastors, researchers, and movements speaking out against Christian nationalism—with direct ways to follow, connect, organize, and share.",
  alternates: {
    canonical: "https://dtrezise.github.io/TDS/rooftops/",
  },
  openGraph: {
    title: "Shout It from the Rooftops — Christian voices resisting Christian nationalism",
    description: "Follow the people naming Christian nationalism, resisting it, and building faithful alternatives.",
    url: "https://dtrezise.github.io/TDS/rooftops/",
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
    title: "Shout It from the Rooftops",
    description: "Christian voices resisting Christian nationalism—and ways to join them.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function eboxAnchor(prefix: string, value: string, index: number) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${prefix}-${slug || index + 1}`;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Shout It from the Rooftops",
  description: metadata.description,
  url: "https://dtrezise.github.io/TDS/rooftops/",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: directory.voices.length,
    itemListElement: directory.voices.map((voice, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: voice.name,
      url: voice.primary_url,
    })),
  },
};

export default function RooftopsPage() {
  return (
    <main className="voices-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader active="voices" />
      <PageMasthead src="/rooftops-hero.jpg" alt="Rooftops — Christian voices against Christian nationalism" priority />

      <section className="rooftop-hero">
        <div className="rooftop-hero__copy">
          <p className="section-label">A directory for Christian resistance</p>
          <h1>Shout it from<br /><em>the rooftops.</em></h1>
          <p className="rooftop-hero__lede">
            Christian nationalism is loud. It is not the whole church. Follow the Christians, pastors, historians, journalists, and organizers naming the distortion—and building a public faith shaped by truth, mercy, justice, and love of neighbor.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#voices">Meet the voices</a>
            <a className="button button--text" href="#act">Find a way to act <ArrowIcon /></a>
          </div>
        </div>
        <aside className="rooftop-scripture">
          <span className="rooftop-scripture__number" aria-hidden="true">10:27</span>
          <p className="eyebrow">The scriptural charge</p>
          <blockquote>
            Speak in the light.<br />“Proclaim it on the housetops.”
          </blockquote>
          <a href={directory.scripture.url} target="_blank" rel="noreferrer">Matthew 10:27 <ArrowIcon /></a>
          <p>Silence lets the loudest political religion masquerade as the only Christian witness. It is not.</p>
        </aside>
      </section>

      <section className="rooftop-banner" aria-label="Directory purpose">
        <strong>Do more than disagree.</strong>
        <span>Follow someone. Share their work. Join something. Bring the conversation into your church and community.</span>
      </section>

      <section className="voices-intro">
        <div>
          <p className="section-label">No single Christian lane</p>
          <h2>Many traditions.<br />One necessary refusal.</h2>
        </div>
        <div className="voices-intro__copy">
          <p>The people below do not share one denomination, politics, or theology. Some write from inside evangelical institutions; others speak from Black church, progressive, Baptist, ecumenical, or academic settings.</p>
          <p>What connects them here is public, sourceable work opposing Christian nationalism or exposing the capture of Christianity by racial hierarchy, authoritarian power, and partisan identity.</p>
          <p className="directory-note"><strong>Directory note:</strong> Inclusion records relevant work. It does not imply affiliation with TDS, endorsement of this site, or agreement among everyone listed. Profiles were reviewed {directory.reviewed} from the linked first-party work.</p>
        </div>
      </section>

      <section className="movement-section" id="act" aria-labelledby="movement-title">
        <div className="movement-section__heading">
          <p className="section-label">Start with a movement</p>
          <h2 id="movement-title">Turn conviction into company.</h2>
          <p>These groups offer a practical next step: campaigns, local organizing, church resources, curricula, conversation tools, and moral action.</p>
        </div>
        <div className="movement-grid">
          {directory.movements.map((movement, index) => (
            <article id={eboxAnchor("rooftops-movement", movement.name, index)} key={movement.name}>
              <span className="movement-card__number">{String(index + 1).padStart(2, "0")}</span>
              <p className="eyebrow">{movement.kind}</p>
              <h3>{movement.name}</h3>
              <p>{movement.description}</p>
              <div className="movement-card__links">
                <a href={movement.url} target="_blank" rel="noreferrer">{movement.action} <ArrowIcon /></a>
                {movement.source !== movement.url ? <a className="basis-link" href={movement.source} target="_blank" rel="noreferrer">Basis for inclusion <ArrowIcon /></a> : null}
              </div>
              <ShareEBox
                anchor={eboxAnchor("rooftops-movement", movement.name, index)}
                title={movement.name}
                summary={movement.description}
                status={movement.kind}
                context="Rooftops · Christian resistance"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="voice-directory" id="voices" aria-labelledby="voices-title">
        <div className="voice-directory__heading">
          <div>
            <p className="section-label">People worth hearing</p>
            <h2 id="voices-title">Follow the faithful dissent.</h2>
          </div>
          <p>Read across the differences. The point is not to replace one echo chamber with another; it is to hear how many Christian and church-facing voices reject nationalism’s claim to own the faith.</p>
        </div>

        <div className="voice-grid">
          {directory.voices.map((voice, index) => (
            <article className="voice-card" id={eboxAnchor("rooftops-voice", voice.name, index)} key={voice.name}>
              <div className="voice-card__topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{voice.role}</span>
              </div>
              <h3>{voice.name}</h3>
              <p className="voice-card__description">{voice.description}</p>
              <p className="voice-card__why"><strong>Why follow:</strong> {voice.why}</p>
              <div className="voice-card__links">
                <a href={voice.primary_url} target="_blank" rel="noreferrer">{voice.primary_label} <ArrowIcon /></a>
                <a href={voice.follow_url} target="_blank" rel="noreferrer">{voice.follow_label} <ArrowIcon /></a>
              </div>
              <a className="basis-link" href={voice.source} target="_blank" rel="noreferrer">Source for this description <ArrowIcon /></a>
              <ShareEBox
                anchor={eboxAnchor("rooftops-voice", voice.name, index)}
                title={voice.name}
                summary={voice.description}
                status={voice.role}
                context="Rooftops · People worth hearing"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="connection-section" aria-labelledby="connection-title">
        <div className="connection-section__heading">
          <p className="section-label">Make the directory move</p>
          <h2 id="connection-title">A small rule for the next seven days.</h2>
        </div>
        <ol className="connection-steps">
          <li><span>01</span><div><strong>Follow three</strong><p>Choose voices from different Christian traditions or kinds of work.</p></div></li>
          <li><span>02</span><div><strong>Share one</strong><p>Send one article, episode, or resource to someone who needs a bridge into the conversation.</p></div></li>
          <li><span>03</span><div><strong>Join one</strong><p>Subscribe, enter a community, use a curriculum, or find a local organizing group.</p></div></li>
        </ol>
      </section>

      <section className="share-section" id="share" aria-labelledby="share-title">
        <div>
          <p className="section-label">Pass the signal</p>
          <h2 id="share-title">The loudest voices should not be mistaken for the only voices.</h2>
          <p>Share this directory with a pastor, church group, family member, or friend. Let people see that resistance to Christian nationalism is Christian work already being done in public.</p>
        </div>
        <ShareTools />
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Speak in the light. Make faithful dissent easier to find.</p>
        <div className="footer-links"><Link href="/christianity-test">Christianity Test</Link><Link href="/">Evidence</Link><Link href="/methodology">Methodology</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
