import type { Metadata } from "next";
import Link from "next/link";
import { caseFiles, type CaseFile } from "@/data/cases";
import { PageMasthead, SiteFooter, SiteHeader, TestSuiteNav } from "../site-chrome";
import { TestEvidenceRecord } from "../test-evidence-record";
import { TestScorecard } from "../test-scorecard";

export const metadata: Metadata = {
  title: "Deal Test | TDS",
  description: "A documented scorecard for Donald Trump's business, subsidy, diplomatic, trade, and foreign-government deals.",
  alternates: { canonical: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/deal-test/" },
  openGraph: {
    title: "The Deal Test — Promises. Leverage. Results.",
    description: "Score the promise, leverage, concessions, verification, delivery, durability, public cost, and beneficiary.",
    url: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/deal-test/",
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
    title: "The Deal Test | TDS",
    description: "Promises. Leverage. Results.",
    images: ["https://tds-evidence-archive-dan.trapezy.chatgpt.site/share-banner.png"],
  },
};

const groups = [
  {
    number: "01",
    title: "The business legend before the presidency",
    thesis: "The “Art of the Deal” brand can be tested against adjudicated records, settlements, corporate filings, debt, and whether the enterprise actually endured.",
    ids: ["usfl-antitrust-strategy-1983-1988", "trump-university-settlement", "trump-casino-company-bankruptcies-2004-2009", "new-york-civil-business-fraud"],
  },
  {
    number: "02",
    title: "Subsidy spectaculars and the jobs delivered",
    thesis: "A factory announcement is not a completed factory. These records compare headline job promises with incentive terms, formal layoffs, renegotiation, and the smaller operations that remained.",
    ids: ["carrier-jobs-deal-2016-2017", "foxconn-wisconsin-subsidy-reset-2017-2025"],
  },
  {
    number: "03",
    title: "Personal diplomacy after the cameras left",
    thesis: "Summits and signatures matter only if they produce verifiable performance, enforceable commitments, and an outcome better than the concessions required to get there.",
    ids: ["north-korea-summit-denuclearization-2018-2019", "china-phase-one-purchase-shortfall-2020-2025", "doha-afghanistan-withdrawal-deal-2020-2021"],
  },
  {
    number: "04",
    title: "Second-term deals: spectacle, cost, and instability",
    thesis: "The archive scores foreign gifts, emergency tariffs, and the path from abandoning a monitored nuclear agreement to direct war and disrupted energy transit.",
    ids: ["qatar-gifted-presidential-jet-2025-2026", "tariff-volatility-economic-costs-2025-2026", "iran-deal-exit-to-hormuz-crisis-2018-2026"],
  },
] as const;

function getCase(id: string): CaseFile {
  const item = caseFiles.find((caseFile) => caseFile.id === id);
  if (!item) throw new Error(`Missing Deal Test case: ${id}`);
  return item;
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function DealTestPage() {
  return (
    <main className="patriotic-page test-page test-page--deals">
      <SiteHeader active="tests" />
      <PageMasthead src="/deal-test-hero.jpg" alt="The Deal Test — Promises. Leverage. Results." priority />

      <section className="patriotic-contrast" aria-label="Deal branding compared with deal performance">
        <article>
          <span>The brand</span>
          <h2>Announcement as victory.</h2>
          <p>Big number. Dominant posture. Personal praise. Ambiguous terms. The next headline arrives before the public can compare the promise with delivery.</p>
        </article>
        <article>
          <span>The verdict</span>
          <h2>Terms, performance, and cost.</h2>
          <p>Baseline. Written commitment. Concessions. Verification. Delivery. Durability. Public cost. Beneficiary. A mixed result remains mixed.</p>
        </article>
      </section>

      <TestSuiteNav active="deals" />

      <section className="patriotic-intro">
        <div>
          <p className="section-label">The performance standard</p>
          <h1>A deal is not a press conference. Score the promise against the delivered result.</h1>
        </div>
        <div className="patriotic-intro__copy">
          <p className="patriotic-intro__lead">“I made a deal” is the beginning of the audit—not the conclusion.</p>
          <p>This test records what Donald Trump promised, what leverage he had, what the United States or public gave up, how performance could be verified, what was delivered, how long it lasted, what it cost, and who benefited.</p>
          <p>A deal can be partial rather than simply good or bad. Carrier preserved a contractual job quota but still laid off hundreds. NATO burden sharing increased despite Trump&apos;s reckless conditional-defense rhetoric. Foxconn&apos;s original megaproject collapsed while a smaller operation and later investment continued. The archive keeps both sides because a real scorecard cannot move the goalposts after the fact.</p>
          <Link href="#deal-record">Audit the record <ArrowIcon /></Link>
        </div>
      </section>

      <TestScorecard
        testId="deal"
        intro="The scorecard resists declaring victory at announcement, ignoring concessions, and redefining the objective after performance falls short."
      />

      <section className="patriotic-record-section" id="deal-record" aria-labelledby="deal-record-title">
        <header>
          <p className="section-label">The record</p>
          <h2 id="deal-record-title">The legend is measurable.</h2>
          <p>Ten new deal-specific records join existing Trump University and New York civil-fraud files to compare business myth, subsidy promises, diplomacy, tariffs, gifts, war, and durable outcomes.</p>
        </header>

        {groups.map((group) => (
          <section className="patriotic-group" aria-labelledby={`deal-group-${group.number}`} key={group.number}>
            <div className="patriotic-group__heading">
              <span>{group.number}</span>
              <div><h2 id={`deal-group-${group.number}`}>{group.title}</h2><p>{group.thesis}</p></div>
            </div>
            <div className="patriotic-record-grid">
              {group.ids.map((id) => <TestEvidenceRecord item={getCase(id)} testId="deal" key={id} />)}
            </div>
          </section>
        ))}
      </section>

      <section className="patriotic-boundary">
        <div><p className="section-label">The boundary</p><h2>Failure is a result to demonstrate—not a nickname.</h2></div>
        <div>
          <p>Corporate bankruptcy is not personal bankruptcy. Settlement is not admission. A jury&apos;s liability finding can coexist with nominal damages. A later administration can share responsibility for carrying out a predecessor&apos;s agreement. A court can invalidate one tariff authority while other tariffs remain.</p>
          <p>The archive therefore separates the written promise, proven fact, public cost, counterparty response, later outcome, and our editorial conclusion. When a bargain produced a real gain, that gain stays in the ledger.</p>
          <Link href="/methodology/">Read the complete methodology <ArrowIcon /></Link>
        </div>
      </section>

      <SiteFooter tagline="Promises. Leverage. Results." />
    </main>
  );
}
