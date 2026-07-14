"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Destination = "x" | "bluesky" | "facebook" | "linkedin" | "email";

type ShareEBoxProps = {
  anchor: string;
  title: string;
  summary: string;
  status?: string;
  context?: string;
};

const destinations: Array<{ id: Destination; label: string }> = [
  { id: "x", label: "X" },
  { id: "bluesky", label: "Bluesky" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "email", label: "Email" },
];

function DestinationIcon({ destination }: { destination: Destination }) {
  if (destination === "x") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.22-6.82-5.97 6.82H1.67l7.73-8.84L1.24 2.25H8.1l4.72 6.24 5.42-6.24Zm-1.16 17.52h1.83L7.1 4.13H5.13l11.95 15.64Z" /></svg>;
  }
  if (destination === "bluesky") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 10.8c-1.09-2.11-4.05-6.05-6.8-8C2.57.94 1.56 1.27.9 1.57.14 1.91 0 3.08 0 3.77c0 .69.38 5.65.62 6.48.82 2.74 3.71 3.66 6.38 3.36-4.82.71-9.11 2.48-3.49 8.75 6.19 6.4 8.49-1.37 8.49-1.37s2.29 7.77 8.48 1.37c5.63-6.27 1.34-8.04-3.48-8.75 2.67.3 5.57-.62 6.38-3.36.25-.83.62-5.79.62-6.48 0-.69-.14-1.86-.9-2.2-.66-.3-1.67-.63-4.3 1.24-2.75 1.94-5.71 5.88-6.8 7.99Z" /></svg>;
  }
  if (destination === "facebook") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" /></svg>;
  }
  if (destination === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.38 4.27 5.47v6.28ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 9L2.8 6h18.4L12 13Zm-4.15-.65L2 7.9v9.55l5.85-5.1Zm8.3 0L22 17.45V7.9l-5.85 4.45ZM9.5 13.6 2.8 19h18.4l-6.7-5.4-2.5 1.9-2.5-1.9Z" /></svg>;
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function clipped(value: string, max: number) {
  const normalized = cleanText(value);
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function shareLogoPath() {
  const githubPagesBase = window.location.pathname === "/TDS" || window.location.pathname.startsWith("/TDS/")
    ? "/TDS"
    : "";
  return `${githubPagesBase}/tds-share-logo.png`;
}

function composePost(
  destination: Destination,
  { title, summary, status, context, url }: { title: string; summary: string; status?: string; context?: string; url: string },
) {
  const heading = status ? `${title} — ${status}` : title;
  const attribution = context ? `TDS · ${context}` : "TDS · The Evidence Archive";

  if (destination === "x") {
    return `${clipped(heading, 104)}\n\n${clipped(summary, 102)}\n\nExamine the eBox: ${url}`;
  }

  if (destination === "bluesky") {
    return `${clipped(heading, 116)}\n\n${clipped(summary, 118)}\n\nEvidence and sources: ${url}`;
  }

  if (destination === "email") {
    return `${heading}\n\n${summary}\n\nStatus / context: ${status ?? "See the record"}\nSource: ${attribution}\n\nOpen the exact evidence box, review its sources, and follow the record:\n${url}`;
  }

  return `${heading}\n\n${summary}\n\n${attribution}\n\nReview the evidence, source status, limiting context, and linked record:\n${url}`;
}

export function ShareEBox({ anchor, title, summary, status, context }: ShareEBoxProps) {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState<Destination>("bluesky");
  const [url, setUrl] = useState("");
  const [postText, setPostText] = useState("");
  const [message, setMessage] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  const postData = useMemo(() => ({ title, summary: cleanText(summary), status, context, url }), [title, summary, status, context, url]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openComposer() {
    const currentPage = window.location.href.split("#")[0];
    const roundTripUrl = `${currentPage}#${encodeURIComponent(anchor)}`;
    setUrl(roundTripUrl);
    setDestination("bluesky");
    setPostText(composePost("bluesky", { title, summary, status, context, url: roundTripUrl }));
    setMessage("");
    setOpen(true);
  }

  function selectDestination(next: Destination) {
    setDestination(next);
    setPostText(composePost(next, postData));
    setMessage("");
  }

  async function copy(value: string, success: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(success);
      return true;
    } catch {
      setMessage("Copy was unavailable. Select the text manually.");
      return false;
    }
  }

  async function openDestination() {
    const encodedText = encodeURIComponent(postText);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    let destinationUrl = "";

    if (destination === "x") destinationUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    if (destination === "bluesky") destinationUrl = `https://bsky.app/intent/compose?text=${encodedText}`;
    if (destination === "facebook") destinationUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    if (destination === "linkedin") destinationUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    if (destination === "email") destinationUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}`;

    if (destination === "facebook" || destination === "linkedin") {
      window.open(destinationUrl, "_blank", "noopener,noreferrer");
      await copy(postText, "Post text copied. Paste it into the share window.");
      return;
    }

    if (destination === "email") {
      window.location.href = destinationUrl;
      return;
    }

    window.open(destinationUrl, "_blank", "noopener,noreferrer");
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copy(postText, "Post copied.");
      return;
    }
    try {
      await navigator.share({ title, text: postText, url });
      setMessage("Share sheet opened.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("The share sheet was unavailable. Copy the post instead.");
    }
  }

  return (
    <>
      <button className="ebox-share-trigger" type="button" onClick={openComposer} aria-label={`Share evidence: ${title}`}>
        <span aria-hidden="true">↗</span> Share evidence
      </button>

      {open ? (
        <div className="ebox-share-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <section className="ebox-share-dialog" role="dialog" aria-modal="true" aria-labelledby={`share-title-${anchor}`}>
            <div className="ebox-share-dialog__topline">
              <div>
                <p className="eyebrow">Build a shareable evidence post</p>
                <h2 id={`share-title-${anchor}`}>Share the record, not just the reaction.</h2>
              </div>
              <button ref={closeRef} className="ebox-share-dialog__close" type="button" onClick={() => setOpen(false)} aria-label="Close share composer">×</button>
            </div>

            <div className="ebox-share-preview" aria-label="Outgoing post preview">
              <Image
                src={shareLogoPath()}
                alt="TDS — Trump Derangement Syndrome. The Evidence Archive."
                width={1500}
                height={500}
                priority={false}
                unoptimized
              />
              <div className="ebox-share-preview__body">
                <p className="eyebrow">{context ?? "Evidence Archive"}</p>
                <h3>{title}</h3>
                {status ? <p className="ebox-share-preview__status">{status}</p> : null}
                <p>{cleanText(summary)}</p>
                <span>{url}</span>
              </div>
            </div>

            <div className="ebox-share-destinations" aria-label="Choose a social destination">
              {destinations.map((item) => (
                <button
                  type="button"
                  className={destination === item.id ? "is-selected" : undefined}
                  aria-pressed={destination === item.id}
                  aria-label={`Format for ${item.label}`}
                  title={item.label}
                  onClick={() => selectDestination(item.id)}
                  key={item.id}
                >
                  <DestinationIcon destination={item.id} />
                  <span className="visually-hidden">{item.label}</span>
                </button>
              ))}
            </div>

            <label className="ebox-share-copy" htmlFor={`share-copy-${anchor}`}>
              <span>Post copy</span>
              <textarea id={`share-copy-${anchor}`} value={postText} onChange={(event) => setPostText(event.target.value)} rows={7} />
            </label>

            <div className="ebox-share-actions">
              <button className="button button--primary" type="button" onClick={openDestination}>Continue to {destinations.find((item) => item.id === destination)?.label}</button>
              <button type="button" onClick={() => copy(postText, "Post copied.")}>Copy post</button>
              <button type="button" onClick={() => copy(url, "Exact eBox link copied.")}>Copy eBox link</button>
              <button type="button" onClick={nativeShare}>More…</button>
            </div>

            <p className="ebox-share-note">
              Social platforms control the final layout. Where link previews are supported, the branded archive banner and the exact round-trip eBox link are supplied.
            </p>
            <p className="ebox-share-message" aria-live="polite">{message}</p>
          </section>
        </div>
      ) : null}
    </>
  );
}
