import type { Metadata } from "next";
import Link from "next/link";
import { caseFiles, type CaseFile } from "@/data/cases";
import { PageMasthead, SiteFooter, SiteHeader, TestSuiteNav } from "../site-chrome";
import { TestEvidenceRecord } from "../test-evidence-record";

export const metadata: Metadata = {
  title: "World Standing Test | TDS",
  description: "A documented test of how Trump-era conduct affected U.S. credibility, alliance leverage, institutional reach, expertise, financial influence, and capacity to lead.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/world-standing-test/" },
  openGraph: {
    title: "World Standing Test — Power is also the ability to lead",
    description: "Measure influence, credibility, capacity, alliances, rule-setting power, and the consequences of withdrawal.",
    url: "https://dtrezise.github.io/TDS/world-standing-test/",
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
    title: "World Standing Test | TDS",
    description: "Power is also the ability to lead.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const standards = [
  ["Credible commitments", "Treaties, guarantees, and agreements", "Do allies, adversaries, markets, and citizens have reason to believe the next U.S. commitment will survive the next threat, grievance, or news cycle?"],
  ["Alliance leverage", "Influence multiplied through trusted partners", "Did the action increase shared capacity and bargaining power—or make partners hedge against an unpredictable United States?"],
  ["A seat at the table", "Institutions set rules with or without us", "Did withdrawal improve American leverage, or surrender votes, information, standards, and agenda-setting power to others?"],
  ["National capacity", "Diplomacy, aid, health, science, and expertise", "Did the action preserve the people and institutions needed to prevent crises, understand local conditions, and implement policy?"],
  ["Lawful example", "Power reinforced by constitutional credibility", "Can the United States defend sovereignty, law, elections, and human rights abroad while visibly weakening those commitments at home?"],
  ["Economic influence", "Currency, trade, technology, sanctions, and markets", "Did the policy make U.S. rules and markets more attractive and dependable—or encourage partners to build alternatives?"],
] as const;

const groups = [
  {
    number: "01",
    title: "Withdrawal gives up more than membership",
    thesis: "WHO, climate diplomacy, USAID, and State Department expertise are also networks of information, access, standards, and influence. The test counts what fills the space after the United States leaves.",
    ids: ["paris-unfccc-withdrawals-2025-2026", "who-withdrawal-2025-2026", "rubio-usaid-state-dismantling-2025", "state-human-rights-capacity-cuts-2025"],
  },
  {
    number: "02",
    title: "Allies are leverage, not tribute states",
    thesis: "World standing depends on partners believing that American commitments are mutual, lawful, and more durable than a president's personal pressure campaign.",
    ids: ["nato-threats-and-five-percent-bargain-2024-2026", "ukraine-aid-pause-and-un-vote-2025", "greenland-annexation-pressure-2025-2026", "canada-annexation-and-tariff-coercion-2024-2025", "panama-canal-sovereignty-pressure-2024-2025"],
  },
  {
    number: "03",
    title: "Force can display power while spending influence",
    thesis: "Military action must be measured not only by immediate destruction or capture, but by lawful authority, coalition support, escalation, precedent, civilian risk, and the order left behind.",
    ids: ["iran-nuclear-strikes-war-powers-2025", "venezuela-lethal-boat-strikes-2025", "maduro-capture-and-venezuelan-oil-control-2026"],
  },
  {
    number: "04",
    title: "Deals and tariffs become credibility tests",
    thesis: "Unkept purchase targets, unenforced summit language, unstable tariffs, and agreements that unravel teach every future counterparty how much a U.S. announcement is worth.",
    ids: ["tariff-volatility-economic-costs-2025-2026", "ieepa-tariffs-supreme-court-2026", "china-phase-one-purchase-shortfall-2020-2025", "north-korea-summit-denuclearization-2018-2019", "doha-afghanistan-withdrawal-deal-2020-2021"],
  },
] as const;

