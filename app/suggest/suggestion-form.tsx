"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type DeliveryMode = "endpoint" | "email" | "local";

type Suggestion = {
  title: string;
  incidentDate: string;
  datePrecision: string;
  people: string;
  summary: string;
  primarySource: string;
  supportingSource: string;
  relevance: string;
  contraryContext: string;
  contact: string;
  submittedAt: string;
  intakeVersion: "1.0";
};

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildPacket(suggestion: Suggestion) {
  return [
    "TDS INCIDENT SUGGESTION — RESEARCH LEAD ONLY",
    "",
    `Title: ${suggestion.title || "Not supplied"}`,
    `Incident date: ${suggestion.incidentDate || "Not supplied"}${suggestion.datePrecision ? ` (${suggestion.datePrecision})` : ""}`,
    `People / institutions: ${suggestion.people || "Not supplied"}`,
    "",
    "What happened:",
    suggestion.summary || "Not supplied",
    "",
    `Strongest public source: ${suggestion.primarySource || "Not supplied"}`,
    `Additional public source: ${suggestion.supportingSource || "Not supplied"}`,
    "",
    "Why it may fit the archive:",
    suggestion.relevance || "Not supplied",
    "",
    "Denial, correction, defense, or contrary context:",
    suggestion.contraryContext || "Not supplied",
    "",
    `Optional follow-up contact: ${suggestion.contact || "Not supplied"}`,
    `Prepared: ${suggestion.submittedAt}`,
    "Intake version: 1.0",
    "",
    "This is an unverified lead. It must not be treated as a published TDS finding.",
  ].join("\n");
}

