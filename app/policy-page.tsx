import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./site-chrome";

export function PolicyPage({
  eyebrow,
  title,
  lead,
  children,
  tagline,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
  tagline: string;
}) {
  return (
    <main className="policy-page">
      <SiteHeader active="methodology" />
      <header className="policy-hero">
        <p className="section-label">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </header>
      <div className="policy-content">{children}</div>
      <SiteFooter tagline={tagline} />
    </main>
  );
}

export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2><div>{children}</div></section>;
}
