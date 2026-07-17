import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Voices | TDS",
  description: "Three ways to examine the Christian public witness around Trumpism: faithful resistance, documented complicity, and conduct tested against the teaching of Jesus.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/voices/" },
  openGraph: {
    title: "Voices | TDS",
    description: "Hear the resistance. Examine the complicity. Test the conduct.",
    url: "https://dtrezise.github.io/TDS/voices/",
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
    title: "Voices | TDS",
    description: "Hear the resistance. Examine the complicity. Test the conduct.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const sections = [
  {
    eyebrow: "Faithful resistance",
    title: "Rooftops",
    description: "Christian leaders, pastors, historians, writers, and movements publicly resisting Christian nationalism and offering faithful alternatives.",
    href: "/rooftops/",
    image: "/rooftops-hero.jpg",
    imageAlt: "Rooftops — Christian voices against Christian nationalism",
    action: "Hear the voices",
  },
  {
    eyebrow: "Documented alignment",
    title: "Blind Eyes",
    description: "A sourced record of prominent Christian leaders and institutions that have excused, sanctified, or materially advanced Trump-aligned Christian nationalism.",
    href: "/blind-eyes/",
    image: "/blind-eyes-hero.jpg",
    imageAlt: "Blind Eyes — pulpits that bless political power",
    action: "Examine the record",
  },
  {
    eyebrow: "Conduct against teaching",
    title: "Anti Christ",
    description: "Not a prophecy claim. A category-by-category comparison of documented conduct with commandments, the Beatitudes, the fruit of the Spirit, and Jesus’s teaching.",
    href: "/anti-christ/",
    image: "/anti-christ-hero.jpg",
    imageAlt: "Anti Christ — conduct against the teaching",
    action: "Apply the comparison",
  },
] as const;

function publicAssetPath(src: string) {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const basePath = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}` : "";
  return `${basePath}${src}`;
}

export default function VoicesHubPage() {
  return (
    <main className="hub-page voices-hub-page">
      <SiteHeader active="voices" />

      <section className="hub-card-grid" aria-label="Voices sections">
        {sections.map((section) => (
          <article className="hub-card" key={section.title}>
            <Link className="hub-card__image" href={section.href} aria-label={`${section.action}: ${section.title}`}>
              <Image
                src={publicAssetPath(section.image)}
                alt={section.imageAlt}
                width={1733}
                height={908}
                sizes="(max-width: 760px) 100vw, 33vw"
                unoptimized
              />
            </Link>
            <div className="hub-card__body">
              <p className="eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <Link href={section.href}>{section.action} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="hub-boundary">
        <p className="section-label">A necessary boundary</p>
        <h2>Critique the record. Do not erase the differences.</h2>
        <p>
          Inclusion in Rooftops does not imply affiliation with this archive. Inclusion in Blind Eyes records sourceable public conduct, not a claim about a person’s private faith. Anti Christ compares conduct with teaching; it does not claim supernatural knowledge or assign a prophetic identity.
        </p>
        <Link href="/methodology/">Read the methods <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter tagline="Accountability is not derangement. Refusing the record is." />
    </main>
  );
}
