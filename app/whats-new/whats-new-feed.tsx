"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { WhatsNewEntry, WhatsNewSection } from "@/data/whats-new";
import { ShareEBox } from "../share-ebox";

type Filter = "all" | WhatsNewSection;

function localIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function subscribeToCalendar(callback: () => void) {
  const interval = window.setInterval(callback, 60_000);
  document.addEventListener("visibilitychange", callback);
  return () => {
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", callback);
  };
}

function utcDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function insideWindow(item: WhatsNewEntry, asOf: string, windowDays: number) {
  const age = Math.floor((utcDay(asOf) - utcDay(item.publishedOn)) / 86_400_000);
  return age >= 0 && age < windowDays;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00Z`));
}

export function WhatsNewFeed({ entries, initialAsOf, windowDays }: { entries: WhatsNewEntry[]; initialAsOf: string; windowDays: number }) {
  const asOf = useSyncExternalStore(subscribeToCalendar, localIsoDate, () => initialAsOf);
  const [filter, setFilter] = useState<Filter>("all");

  const active = useMemo(
    () => entries.filter((item) => insideWindow(item, asOf, windowDays)),
    [asOf, entries, windowDays],
  );
  const visible = filter === "all" ? active : active.filter((item) => item.section === filter);
  const evidenceCount = active.filter((item) => item.section === "evidence").length;
  const voicesCount = active.filter((item) => item.section === "voices").length;

  return (
    <>
      <section className="new-controls" aria-label="What’s New filters">
        <div className="new-controls__summary" aria-live="polite">
          <strong>{active.length}</strong>
          <span>items in the current {windowDays}-day window</span>
        </div>
        <div className="new-filter" role="group" aria-label="Filter recent additions">
          {([
            ["all", `All ${active.length}`],
            ["evidence", `Evidence ${evidenceCount}`],
            ["voices", `Voices ${voicesCount}`],
          ] as const).map(([value, label]) => (
            <button type="button" className={filter === value ? "is-active" : undefined} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="new-feed" id="recent" aria-labelledby="new-feed-title">
        <div className="new-feed__heading">
          <div>
            <p className="section-label">Published and still inside the window</p>
            <h2 id="new-feed-title">The latest additions.</h2>
          </div>
          <p>Showing the rolling window as of <strong>{formatDate(asOf)}</strong>. The browser clock removes expired entries automatically.</p>
        </div>

        {visible.length ? (
          <div className="new-grid">
            {visible.map((item, index) => {
              const anchor = `new-${item.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
              return (
                <article className={`new-card new-card--${item.section}`} id={anchor} key={item.id}>
                  <div className="new-card__topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.change === "added" ? "New record" : "Material update"}</span>
                  </div>
                  <p className="eyebrow">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p className="new-card__summary">{item.summary}</p>
                  <div className="new-card__status"><strong>Current record status</strong><span>{item.status}</span></div>
                  <div className="new-card__dates">
                    <span>Published here <strong>{formatDate(item.publishedOn)}</strong></span>
                    <span>Leaves this page <strong>{formatDate(item.expiresOn)}</strong></span>
                  </div>
                  <Link className="new-card__link" href={item.href}>Open the permanent record <span aria-hidden="true">↗</span></Link>
                  <ShareEBox
                    anchor={anchor}
                    title={item.title}
                    summary={item.summary}
                    status={item.status}
                    context={`What's New · ${item.label}`}
                  />
                </article>
              );
            })}
          </div>
        ) : (
          <div className="new-empty">
            <p className="section-label">Nothing currently inside the window</p>
            <h3>No recent additions are being promoted here today.</h3>
            <p>Nothing was deleted. Every published case remains searchable in Evidence, and every public-witness profile remains available under Voices.</p>
            <div><Link href="/">Browse Evidence</Link><Link href="/voices/">Browse Voices</Link></div>
          </div>
        )}
      </section>
    </>
  );
}