function getCase(id: string): CaseFile {
  const item = caseFiles.find((caseFile) => caseFile.id === id);
  if (!item) throw new Error(`Missing World Standing Test case: ${id}`);
  return item;
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function WorldStandingTestPage() {
  return (
    <main className="patriotic-page test-page test-page--world">
      <SiteHeader active="tests" />
      <PageMasthead src="/world-standing-test-hero.png" alt="World Standing — Power is also the ability to lead" priority />

      <section className="patriotic-contrast" aria-label="Isolation compared with world standing">
        <article>
          <span>Power as isolation</span>
          <h2>Exit the room. Threaten the partners.</h2>
          <p>Withdrawal is treated as strength by itself. Cooperation becomes submission, alliances become invoices, and the visible use of force substitutes for the harder work of durable influence.</p>
        </article>
        <article>
          <span>World standing, tested</span>
          <h2>Shape the room others still occupy.</h2>
          <p>Power includes trusted commitments, capable institutions, attractive markets, expert reach, democratic credibility, and partners willing to act with the United States when the stakes are real.</p>
        </article>
      </section>

      <TestSuiteNav active="world-standing" />

      <section className="patriotic-intro">
        <div>
          <p className="section-label">The influence standard</p>
          <h1>World power is more than the ability to compel. It is the ability to convene, persuade, and lead.</h1>
        </div>
        <div className="patriotic-intro__copy">
          <p className="patriotic-intro__lead">America First measures the benefit to Americans. World Standing measures the influence available to America.</p>
          <p>The two overlap, but they are not identical. A policy may produce a short-term concession while weakening trust, expertise, coalition capacity, financial influence, or the willingness of other countries to accept U.S. leadership later.</p>
          <p>This test uses observable substitutes for slogans such as “pariah” or “laughing stock”: treaty commitments, votes, withdrawals, retaliation, counterparty performance, allied coordination, institutional capacity, market effects, and the durability of U.S. promises.</p>
          <Link href="#world-record">Examine the record <ArrowIcon /></Link>
        </div>
      </section>

      <section className="patriotic-standards" aria-labelledby="world-standards-title">
        <div className="patriotic-standards__heading">
          <p className="section-label">Six recurring measures</p>
          <h2 id="world-standards-title">What the World Standing Test measures.</h2>
          <p>Influence is not sentiment alone. It rests on assets, relationships, rules, expertise, credibility, and the demonstrated ability to assemble others behind a durable objective.</p>
        </div>
        <div className="patriotic-standards__grid world-standards-grid">
          {standards.map((item, index) => (
            <article key={item[0]}>
              <span>{String(index + 1).padStart(2, "0")} · {item[1]}</span>
              <h3>{item[0]}</h3>
              <p>{item[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="patriotic-record-section" id="world-record" aria-labelledby="world-record-title">
        <header>
          <p className="section-label">The record</p>
          <h2 id="world-record-title">Influence lost is a consequence—even when it never appears in a signing ceremony.</h2>
          <p>These records examine institutional withdrawal, allied coercion, force, tariffs, summit diplomacy, and the long-term value of an American commitment.</p>
        </header>

        {groups.map((group) => (
          <section className="patriotic-group" aria-labelledby={`world-group-${group.number}`} key={group.number}>
            <div className="patriotic-group__heading">
              <span>{group.number}</span>
              <div><h2 id={`world-group-${group.number}`}>{group.title}</h2><p>{group.thesis}</p></div>
            </div>
            <div className="patriotic-record-grid">
              {group.ids.map((id) => <TestEvidenceRecord item={getCase(id)} prefix="world" key={id} />)}
            </div>
          </section>
        ))}
      </section>

      <section className="patriotic-boundary">
        <div><p className="section-label">The boundary</p><h2>Influence must be shown through consequences—not applause lines.</h2></div>
        <div>
          <p>The test does not assume that every international institution deserves continued membership, that every ally is right, or that every use of force reduces standing. Withdrawal, coercion, or force can produce gains. Those gains remain in the record.</p>
          <p>The conclusion turns on the full ledger: what capacity remained, what partners did, what competitors gained, what commitments endured, and whether the United States retained more or less ability to shape the next decision.</p>
          <Link href="/methodology">Read the complete methods <ArrowIcon /></Link>
        </div>
      </section>

      <SiteFooter tagline="Power is also the ability to lead." />
    </main>
  );
}
