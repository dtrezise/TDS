import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "../policy-page";

export const metadata: Metadata = {
  title: "Corrections and Updates | TDS",
  description: "How the TDS Evidence Archive handles corrections, status changes, responses, and material updates.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/corrections/" },
};

const correctionsEmail = process.env.NEXT_PUBLIC_CORRECTIONS_EMAIL;

export default function CorrectionsPage() {
  return (
    <PolicyPage
      eyebrow="Corrections and updates"
      title="The record changes. The history should remain visible."
      lead="Material errors are corrected promptly. Appeals, reversals, dismissals, new findings, source corrections, denials, and credible contrary evidence are added to the relevant permanent case file."
      tagline="Correct clearly. Preserve what changed."
    >
      <PolicySection title="Correction standard">
        <p>A material correction changes a factual assertion, legal status, attribution, quotation, date, identity, source relationship, or conclusion a reasonable reader could rely on. Typographical and formatting fixes may be repaired without a formal notice when they do not change meaning.</p>
        <p>A corrected file should identify what changed, when it changed, and why. The project does not quietly erase a claim that materially affected the argument.</p>
      </PolicySection>

      <PolicySection title="Request a review">
        <p>Include the permanent case ID or page URL, the exact statement at issue, the proposed correction, and the strongest supporting record. State whether you are the subject, an authorized representative, a source, or another reader. Do not send confidential, privileged, or illegally obtained material.</p>
        {correctionsEmail ? (
          <p><a className="policy-action" href={`mailto:${correctionsEmail}?subject=TDS%20correction%20request`}>Email the correction desk</a></p>
        ) : (
          <div className="policy-notice"><strong>Launch gate:</strong> a dedicated correction channel has not yet been configured. Broad promotion should remain paused until <code>NEXT_PUBLIC_CORRECTIONS_EMAIL</code> is set to a monitored project address that does not expose a contributor&apos;s personal account.</div>
        )}
      </PolicySection>

      <PolicySection title="Public correction ledger">
        <p>No material public corrections have been logged in this edition. This statement does not mean the archive is error-free; it records the current public ledger. Material corrections will be listed here and attached to the affected case file.</p>
      </PolicySection>

      <PolicySection title="Response and review boundaries">
        <p>A request is evaluated against the record, not the requester&apos;s political alignment. The project may seek clarification, publish a response or denial, narrow a claim, add context, or leave an accurate statement unchanged. High-risk disputes should receive independent media-law review before republication.</p>
        <p><Link href="/methodology/">Read the publication methodology →</Link></p>
      </PolicySection>
    </PolicyPage>
  );
}
