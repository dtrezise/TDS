import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "../policy-page";

export const metadata: Metadata = {
  title: "About | TDS",
  description: "The purpose, point of view, scope, and accountability commitments of the TDS Evidence Archive.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/about/" },
};

export default function AboutPage() {
  return (
    <PolicyPage
      eyebrow="About this project"
      title="An argument that owes the public a record."
      lead="TDS is an independent, explicitly critical evidence archive about Donald Trump, the public officials and organizations acting with him, and the civic, moral, and material consequences of their documented conduct."
      tagline="An editorial position. An inspectable record."
    >
      <PolicySection title="Purpose and point of view">
        <p>The archive rejects the idea that criticism must pretend neutrality. It argues that sustained loyalty to Trump often requires denial, minimization, or celebration of a large public record. That conclusion is editorial; the facts beneath it must remain separately inspectable.</p>
        <p>“Derangement” is political rhetoric, not a diagnosis. The project critiques public conduct, public claims, institutions, and uses of power. It does not invite harassment or make claims about protected identity.</p>
      </PolicySection>

      <PolicySection title="What appears here">
        <p>Each evidence case file uses a permanent ID, a narrow summary, an exact procedural or evidentiary status, a reason for inclusion, retrieval dates, and links to the strongest records available. Moral and civic “tests” are labeled editorial analysis and do not replace the factual record.</p>
        <p>Scope extends beyond crimes. The archive may examine constitutional overreach, election administration, retaliation, conflicts of interest, clemency, institutional self-branding, reckless presidential conduct, misuse of public resources, territorial coercion, alliance and treaty conduct, authoritarian courtship, and failures of promised delivery. Inclusion means that documented conduct warrants public-interest examination; it is not a declaration that the conduct was illegal.</p>
        <p>The archive can be incomplete even when a published entry is accurate. Coverage choices, research capacity, archival access, and publication risk all affect what has been reviewed.</p>
      </PolicySection>

      <PolicySection title="Independence and privacy">
        <p>The project is not affiliated with Donald Trump, the Trump Organization, a campaign, political party, church, or any person or institution discussed here. Protecting a contributor&apos;s private identity does not reduce the project&apos;s duty to publish its evidence, methods, conflicts, funding relationships, and corrections honestly.</p>
        <p>No public membership, sponsorship, advertising, or merchandise program is active as of this page&apos;s publication. Any future commercial relationship must be disclosed and cannot purchase a finding, suppress a correction, or control the archive&apos;s conclusions.</p>
      </PolicySection>

      <nav className="policy-links" aria-label="Project accountability policies">
        <Link href="/methodology/">Publication methodology</Link>
        <Link href="/editorial-independence/">Editorial independence</Link>
        <Link href="/ai-use/">AI use policy</Link>
        <Link href="/corrections/">Corrections and updates</Link>
        <Link href="/privacy/">Privacy</Link>
      </nav>
    </PolicyPage>
  );
}
