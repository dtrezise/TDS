import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Tests | TDS",
  description: "Apply five explicit standards to the record: Christianity, patriotism, America First, deal performance, and world standing.",
  alternates: { canonical: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/tests/" },
  openGraph: {
    title: "The Tests | TDS",
    description: "Five standards. One documented record. Examine the contradictions.",
    url: "https://tds-evidence-archive-dan.trapezy.chatgpt.site/tests/",
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
    title: "The Tests | TDS",
    description: "Five standards. One documented record. Examine the contradictions.",
    images: ["https://tds-evidence-archive-dan.trapezy.chatgpt.site/share-banner.png"],
  },
};

const tests = [
  {
    number: "01",
    title: "Christianity Test",
    premise: "Does the conduct align with the commandments, Jesus’s teaching, the Beatitudes, and the fruit of the Spirit?",
    href: "/christianity-test/",
    image: "/christianity-test-hero.jpg",
    tone: "christianity",
  },
  {
    number: "02",
    title: "Patriotic Test",
    premise: "Does the conduct defend constitutional government, equal citizenship, free expression, a free press, and the rule of law?",
    href: "/patriotic-test/",
    image: "/patriotic-test-hero.jpg",
    tone: "patriotic",
  },
  {
    number: "03",
    title: "America First Test",
    premise: "Did the policy measurably strengthen Americans’ security, prosperity, alliances, institutions, and standing in the world?",
    href: "/america-first-test/",
    image: "/america-first-test-hero.jpg",
    tone: "america-first",
  },
  {
    number: "04",
    title: "Deal Test",
    premise: "Did the deal produce a durable, enforceable, favorable result—or merely a headline, concession, conflict, or transfer of risk?",
    href: "/deal-test/",
    image: "/deal-test-hero.jpg",
    tone: "deal",
  },
  {
    number: "05",
    title: "World Standing Test",
    premise: "Did the conduct strengthen—or surrender—U.S. credibility, alliance leverage, expertise, financial influence, and the ability to shape global rules?",
    href: "/world-standing-test/",
    image: "/world-standing-test-hero.png",
    tone: "world-standing",
  },
] as const;

function publicAssetPath(src: string) {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}` : "";
  return `${basePath}${src}`;
}

export default function TestsHubPage() {
  return (
    <main className="hub-page tests-hub-page">
      <SiteHeader active="tests" />

      <section className="test-hub-grid" aria-label="Evidence tests">
        {tests.map((test) => (
          <article className={`test-hub-card test-hub-card--${test.tone}`} key={test.number}>
            <Link className="test-hub-card__image" href={test.href} aria-label={`Open ${test.title}`}>
              <Image
                src={publicAssetPath(test.image)}
                alt=""
                width={1733}
                height={908}
                sizes="(max-width: 760px) 100vw, 50vw"
                unoptimized
              />
            </Link>
            <div className="test-hub-card__body">
              <span>{test.number}</span>
              <div>
                <h2>{test.title}</h2>
                <p>{test.premise}</p>
                <Link href={test.href}>Apply the test <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="hub-boundary">
        <p className="section-label">One archive, multiple lenses</p>
        <h2>The evidence does not change when the standard does.</h2>
        <p>
          The same underlying event may bear on more than one test. Cross-references are intentional. Source status, legal posture, corrections, denials, and limiting context remain attached to the evidence—not rewritten to fit a conclusion.
        </p>
        <Link href="/methodology/">Inspect the editorial standard <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter tagline="Apply the standard. Examine the record. Preserve the context." />
    </main>
  );
}
