import type { Metadata } from "next";
import { PolicyPage, PolicySection } from "../policy-page";

export const metadata: Metadata = {
  title: "Privacy | TDS",
  description: "Current privacy practices for the static TDS Evidence Archive.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/privacy/" },
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Collect less. Expose less. Promise only what is true."
      lead="This edition is a static publication. It has no account system, membership database, comment system, advertising tracker, or first-party analytics configured by the project."
      tagline="Minimal collection is the default."
    >
      <PolicySection title="What this site receives">
        <p>The project does not intentionally collect names, email addresses, precise locations, payment information, or behavioral profiles through this static site. The hosting provider may retain ordinary security and access logs under its own terms.</p>
        <p>The incident suggestion form prepares a structured research lead in your browser. Unless a monitored project email address or secure submission endpoint is explicitly shown as active, nothing entered in that form is uploaded by TDS; you may copy or download the packet yourself. If direct intake is later activated, the form will state that clearly before submission and this notice must be updated to identify the operator, data retained, purpose, access controls, and deletion policy.</p>
        <p>Opening an external source or choosing a social-share destination sends you to that third party. Its privacy policy and account settings apply there. Social scripts are not embedded merely by viewing an eBox; a destination opens only after you choose it.</p>
      </PolicySection>

      <PolicySection title="Future services">
        <p>Memberships, newsletters, donations, stores, advertising, interviews, or account features will require a revised privacy notice before collection begins. Sensitive editorial research, source identities, outreach records, and interview consent belong in restricted systems—not the public site repository.</p>
      </PolicySection>

      <PolicySection title="Security and identity">
        <p>The site does not promise anonymity against a determined legal or technical adversary. Contributors should separate project and personal accounts, use phishing-resistant multi-factor authentication, minimize public metadata, and obtain professional security and legal advice before a high-profile launch.</p>
      </PolicySection>
    </PolicyPage>
  );
}
