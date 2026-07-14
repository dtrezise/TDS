import type { Metadata } from "next";
import Link from "next/link";
import { caseFiles, type CaseFile } from "@/data/cases";
import { PageMasthead, SiteHeader, TestSuiteNav } from "../site-chrome";
import { TestEvidenceRecord } from "../test-evidence-record";

export const metadata: Metadata = {
  title: "Deal Test | TDS",
  description: "A documented scorecard for Donald Trump's business, subsidy, diplomatic, trade, and foreign-government deals.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/deal-test/" },
  openGraph: {
    title: "The Deal Test — Promises. Leverage. Results.",
    description: "Score the promise, leverage, concessions, verification, delivery, durability, public cost, and beneficiary.",
    url: "https://dtrezise.github.io/TDS/deal-test/",
    type: "website",
    images: [{
      url: "https://dtrezise.github.io/TDS/deal-test-hero.jpg",
      width: 1733,
      height: 908,
      alt: "The Deal Test — Promises. Leverage. Results.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Deal Test | TDS",
    description: "Promises. Leverage. Results.",
    images: ["https://dtrezise.github.io/TDS/deal-test-hero.jpg"],
  },
};

const dealStandards = [
  ["Promise", "What exact outcome was sold?", "Record the public commitment before the terms, timetable, or rhetoric changes."],
  ["Leverage", "What did each side need?", "Distinguish durable bargaining power from threats that also impose costs on the United States."],
  ["Concessions", "What did America give?", "Count sanctions relief, access, recognition, deadlines, subsidies, security commitments, and foregone alternatives."],
  ["Verification", "How could performance be measured?", "A photo, announcement, memorandum, or aspiration is not an enforceable and inspectable result."],
  ["Delivery", "What actually happened?", "Compare jobs, purchases, weapons limits, cost, schedule, and conduct with the agreement's stated target."],
  ["Durability", "Did the result survive?", "A bargain should remain useful after the summit, news cycle, administration, market shock, or first violation."],
  ["Public cost", "Who absorbed the downside?", "Include tax subsidies, retrofit costs, consumer prices, military exposure, debt, displacement, and opportunity cost."],
  ["Beneficiary", "Who gained the most?", "Separate national benefit from personal prestige, political spectacle, private branding, or a counterparty's strategic gain."],
] as const;

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
      <SiteHeader active="deals" />
      <PageMasthead src="/deal-test-hero.jpg" alt="The Deal Test — Promises. Leverage. Results." priority />
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

      <section className="patriotic-contrast" aria-label="Deal branding compared with deal performance">
        <article>
          <span>The brand</span>
          <h2>Announcement as victory.</h2>
          <p>Big number. Dominant posture. Personal praise. Ambiguous terms. The next headline arrives before the public can compare the promise with delivery.</p>
        </article>
        <article>
          <span>The audit</span>
          <h2>Terms, performance, and cost.</h2>
          <p>Baseline. Written commitment. Concessions. Verification. Delivery. Durability. Public cost. Beneficiary. A mixed result remains mixed.</p>
        </article>
      </section>

      <section className="patriotic-standards" aria-labelledby="deal-standards-title">
        <div className="patriotic-standards__heading">
          <p className="section-label">Eight questions</p>
          <h2 id="deal-standards-title">The Deal Test scorecard.</h2>
          <p>The scorecard resists a familiar political trick: declaring victory at announcement, ignoring concessions, and redefining the objective after performance falls short.</p>
        </div>
        <div className="patriotic-standards__grid">
          {dealStandards.map((item, index) => (
            <article key={item[0]}>
              <span>{String(index + 1).padStart(2, "0")} · {item[1]}</span>
              <h3>{item[0]}</h3>
              <p>{item[2]}</p>
            </article>
          ))}
        </div>
      </section>

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
              {group.ids.map((id) => <TestEvidenceRecord item={getCase(id)} prefix="deal" key={id} />)}
            </div>
          </section>
        ))}
      </section>

      <section className="test-corrections" aria-labelledby="deal-corrections-title">
        <div><p className="section-label">Record corrections</p><h2 id="deal-corrections-title">The criticism cannot outrun the receipt.</h2></div>
        <div className="test-corrections__list">
          <article><strong>The Qatar training facility is in Idaho—not Colorado.</strong><p>Mountain Home Air Force Base completed an environmental assessment in 2022 for a U.S.-led training and support facility for Qatar&apos;s F-15QA aircraft. It is not a sovereign Qatari base, and the planning record predates the 2025 aircraft gift.</p><a href="https://www.mountainhome.af.mil/About-MHAFB/Environmental-Info/" target="_blank" rel="noreferrer">Read the Air Force environmental record <ArrowIcon /></a></article>
          <article><strong>The gifted aircraft raises grave questions; “bribe” is not an adjudicated fact.</strong><p>The Pentagon accepted Qatar&apos;s 747 and funded its retrofit for presidential service. The archive documents the foreign-government gift, ethics objections, cost, security concerns, and personal-library disposition plan without claiming a criminal quid pro quo that no cited court has found.</p></article>
          <article><strong>The Iran comparison is multi-factor.</strong><p>The archive documents the path from JCPOA withdrawal to nuclear escalation, direct U.S. strikes, disrupted Hormuz traffic, and a fragile later arrangement. It does not claim that one 2018 decision mechanically caused every act by Iran, Israel, Congress, shipping firms, or later administrations.</p></article>
          <article><strong>“World pariah” and “laughing stock” are rhetoric.</strong><p>The Deal Test uses measurable substitutes: treaty commitments, UN votes, counterparty performance, purchase shortfalls, job counts, court rulings, costs, military exposure, retaliatory measures, and durability.</p></article>
        </div>
      </section>

      <section className="patriotic-boundary">
        <div><p className="section-label">The boundary</p><h2>Failure is a result to demonstrate—not a nickname.</h2></div>
        <div>
          <p>Corporate bankruptcy is not personal bankruptcy. Settlement is not admission. A jury&apos;s liability finding can coexist with nominal damages. A later administration can share responsibility for carrying out a predecessor&apos;s agreement. A court can invalidate one tariff authority while other tariffs remain.</p>
          <p>The archive therefore separates the written promise, proven fact, public cost, counterparty response, later outcome, and our editorial conclusion. When a bargain produced a real gain, that gain stays in the ledger.</p>
          <Link href="/methodology">Read the complete methodology <ArrowIcon /></Link>
        </div>
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Promises. Leverage. Results.</p>
        <div className="footer-links"><Link href="/">Evidence</Link><Link href="/america-first-test">America First Test</Link><Link href="/patriotic-test">Patriotic Test</Link><Link href="/methodology">Methodology</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
