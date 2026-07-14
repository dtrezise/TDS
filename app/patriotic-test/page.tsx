import type { Metadata } from "next";
import Link from "next/link";
import { caseFiles, type CaseFile } from "@/data/cases";
import { PageMasthead, SiteFooter, SiteHeader, TestSuiteNav } from "../site-chrome";
import { ShareEBox } from "../share-ebox";
import { TestScorecard } from "../test-scorecard";
import { TestScoreBadge } from "../test-score-badge";
import { scoreCaseAgainstRubric, scoreTextAgainstRubric } from "@/data/test-rubrics";

export const metadata: Metadata = {
  title: "Patriotic Test | TDS",
  description: "A documented test of loyalty to the Constitution, rule of law, free elections, a free press, equal rights, checks and balances, and public power used for public—not personal—ends.",
  alternates: {
    canonical: "https://dtrezise.github.io/TDS/patriotic-test/",
  },
  openGraph: {
    title: "Patriotic Test — The Constitution Above the Leader",
    description: "A constitutional test of Trump, his administration, and the allies who helped execute or excuse abuses of public power.",
    url: "https://dtrezise.github.io/TDS/patriotic-test/",
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
    title: "Patriotic Test | TDS",
    description: "A patriot defends the Constitution and the rights of the people—not a leader's demand for personal loyalty.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const evidenceGroups = [
  {
    number: "01",
    title: "Power must yield to elections",
    thesis: "The republic survives only when officeholders place certified votes and peaceful transfer above one leader's demand to remain in power.",
    ids: [
      "election-subversion-january-6-report",
      "gop-election-certification-objections",
      "second-impeachment-january-6",
    ],
  },
  {
    number: "02",
    title: "The executive must obey law and oversight",
    thesis: "A president is not a sovereign. Appropriations, congressional oversight, statutory safeguards, constitutional citizenship, and court review bind the executive branch.",
    ids: [
      "ukraine-aid-impoundment-violation",
      "first-impeachment-ukraine",
      "mass-inspector-general-firings-2025",
      "birthright-citizenship-order-unconstitutional",
    ],
  },
  {
    number: "03",
    title: "Office is a trust, not a personal weapon",
    thesis: "Investigations, public money, foreign relationships, clemency, and coercive power must serve public purposes—not enrichment, self-protection, or vengeance.",
    ids: [
      "mueller-obstruction-evidence",
      "foreign-government-payments-emoluments",
      "january-6-blanket-clemency",
      "faith-retribution-enemy-within-2023-2024",
    ],
  },
  {
    number: "04",
    title: "Emergency and foreign-policy labels do not erase constitutional limits",
    thesis: "Tariffs, removals, war, and reorganization still require statutory authority, due process, Congress's constitutional role, and officials willing to defend those boundaries.",
    ids: [
      "ieepa-tariffs-supreme-court-2026",
      "alien-enemies-act-summary-removals-2025",
      "iran-nuclear-strikes-war-powers-2025",
      "rubio-usaid-state-dismantling-2025",
    ],
  },
] as const;

const pressCase = {
  id: "associated-press-white-house-access-2025",
  title: "A federal district court found the White House likely retaliated against the Associated Press for its editorial language",
  date: "February–July 2025",
  status: "District-court preliminary injunction; appellate panel stayed relief for restricted presidential spaces but not the East Room; no final merits judgment cited here",
  summary: "After the Associated Press continued using “Gulf of Mexico” while also acknowledging President Trump's preferred “Gulf of America,” the White House restricted AP access to certain presidential events. A federal district court granted preliminary relief, finding the exclusion likely violated the First Amendment because it punished the outlet's viewpoint. A divided D.C. Circuit panel then stayed the injunction for the Oval Office, Air Force One, Mar-a-Lago, and similar restricted spaces, concluding the government was likely to succeed there, but declined to stay the protection for the generally accessible East Room. The court later denied rehearing en banc.",
  significance: "The rulings draw a more exact patriotic line than either side's slogan: the president retains broad discretion over private or restricted access, while spaces and press facilities opened generally carry protections against viewpoint discrimination. Because the litigation posture is preliminary, the archive does not describe either ruling as a final merits judgment.",
  sources: [
    {
      label: "District court memorandum opinion granting preliminary injunction",
      publisher: "U.S. District Court for the District of Columbia via GovInfo",
      url: "https://www.govinfo.gov/app/details/USCOURTS-dcd-1_25-cv-00532/USCOURTS-dcd-1_25-cv-00532-0",
    },
    {
      label: "D.C. Circuit order partially granting and partially denying a stay",
      publisher: "U.S. Court of Appeals for the D.C. Circuit",
      url: "https://media.cadc.uscourts.gov/orders/docs/2025/06/25-5109LDSN3.pdf",
    },
    {
      label: "D.C. Circuit order denying rehearing en banc",
      publisher: "U.S. Court of Appeals for the D.C. Circuit",
      url: "https://media.cadc.uscourts.gov/orders/docs/2025/07/25-5109LDEN.pdf",
    },
  ],
} as const;

function getCase(id: string): CaseFile {
  const item = caseFiles.find((caseFile) => caseFile.id === id);
  if (!item) throw new Error(`Missing Patriotic Test case: ${id}`);
  return item;
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function EvidenceRecord({ item }: { item: CaseFile }) {
  const anchor = `patriotic-${item.id}`;
  const score = scoreCaseAgainstRubric(item, "patriotic", "Fails");
  return (
    <article className="patriotic-record" id={anchor}>
      <TestScoreBadge score={score} id={`${anchor}-score`} />
      <p className="patriotic-record__date">{item.date}</p>
      <h3>{item.title}</h3>
      <div className="patriotic-record__status"><strong>Record status</strong><span>{item.status}</span></div>
      <p>{item.summary}</p>
      <p className="patriotic-record__significance"><strong>Why it matters</strong>{item.significance}</p>
      <ShareEBox anchor={anchor} title={item.title} summary={item.summary} status={item.status} context="Patriotic Test" />
      <div className="patriotic-record__links">
        {item.sources.slice(0, 2).map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.publisher}: {source.label} <ArrowIcon /></a>
        ))}
        <Link href={`/#${item.id}`}>Open full Evidence case file <ArrowIcon /></Link>
      </div>
    </article>
  );
}

