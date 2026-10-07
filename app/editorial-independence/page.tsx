import type { Metadata } from "next";
import { PolicyPage, PolicySection } from "../policy-page";

export const metadata: Metadata = {
  title: "Editorial Independence | TDS",
  description: "Editorial independence, funding, conflicts, and separation standards for TDS.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/editorial-independence/" },
};

export default function EditorialIndependencePage() {
  return (
    <PolicyPage
      eyebrow="Editorial independence"
      title="Support may fund the work. It may not buy the conclusion."
      lead="Evidence selection, claim wording, corrections, and review status must be insulated from advertisers, donors, members, merchandise partners, political organizations, guests, and audience pressure."
      tagline="Funding never outranks the record."
    >
      <PolicySection title="Current position">
        <p>No public membership, advertising, sponsorship, or merchandise program is active in this edition. The project is not operated by a campaign, political party, church, or any subject of the archive.</p>
      </PolicySection>

      <PolicySection title="Required separation">
        <p>Future revenue partners may not preview unpublished findings, direct coverage, suppress a correction, obtain favorable placement, or condition payment on a political conclusion. Sponsored material must be clearly labeled and visually distinct from evidence files.</p>
        <p>Interview access, donations, event participation, affiliate revenue, free products, travel support, and close personal or professional relationships that bear on coverage must be disclosed or managed before publication.</p>
      </PolicySection>

      <PolicySection title="Governance before scale">
        <p>Before public fundraising or paid membership begins, TDS should establish written conflict disclosures, contributor agreements, source and interview consent rules, expenditure controls, an independent correction route, and outside legal review for unusually high-risk work.</p>
      </PolicySection>
    </PolicyPage>
  );
}
