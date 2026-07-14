"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const shareBanner = process.env.GITHUB_ACTIONS === "true" && repositoryName
  ? `/${repositoryName}/share-banner.png`
  : "/share-banner.png";

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

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function clipped(value: string, max: number) {
  const normalized = cleanText(value);
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
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
      <button className="ebox-share-trigger" type="button" onClick={openComposer} aria-label={`Share eBox: ${title}`}>
        <span aria-hidden="true">↗</span> Share eBox
      </button>

      {open ? (
        <div className="ebox-share-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <section className="ebox-share-dialog" role="dialog" aria-modal="true" aria-labelledby={`share-title-${anchor}`}>
            <div className="ebox-share-dialog__topline">
              <div>
                <p className="eyebrow">Build a shareable eBox</p>
                <h2 id={`share-title-${anchor}`}>Share the record, not just the reaction.</h2>
              </div>
              <button ref={closeRef} className="ebox-share-dialog__close" type="button" onClick={() => setOpen(false)} aria-label="Close share composer">×</button>
            </div>

            <div className="ebox-share-preview" aria-label="Outgoing post preview">
              <Image
                src={shareBanner}
                alt="TDS — Trump Derangement Syndrome. The Evidence Archive."
                width={1731}
                height={909}
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
                  onClick={() => selectDestination(item.id)}
                  key={item.id}
                >
                  {item.label}
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
