import type { Metadata } from "next";
import Link from "next/link";
import {
  activeWhatsNewEntries,
  whatsNewEditorialNote,
  whatsNewEntries,
  whatsNewLastReconciled,
  whatsNewWindowDays,
} from "@/data/whats-new";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { ShareTools } from "../share-tools";
import { WhatsNewFeed } from "./whats-new-feed";

export const metadata: Metadata = {
  title: "What’s New | TDS",
  description: "A rolling two-week index of newly published and materially updated TDS Evidence and Voices records.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/whats-new/" },
  openGraph: {
    title: "What’s New | TDS",
    description: "New evidence files and Voices records from the past two weeks, each linked to its permanent archive location.",
    url: "https://dtrezise.github.io/TDS/whats-new/",
    type: "website",
    images: [{
      url: "https://dtrezise.github.io/TDS/share-banner.png",
      width: 1731,
      height: 909,
      alt: "TDS — The Evidence Archive.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What’s New | TDS",
    description: "The latest additions to the TDS Evidence and Voices collections.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const initiallyActive = activeWhatsNewEntries(whatsNewLastReconciled);
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "What’s New in the TDS Evidence Archive",
  description: metadata.description,
  url: "https://dtrezise.github.io/TDS/whats-new/",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: initiallyActive.length,
    itemListElement: initiallyActive.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `https://dtrezise.github.io/TDS${item.href}`,
    })),
  },
};

export default function WhatsNewPage() {
  return (
    <main className="new-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader active="whats-new" />

      <section className="new-hero">
        <div>
          <p className="section-label">A rolling two-week publication window</p>
          <h1>What’s<br /><em>new.</em></h1>
        </div>
        <div className="new-hero__copy">
          <p>New case files and material Voices updates appear here for {whatsNewWindowDays} days. Each card links to the permanent record, where it remains after leaving this page.</p>
          <div><a className="button button--primary" href="#recent">See recent additions</a><Link className="button button--text" href="/">Browse the full archive <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="new-boundary" aria-label="What’s New publication boundary">
        <strong>Discovery is not publication.</strong>
        <span>{whatsNewEditorialNote}</span>
        <small>Feed reconciled {whatsNewLastReconciled}. Expiration is calculated in the reader’s browser.</small>
      </section>

      <WhatsNewFeed entries={whatsNewEntries} initialAsOf={whatsNewLastReconciled} windowDays={whatsNewWindowDays} />

      <ShareTools
        shareTitle="What’s New in the TDS Evidence Archive"
        shareText="See the evidence and Voices records published or materially updated during the past two weeks."
        canonicalUrl="https://dtrezise.github.io/TDS/whats-new/"
        label="Share the What’s New index"
      />
      <SiteFooter tagline="New here for two weeks. Permanent in the record." />
    </main>
  );
}
