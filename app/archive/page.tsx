import type { Metadata } from "next";
import Link from "next/link";
import { archiveCounts, archiveEntries } from "@/data/archive";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { ArchiveIndex } from "./archive-index";

export const metadata: Metadata = {
  title: "Archive | TDS",
  description: "A compact reverse-chronological index of every TDS Evidence and Voices entry, organized by the date of the documented incident rather than publication date.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/archive/" },
  openGraph: {
    title: "Archive | TDS",
    description: "Browse every Evidence and Voices entry by incident date and open the full record.",
    url: "https://dtrezise.github.io/TDS/archive/",
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
    title: "Archive | TDS",
    description: "A compact chronology of the complete TDS Evidence and Voices record.",
    images: ["https://dtrezise.github.io/TDS/share-banner.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TDS Evidence and Voices Archive",
  description: metadata.description,
  url: "https://dtrezise.github.io/TDS/archive/",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: archiveEntries.length,
    itemListElement: archiveEntries.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `https://dtrezise.github.io/TDS${item.href}`,
    })),
  },
};

export default function ArchivePage() {
  return (
    <main className="archive-index-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader active="archive" />

      <header className="archive-index-hero">
        <div>
          <p className="section-label">The complete record · one compact chronology</p>
          <h1>Archive.</h1>
        </div>
        <div>
          <p>Browse every Evidence case and Voices entry in one list. Dated records are ordered by the incident or documented conduct—not by when TDS created the entry.</p>
          <p>Blind Eyes profiles are placed by their latest documented incident. Anti Christ collections use their latest included incident. Rooftops profiles are ongoing directories without a single incident date, so they appear after the dated chronology.</p>
          <Link className="archive-index-suggest" href="/suggest/">Suggest derangements here <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <section className="archive-index-summary" aria-label="Archive record counts">
        <span><strong>{archiveCounts.all}</strong> total entries</span>
        <span><strong>{archiveCounts.evidence}</strong> Evidence</span>
        <span><strong>{archiveCounts.rooftops}</strong> Rooftops</span>
        <span><strong>{archiveCounts["blind-eyes"]}</strong> Blind Eyes</span>
        <span><strong>{archiveCounts["anti-christ"]}</strong> Anti Christ</span>
      </section>

      <ArchiveIndex entries={archiveEntries} />
      <SiteFooter tagline="One list. Every record. The underlying evidence remains the authority." />
    </main>
  );
}
