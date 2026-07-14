import type { Metadata } from "next";
import Link from "next/link";
import { caseFiles, type CaseFile } from "@/data/cases";
import { PageMasthead, SiteHeader, TestSuiteNav } from "../site-chrome";
import { TestEvidenceRecord } from "../test-evidence-record";

export const metadata: Metadata = {
  title: "America First Test | TDS",
  description: "A documented test of whether Trump administration foreign policy made Americans safer, stronger, freer, and more credible.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/america-first-test/" },
  openGraph: {
    title: "America First Test — Power at home. Credibility abroad.",
    description: "National interest measured by results, law, alliances, sovereignty, costs, and long-term American power.",
    url: "https://dtrezise.github.io/TDS/america-first-test/",
    type: "website",
    images: [{
      url: "https://dtrezise.github.io/TDS/share-banner.png",
      width: 1731,
      height: 909,
      alt: "TDS — Trump Derangement Syndrome. The Evidence Archive.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "America First Test | TDS",
    description: "Power at home. Credibility abroad.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const standards = [
  ["National interest, measured", "Costs and benefits belong in the same ledger", "Does the policy measurably improve Americans' security, prosperity, health, and freedom after predictable costs are counted?", "https://www.gao.gov/yellowbook"],
  ["Sovereignty without imperialism", "UN Charter, Articles 2(1) and 2(4)", "Does the United States defend self-determination and territorial integrity—including when a powerful president wants another country's land or resources?", "https://www.un.org/en/about-us/un-charter/full-text"],
  ["Alliances as force multipliers", "North Atlantic Treaty, Article 5", "Does the policy strengthen credible collective defense, or turn treaty commitments into personal protection money?", "https://www.nato.int/cps/en/natolive/official_texts_17120.htm"],
  ["Congress decides war", "U.S. Constitution, Article I; War Powers Resolution", "Was force necessary, lawful, disclosed, and authorized through the constitutional institution assigned the power to declare war?", "https://constitution.congress.gov/browse/essay/artI-S8-C11-1/ALDE_00013587/"],
  ["Cooperation against borderless threats", "Climate, disease, trafficking, and finance cross borders", "Does withdrawal improve American capacity—or surrender information, standard-setting, and coordinated leverage to others?", "https://www.gao.gov/products/gao-24-106102"],
  ["Diplomacy before improvisation", "Foreign service, development, intelligence, and verification", "Does the administration preserve expert capacity and lawful institutions needed to prevent conflict, monitor agreements, and protect Americans?", "https://www.congress.gov/crs-product/IF12044"],
  ["Trade that serves the public", "Constitutional authority and household cost", "Are tariffs lawful, predictable, and tied to an achievable objective—or are Americans paying an unstable tax while the goal keeps changing?", "https://www.cbo.gov/publication/62210"],
  ["Credibility is national power", "Promises, threats, data, and law must remain believable", "Will allies, adversaries, markets, and citizens trust the next commitment after this one?", "https://www.gao.gov/products/gao-21-105160"],
] as const;

const groups = [
  {
    number: "01",
    title: "Withdrawal can surrender American leverage",
    thesis: "Leaving a flawed institution is not automatically strength. The relevant question is whether Americans gain capacity—or lose intelligence, influence, expertise, and a seat at the table.",
    ids: ["paris-unfccc-withdrawals-2025-2026", "who-withdrawal-2025-2026", "rubio-usaid-state-dismantling-2025", "state-human-rights-capacity-cuts-2025"],
  },
  {
    number: "02",
    title: "Allies and sovereign neighbors are not tribute states",
    thesis: "A durable alliance distributes burdens through negotiated commitments. Annexation threats and tariff coercion may produce headlines while making democratic partners less willing to trust the United States.",
    ids: ["nato-threats-and-five-percent-bargain-2024-2026", "greenland-annexation-pressure-2025-2026", "canada-annexation-and-tariff-coercion-2024-2025", "panama-canal-sovereignty-pressure-2024-2025"],
  },
  {
    number: "03",
    title: "Military power remains bound by law and proof",
    thesis: "Calling force decisive does not answer who authorized it, who was targeted, what evidence was disclosed, what replaced the destroyed arrangement, or what new risks followed.",
    ids: ["iran-nuclear-strikes-war-powers-2025", "venezuela-lethal-boat-strikes-2025", "maduro-capture-and-venezuelan-oil-control-2026"],
  },
  {
    number: "04",
    title: "The democratic order includes Ukraine",
    thesis: "A transactional rupture with a democracy under invasion can reward the aggressor, fracture allied strategy, and weaken the rule that borders cannot be changed by force.",
    ids: ["ukraine-aid-pause-and-un-vote-2025"],
  },
  {
    number: "05",
    title: "America First still means the Constitution first",
    thesis: "The national-interest label cannot expand a statute past its text or erase notice and judicial review. Domestic constitutional limits are part of American strength.",
    ids: ["ieepa-tariffs-supreme-court-2026", "alien-enemies-act-summary-removals-2025"],
  },
] as const;

function getCase(id: string): CaseFile {
  const item = caseFiles.find((caseFile) => caseFile.id === id);
  if (!item) throw new Error(`Missing America First Test case: ${id}`);
  return item;
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function AmericaFirstTestPage() {
  return (
    <main className="patriotic-page test-page test-page--america">
      <SiteHeader active="tests" />
      <PageMasthead src="/america-first-test-hero.jpg" alt="America First Test — Power at home. Credibility abroad." priority />
      <TestSuiteNav active="america-first" />

      <section className="patriotic-intro">
        <div>
          <p className="section-label">The national-interest standard</p>
          <h1>Putting Americans first requires measuring what Americans actually gain—and lose.</h1>
        </div>
        <div className="patriotic-intro__copy">
          <p className="patriotic-intro__lead">A slogan is not a strategy. American strength depends on constitutional government, capable alliances, credible commitments, lawful force, informed diplomacy, and a public ledger of costs.</p>
          <p>This test does not assume that every treaty, aid program, trade agreement, or international institution is wise. It asks whether withdrawal, coercion, war, and tariff escalation produced a better result than reform, bargaining, deterrence, or collective action could have produced.</p>
          <p>The focus is Donald Trump and the officials who designed or carried out the policy—including Marco Rubio, J.D. Vance, and Stephen Miller where the record establishes a specific role. Each entry separates completed acts, court holdings, temporary measures, threats, disputed legal theories, and editorial conclusions.</p>
          <Link href="#america-record">Examine the record <ArrowIcon /></Link>
        </div>
      </section>

      <section className="patriotic-contrast" aria-label="National interest compared with leader-first nationalism">
        <article>
          <span>Leader-first nationalism</span>
          <h2>The performance of dominance.</h2>
          <p>Strength is measured by threats, spectacle, unilateral action, praise for the leader, and visible submission from others—even when Americans absorb the cost or the result unravels.</p>
        </article>
        <article>
          <span>America first, tested</span>
          <h2>The durable power of a free republic.</h2>
          <p>Strength is measured by security, prosperity, legal authority, trusted commitments, capable institutions, democratic allies, public consent, and results that survive the announcement.</p>
        </article>
      </section>

      <section className="patriotic-standards" aria-labelledby="america-standards-title">
        <div className="patriotic-standards__heading">
          <p className="section-label">Eight recurring lenses</p>
          <h2 id="america-standards-title">What the America First Test measures.</h2>
          <p>These lenses do not dictate one foreign-policy ideology. They require a policy advertised as “America First” to disclose its authority, theory of success, cost, opportunity cost, beneficiary, and durable outcome.</p>
        </div>
        <div className="patriotic-standards__grid">
          {standards.map((item, index) => (
            <article key={item[0]}>
              <span>{String(index + 1).padStart(2, "0")} · {item[1]}</span>
              <h3>{item[0]}</h3>
              <a href={item[3]} target="_blank" rel="noreferrer">Read the governing record <ArrowIcon /></a>
              <p>{item[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="patriotic-record-section" id="america-record" aria-labelledby="america-record-title">
        <header>
          <p className="section-label">The record</p>
          <h2 id="america-record-title">National interest is a conclusion to prove—not a label to paste on power.</h2>
          <p>Fourteen new case files examine institutional withdrawal, allied coercion, war powers, lethal force, Ukraine, tariffs, due process, and foreign-policy capacity.</p>
        </header>

        {groups.map((group) => (
          <section className="patriotic-group" aria-labelledby={`america-group-${group.number}`} key={group.number}>
            <div className="patriotic-group__heading">
              <span>{group.number}</span>
              <div><h2 id={`america-group-${group.number}`}>{group.title}</h2><p>{group.thesis}</p></div>
            </div>
            <div className="patriotic-record-grid">
              {group.ids.map((id) => <TestEvidenceRecord item={getCase(id)} prefix="america" key={id} />)}
            </div>
          </section>
        ))}
      </section>

      <section className="test-corrections" aria-labelledby="america-corrections-title">
        <div><p className="section-label">Claims we will not overstate</p><h2 id="america-corrections-title">A correction is part of the evidence.</h2></div>
        <div className="test-corrections__list">
          <article><strong>NATO did not dissolve.</strong><p>The United States remained a member. The alliance reaffirmed Article 5, adopted a five-percent investment target, and reported sharply higher allied spending. The archive criticizes Trump&apos;s conditional-protection threat while preserving the later bargaining result.</p></article>
          <article><strong>Threats are not completed annexations.</strong><p>Greenland, Canada, and the Panama Canal were not annexed. The record establishes coercive rhetoric and pressure, followed in Greenland&apos;s case by Trump saying he would not use force.</p></article>
          <article><strong>Venezuelan oil is not simply “stolen U.S. oil.”</strong><p>The administration asserted control over sales and revenue, but its own order says the funds remain Venezuelan sovereign property. The capture, force, custody, and control claims are serious enough without erasing that legal distinction.</p></article>
          <article><strong>Dollar decline is not one-cause proof.</strong><p>The archive is monitoring reserve-share, exchange-rate, Treasury-market, oil-invoicing, sanctions, and fiscal data. It does not currently publish a causal finding that one Trump policy “destroyed the dollar” or ended the petrodollar.</p></article>
          <article><strong>“Pariah” and “laughing stock” are opinions.</strong><p>This archive instead publishes inspectable indicators: votes, withdrawals, retaliation, court rulings, alliance commitments, trade costs, public polling, investment, and policy outcomes.</p></article>
        </div>
      </section>

      <section className="patriotic-boundary">
        <div><p className="section-label">The boundary</p><h2>Foreign-policy criticism is not hindsight masquerading as proof.</h2></div>
        <div>
          <p>“Isolationist,” “imperial,” “reckless,” and “anti-American” are editorial judgments, not legal verdicts. The archive ties them to stated principles and documented consequences, while preserving mixed results, lawful authority where it exists, uncertainty, resumption of paused measures, and competing explanations.</p>
          <p>Some outcomes remain in motion. A policy can be legal but self-defeating, unlawful but popular, coercive yet temporarily effective, or morally objectionable despite producing a concession. The record must show which claim is being made.</p>
          <Link href="/methodology">Read the complete methodology <ArrowIcon /></Link>
        </div>
      </section>

      <footer>
        <div className="wordmark wordmark--footer"><span className="wordmark__mark">TDS</span><span className="wordmark__text">The evidence archive</span></div>
        <p>Power at home. Credibility abroad.</p>
        <div className="footer-links"><Link href="/">Evidence</Link><Link href="/patriotic-test">Patriotic Test</Link><Link href="/deal-test">Deal Test</Link><Link href="/methodology">Methodology</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
