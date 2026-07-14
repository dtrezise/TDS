import { TdsArchive } from "./tds-archive";
import { PageMasthead, SiteHeader } from "./site-chrome";

export default function Home() {
  return (
    <main className="evidence-page">
      <SiteHeader active="evidence" />
      <PageMasthead src="/evidence-hero.jpg" alt="TDS — The Evidence Archive. The derangement is denying the record." priority />
      <TdsArchive />
    </main>
  );
}
