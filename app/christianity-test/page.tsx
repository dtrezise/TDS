import type { Metadata } from "next";
import Link from "next/link";
import { PageMasthead, SiteHeader, TestSuiteNav } from "../site-chrome";

export const metadata: Metadata = {
  title: "Christianity Test | TDS",
  description: "How the TDS Evidence Archive compares documented public conduct with the commands, character, and teachings of Jesus—without claiming to judge anyone's soul.",
  alternates: {
    canonical: "https://dtrezise.github.io/TDS/christianity-test/",
  },
  openGraph: {
    title: "Christianity Test — Test the witness by the fruit",
    description: "The archive's framework for comparing public conduct with Christian teaching.",
    url: "https://dtrezise.github.io/TDS/christianity-test/",
    type: "website",
    images: [{
      url: "https://dtrezise.github.io/TDS/christianity-test-hero.jpg",
      width: 1729,
      height: 910,
      alt: "Christianity Test — Test the witness by the fruit",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christianity Test | TDS",
    description: "Test the public witness by the public record and the cited teaching.",
    images: ["https://dtrezise.github.io/TDS/christianity-test-hero.jpg"],
  },
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

const relatedPages = [
  {
    eyebrow: "Amplify",
    title: "Rooftops",
    href: "/voices",
    description: "Christian leaders, pastors, writers, researchers, and movements publicly resisting Christian nationalism—with direct ways to follow, connect, organize, and share.",
  },
  {
    eyebrow: "Document",
    title: "Blind Eyes",
    href: "/blind-eyes",
    description: "An evidence-led directory of the leaders, churches, networks, and political ministries that bless, build, or normalize Trump-centered Christian nationalism.",
  },
  {
    eyebrow: "Compare",
    title: "Anti Christ",
    href: "/anti-christ",
    description: "Trump's documented conduct organized against specific Christian teachings: false witness, theft and stewardship, fidelity, mercy, humility, peacemaking, and servant leadership.",
  },
] as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function ChristianityTestPage() {
  return (
    <main className="christianity-page">
      <SiteHeader active="christianity" />
      <PageMasthead src="/christianity-test-hero.jpg" alt="Christianity Test — Test the witness by the fruit" priority />
      <TestSuiteNav active="christianity" />

      <section className="framework-intro">
        <div>
          <p className="section-label">The standard behind the analysis</p>
          <h1>Test the public witness by the public record.</h1>
        </div>
        <div className="framework-intro__copy">
          <p className="framework-intro__lead">This archive argues that the deepest contradiction in Trump-aligned Christianity is not partisan. It is moral: dominance, vengeance, contempt, false witness, wealth worship, and indifference to strangers are repeatedly defended as Christian strength.</p>
          <p>The Christianity Test pairs a documented act with a cited teaching, states the act&apos;s legal or evidentiary status, and labels the comparison as editorial analysis. It does not claim that one policy interpretation binds every Christian tradition, and it does not claim authority to judge anyone&apos;s soul.</p>
          <Link href="/#evidence">Open the evidence case files <ArrowIcon /></Link>
        </div>
      </section>

      <section className="test-boundaries" aria-labelledby="test-boundaries-title">
        <div>
          <p className="section-label">What the test does</p>
          <h2 id="test-boundaries-title">Conduct. Teaching. Comparison.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Establish the record</strong><p>Start with the strongest available court record, official document, direct statement, transcript, recording, or carefully attributed reporting.</p></div></li>
          <li><span>02</span><div><strong>Preserve the status</strong><p>A verdict, civil finding, charge, allegation, settlement, appeal, denial, political judgment, and theological category are never treated as synonyms.</p></div></li>
          <li><span>03</span><div><strong>Cite the teaching</strong><p>Name and link the command, Beatitude, teaching of Jesus, or apostolic principle being applied rather than relying on an unexplained religious label.</p></div></li>
          <li><span>04</span><div><strong>Show the reasoning</strong><p>Explain why the documented conduct conflicts with the teaching so readers can evaluate the moral argument for themselves.</p></div></li>
        </ol>
      </section>

      <section className="faith-framework faith-framework--page" aria-labelledby="faith-framework-title">
        <div className="faith-framework__heading">
          <p className="section-label">The recurring lenses</p>
          <h2 id="faith-framework-title">Commands, character, and the teachings of Jesus.</h2>
          <p>These lenses accompany relevant case files on the Evidence page. They remain visible beside the evidence so the moral analysis cannot be separated from the factual status beneath it.</p>
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

      <section className="christianity-collection" aria-labelledby="christianity-collection-title">
        <div className="christianity-collection__heading">
          <p className="section-label">The Christianity collection</p>
          <h2 id="christianity-collection-title">Hear the dissent. Examine the complicity. Test the conduct.</h2>
          <p>These three projects deepen the faith analysis without crowding the main Evidence archive.</p>
        </div>
        <div className="christianity-collection__grid">
          {relatedPages.map((page, index) => (
            <Link href={page.href} key={page.href}>
              <span>{String(index + 1).padStart(2, "0")} · {page.eyebrow}</span>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
              <strong>Open {page.title} <ArrowIcon /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="framework-caution">
        <div>
          <p className="section-label">The boundary</p>
          <h2>Sin-language is not a shortcut around evidence.</h2>
        </div>
        <div>
          <p>“Stealing,” “adultery,” “false witness,” and “anti Christ” are theological or editorial categories here. They are not presented as adjudicated crimes unless a criminal record actually establishes that status.</p>
          <p>Disputed affairs remain disputed. Civil findings remain civil. Denials, appeals, reversals, dismissals, and limiting facts remain visible. The comparison is strongest when the archive says exactly what the evidence proves—and no more.</p>
          <Link href="/methodology">Read the complete methodology <ArrowIcon /></Link>
        </div>
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Test the public witness by the public record.</p>
        <div className="footer-links"><Link href="/">Evidence</Link><Link href="/patriotic-test">Patriotic Test</Link><Link href="/america-first-test">America First Test</Link><Link href="/deal-test">Deal Test</Link><Link href="/methodology">Methodology</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
