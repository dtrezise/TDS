import type { Metadata } from "next";
import { PolicyPage, PolicySection } from "../policy-page";

export const metadata: Metadata = {
  title: "AI Use Policy | TDS",
  description: "How TDS uses artificial intelligence in research, drafting, testing, and publication.",
  alternates: { canonical: "https://dtrezise.github.io/TDS/ai-use/" },
};

export default function AiUsePage() {
  return (
    <PolicyPage
      eyebrow="AI use policy"
      title="AI can assist the workflow. It cannot become the source."
      lead="Models may help discover leads, structure records, compare language, check consistency, generate software, and identify possible updates. No model output is itself evidence."
      tagline="Human judgment. Inspectable evidence."
    >
      <PolicySection title="Permitted assistance">
        <p>AI may support search planning, source triage, transcription review, data normalization, duplicate detection, code, accessibility testing, and first drafts. Researchers must open the underlying source, verify the passage and context, preserve exact status, and check for contrary facts.</p>
      </PolicySection>

      <PolicySection title="Publication boundary">
        <p>New allegations, legal conclusions, theological judgments, numerical ratings, quotations, and material status changes must not be published solely because a model generated them. Daily monitoring produces private review candidates; it does not autonomously edit, commit, push, or deploy the public archive.</p>
        <p>Automated keyword matching may identify a relevant test lens, but it cannot produce a defensible score or final verdict. Published analysis requires an evidence-specific explanation reviewed by a human editor.</p>
      </PolicySection>

      <PolicySection title="Sensitive material">
        <p>Confidential sources, private contact data, legal strategy, credentials, unpublished interview material, and security-sensitive operations should not be sent to a model or service unless the project has approved the provider, retention terms, access controls, and lawful purpose.</p>
      </PolicySection>

      <PolicySection title="Accountability">
        <p>TDS remains responsible for every published claim regardless of which tool assisted the work. Corrections are evaluated against the evidence, not excused as an AI error.</p>
      </PolicySection>
    </PolicyPage>
  );
}
