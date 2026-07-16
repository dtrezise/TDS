import type { Metadata } from "next";
import Link from "next/link";
import { PageMasthead, SiteFooter, SiteHeader, TestSuiteNav } from "../site-chrome";
import { TestScorecard } from "../test-scorecard";

export const metadata: Metadata = {
  title: "Christianity Test | TDS",
  description: "How the TDS Evidence Archive compares documented public conduct with the commands, character, and teachings of Jesus—without claiming to judge anyone's soul.",
  alternates: {
    canonical: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/christianity-test/",
  },
  openGraph: {
    title: "Christianity Test — Test the witness by the fruit",
    description: "The archive's framework for comparing public conduct with Christian teaching.",
    url: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/christianity-test/",
    type: "website",
    images: [{
      url: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/share-banner.png",
      width: 1731,
      height: 909,
      alt: "TDS — Trump Derangement Syndrome. The Evidence Archive.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christianity Test | TDS",
    description: "Test the public witness by the public record and the cited teaching.",
    images: ["https://tds-evidence-archive-dan.trapezy.chatgpt.site/share-banner.png"],
  },
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function ChristianityTestPage() {
  return (
    <main className="christianity-page">
      <SiteHeader active="tests" />
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

      <TestScorecard
        testId="christianity"
        intro="Each applicable criterion is scored from direct conflict to strong alignment. These lenses accompany relevant case files so the moral analysis remains attached to the factual status beneath it."
      />

      <section className="framework-caution">
        <div>
          <p className="section-label">The boundary</p>
          <h2>Sin-language is not a shortcut around evidence.</h2>
        </div>
        <div>
          <p>“Stealing,” “adultery,” “false witness,” and “anti Christ” are theological or editorial categories here. They are not presented as adjudicated crimes unless a criminal record actually establishes that status.</p>
          <p>Disputed affairs remain disputed. Civil findings remain civil. Denials, appeals, reversals, dismissals, and limiting facts remain visible. The comparison is strongest when the archive says exactly what the evidence proves—and no more.</p>
          <Link href="/methodology/">Read the complete methodology <ArrowIcon /></Link>
        </div>
      </section>

      <SiteFooter tagline="Test the public witness by the public record." />
    </main>
  );
}
