"use client";

import { useState } from "react";

const canonicalUrl = "https://dtrezise.github.io/TDS/voices/";
const shareTitle = "Shout It from the Rooftops — Christian voices resisting Christian nationalism";
const shareText = "Christian nationalism is not the only Christian voice in public life. Follow the people naming it, resisting it, and building faithful alternatives.";

const encodedUrl = encodeURIComponent(canonicalUrl);
const encodedText = encodeURIComponent(`${shareText}\n\n${canonicalUrl}`);

export function ShareTools() {
  const [status, setStatus] = useState("");

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setStatus("Link copied.");
    } catch {
      setStatus("Copy failed. Select the page address from your browser.");
    }
  }

  async function sharePage() {
    if (!navigator.share) {
      await copyPage();
      return;
    }

    try {
      await navigator.share({ title: shareTitle, text: shareText, url: canonicalUrl });
      setStatus("Share sheet opened.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Sharing was unavailable. Try copying the link instead.");
    }
  }

  return (
    <div className="share-tools" aria-label="Share this directory">
      <button className="share-tools__primary" type="button" onClick={sharePage}>Share this page</button>
      <button type="button" onClick={copyPage}>Copy link</button>
      <a href={`https://bsky.app/intent/compose?text=${encodedText}`} target="_blank" rel="noreferrer">Bluesky ↗</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer">Facebook ↗</a>
      <a href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodedText}`}>Email ↗</a>
      <span className="share-tools__status" aria-live="polite">{status}</span>
    </div>
  );
}