export function SuggestionForm({
  submissionEndpoint,
  suggestionEmail,
  deliveryMode,
}: {
  submissionEndpoint?: string;
  suggestionEmail?: string;
  deliveryMode: DeliveryMode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [packet, setPacket] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ready" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const canShare = useMemo(() => typeof navigator !== "undefined" && "share" in navigator, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const suggestion: Suggestion = {
      title: clean(data.get("title")),
      incidentDate: clean(data.get("incidentDate")),
      datePrecision: clean(data.get("datePrecision")),
      people: clean(data.get("people")),
      summary: clean(data.get("summary")),
      primarySource: clean(data.get("primarySource")),
      supportingSource: clean(data.get("supportingSource")),
      relevance: clean(data.get("relevance")),
      contraryContext: clean(data.get("contraryContext")),
      contact: clean(data.get("contact")),
      submittedAt: new Date().toISOString(),
      intakeVersion: "1.0",
    };
    const nextPacket = buildPacket(suggestion);
    setPacket(nextPacket);

    if (submissionEndpoint) {
      setStatus("sending");
      setMessage("Sending the lead to the project review queue…");
      try {
        const response = await fetch(submissionEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(suggestion),
        });
        if (!response.ok) throw new Error(`Submission endpoint returned ${response.status}`);
        setStatus("sent");
        setMessage("Suggestion delivered to the review queue. Publication is not guaranteed.");
        form.reset();
      } catch {
        setStatus("error");
        setMessage("Direct delivery failed. Nothing is marked received; copy or download the prepared packet below.");
      }
      return;
    }

    if (suggestionEmail) {
      const subject = encodeURIComponent(`TDS incident suggestion: ${suggestion.title || "Untitled lead"}`);
      const body = encodeURIComponent(nextPacket);
      window.location.href = `mailto:${suggestionEmail}?subject=${subject}&body=${body}`;
      setStatus("ready");
      setMessage("An email draft was opened. The suggestion is not delivered until you send that email.");
      return;
    }

    setStatus("ready");
    setMessage("No direct project intake channel is configured on this build, so nothing was uploaded. Copy or download the review packet below.");
  }

  async function copyPacket() {
    await navigator.clipboard.writeText(packet);
    setMessage("Review packet copied to the clipboard. Nothing was uploaded by this action.");
  }

  function downloadPacket() {
    const blob = new Blob([packet], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tds-incident-suggestion-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Review packet downloaded. Nothing was uploaded by this action.");
  }

  async function sharePacket() {
    if (!canShare) return;
    await navigator.share({ title: "TDS incident suggestion", text: packet });
  }

  function resetForm() {
    formRef.current?.reset();
    setPacket("");
    setStatus("idle");
    setMessage("");
  }

  return (
    <section className="suggest-intake" aria-labelledby="suggest-form-title">
      <div className="suggest-intake__heading">
        <div>
          <p className="section-label">Structured research lead</p>
          <h2 id="suggest-form-title">Give reviewers a record they can inspect.</h2>
        </div>
        <p>
          Nothing below is required. Share whatever you know—the more information you provide, the better we will be able to research the incident. {deliveryMode === "endpoint" && "This build is configured to deliver suggestions to a project review endpoint."}
          {deliveryMode === "email" && "This build opens a draft addressed to the project review inbox. You remain in control of sending it."}
          {deliveryMode === "local" && "Direct delivery is not configured on this build. The form prepares a standardized packet locally for copy or download; it does not upload your entry."}
        </p>
      </div>

      <form className="suggest-form" ref={formRef} onSubmit={handleSubmit}>
        <label className="suggest-field suggest-field--wide">
          <span>Working title</span>
          <input name="title" maxLength={160} placeholder="A precise, neutral description of the incident" />
        </label>

        <label className="suggest-field">
          <span>Incident date</span>
          <input name="incidentDate" type="date" />
        </label>

        <label className="suggest-field">
          <span>Date precision</span>
          <select name="datePrecision" defaultValue="">
            <option value="">Not sure</option>
            <option>Exact date</option>
            <option>Approximate date</option>
            <option>Start of an ongoing incident</option>
          </select>
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>People or institutions involved</span>
          <input name="people" maxLength={240} placeholder="Names, agencies, companies, organizations, or offices" />
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>What happened?</span>
          <textarea name="summary" maxLength={1800} rows={6} placeholder="Describe the conduct without assuming motive. Separate what the record establishes from what remains alleged or disputed." />
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>Strongest public source URL</span>
          <input name="primarySource" type="url" inputMode="url" placeholder="https://… court record, agency document, transcript, video, or rigorous reporting" />
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>Additional public source URL</span>
          <input name="supportingSource" type="url" inputMode="url" placeholder="https://… an independent or contrary source is especially useful" />
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>Why might this fit the archive?</span>
          <textarea name="relevance" maxLength={1200} rows={4} placeholder="Explain the possible ethical, constitutional, legal, public-trust, national-interest, dealmaking, faith, or world-standing relevance." />
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>Denial, correction, defense, or contrary context</span>
          <textarea name="contraryContext" maxLength={1200} rows={4} placeholder="What would a fair reviewer need to know before drawing a conclusion?" />
        </label>

        <label className="suggest-field suggest-field--wide">
          <span>Optional follow-up email</span>
          <input name="contact" type="email" autoComplete="email" placeholder="Use a project-safe address; leave blank to remain unidentified in the packet" />
          <small>This is included only in the prepared submission. Do not use an address that would expose you if the packet is forwarded.</small>
        </label>

        <div className="suggest-submit suggest-field--wide">
          <button className="button button--primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : deliveryMode === "endpoint" ? "Submit for review" : deliveryMode === "email" ? "Prepare email" : "Prepare review packet"}
          </button>
          <span>A suggestion is an unverified lead. It is never published automatically.</span>
        </div>
      </form>

      {message ? (
        <div className={`suggest-result suggest-result--${status}`} role="status" aria-live="polite">
          <strong>{status === "sent" ? "Delivered" : status === "error" ? "Delivery not confirmed" : "Packet ready"}</strong>
          <p>{message}</p>
          {packet && status !== "sent" ? (
            <>
              <textarea readOnly value={packet} aria-label="Prepared incident suggestion packet" rows={13} />
              <div>
                <button type="button" onClick={copyPacket}>Copy packet</button>
                <button type="button" onClick={downloadPacket}>Download .txt</button>
                {canShare ? <button type="button" onClick={sharePacket}>Share packet</button> : null}
                <button type="button" onClick={resetForm}>Start over</button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