export default function PatrioticTestPage() {
  return (
    <main className="patriotic-page">
      <SiteHeader active="tests" />
      <PageMasthead src="/patriotic-test-hero.jpg" alt="Patriotic Test — The Constitution Above the Leader" priority />

      <section className="patriotic-contrast" aria-label="Patriotism compared with loyalism">
        <article>
          <span>Loyalism</span>
          <h2>The leader above the law.</h2>
          <p>Truth bends to the leader. Institutions are legitimate only when they obey. Critics become enemies. Power is judged by whether it protects the movement.</p>
        </article>
        <article>
          <span>Patriotism</span>
          <h2>The Constitution above the leader.</h2>
          <p>Facts constrain the leader. Institutions keep their lawful independence. Dissent remains protected. Power is judged by whether it preserves rights and republican government.</p>
        </article>
      </section>

      <TestSuiteNav active="patriotic" />

      <section className="patriotic-intro">
        <div>
          <p className="section-label">The constitutional standard</p>
          <h1>A patriot owes loyalty to the Constitution—not personal obedience to a leader.</h1>
        </div>
        <div className="patriotic-intro__copy">
          <p className="patriotic-intro__lead">A loyalist asks what serves the leader. A patriot asks what preserves the republic and the rights of the people.</p>
          <p>This is not a test of flags, slogans, military pageantry, party registration, or whether a person voted for Trump. It tests documented public conduct: elections, law, constitutional rights, institutional limits, conflicts of interest, retaliation, and the use of state power.</p>
          <p>The focus is Donald Trump and the officials, allies, and lawmakers who helped execute, legitimize, or excuse specific acts. Every entry preserves its legal and evidentiary status. Criticism is not proof; neither is a pardon an acquittal or a lawful power beyond moral and democratic judgment.</p>
          <Link href="#patriotic-record">Examine the record <ArrowIcon /></Link>
        </div>
      </section>

      <TestScorecard
        testId="patriotic"
        intro="The Constitution allocates power, protects rights, and requires public officers to support the constitutional order. The score makes those commitments directly applicable to each record."
      />

      <section className="patriotic-record-section" id="patriotic-record" aria-labelledby="patriotic-record-title">
        <header>
          <p className="section-label">The record</p>
          <h2 id="patriotic-record-title">Constitutional principle is only as serious as the evidence beneath it.</h2>
          <p>These are selected records, not a complete constitutional history. Each status line marks what the cited record actually establishes—and what it does not.</p>
        </header>

        {evidenceGroups.map((group) => (
          <section className="patriotic-group" aria-labelledby={`patriotic-group-${group.number}`} key={group.number}>
            <div className="patriotic-group__heading">
              <span>{group.number}</span>
              <div><h2 id={`patriotic-group-${group.number}`}>{group.title}</h2><p>{group.thesis}</p></div>
            </div>
            <div className="patriotic-record-grid">
              {group.ids.map((id) => <EvidenceRecord item={getCase(id)} key={id} />)}
            </div>
          </section>
        ))}

        <section className="patriotic-group" aria-labelledby="patriotic-group-05">
          <div className="patriotic-group__heading">
            <span>05</span>
            <div><h2 id="patriotic-group-05">A free press is not a presidential favor</h2><p>The First Amendment protects a press able to report without adopting the government&apos;s preferred words or viewpoint.</p></div>
          </div>
          <div className="patriotic-record-grid patriotic-record-grid--single">
            <article className="patriotic-record" id={pressCase.id}>
              <TestScoreBadge
                score={scoreTextAgainstRubric("patriotic", [pressCase.title, pressCase.status, pressCase.summary, pressCase.significance].join(" "), "Fails")}
                id={`${pressCase.id}-score`}
              />
              <p className="patriotic-record__date">{pressCase.date}</p>
              <h3>{pressCase.title}</h3>
              <div className="patriotic-record__status"><strong>Record status</strong><span>{pressCase.status}</span></div>
              <p>{pressCase.summary}</p>
              <p className="patriotic-record__significance"><strong>Why it matters</strong>{pressCase.significance}</p>
              <ShareEBox anchor={pressCase.id} title={pressCase.title} summary={pressCase.summary} status={pressCase.status} context="Patriotic Test · Free press" />
              <div className="patriotic-record__links">
                {pressCase.sources.map((source) => (
                  <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.publisher}: {source.label} <ArrowIcon /></a>
                ))}
              </div>
            </article>
          </div>
        </section>
      </section>

      <section className="patriotic-boundary">
        <div>
          <p className="section-label">The boundary</p>
          <h2>Patriotism is not a shortcut around proof.</h2>
        </div>
        <div>
          <p>“Unpatriotic,” “authoritarian,” “abuse of power,” and “loyalist” are editorial judgments here, not criminal charges. They are applied to documented conduct and explained constitutional principles—not presumed motives, party identity, family relationship, or association alone.</p>
          <p>Some records are verdicts or final rulings. Others are congressional findings, preliminary orders, direct rhetoric, acquittals, dismissals, unresolved disputes, or lawful exercises of power with grave accountability consequences. The status travels with the claim.</p>
          <p>Patriotism also protects the rights of people we oppose. The test therefore rejects both leader-worship and careless accusation: constitutional criticism must remain as exact as the record.</p>
          <Link href="/methodology">Read the complete methodology <ArrowIcon /></Link>
        </div>
      </section>

      <SiteFooter tagline="The Constitution above the leader." />
    </main>
  );
}
