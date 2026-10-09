"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ArchiveEntry, ArchiveType } from "@/data/archive";

type ArchiveFilter = "all" | ArchiveType;

const filters: Array<{ value: ArchiveFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "evidence", label: "Evidence" },
  { value: "rooftops", label: "Rooftops" },
  { value: "blind-eyes", label: "Blind Eyes" },
  { value: "anti-christ", label: "Anti Christ" },
];

export function ArchiveIndex({ entries }: { entries: ArchiveEntry[] }) {
  const [filter, setFilter] = useState<ArchiveFilter>("all");
  const [query, setQuery] = useState("");
  const counts = useMemo(() => Object.fromEntries(filters.map(({ value }) => [
    value,
    value === "all" ? entries.length : entries.filter((entry) => entry.type === value).length,
  ])), [entries]);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesType = filter === "all" || entry.type === filter;
      const matchesQuery = !needle || `${entry.title} ${entry.summary} ${entry.typeLabel} ${entry.dateDisplay}`.toLowerCase().includes(needle);
      return matchesType && matchesQuery;
    });
  }, [entries, filter, query]);

  return (
    <>
      <section className="archive-index-controls" aria-label="Archive filters">
        <label>
          <span>Search the archive</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Person, event, institution, issue…" />
        </label>
        <div className="archive-index-filters" role="group" aria-label="Filter archive by record type">
          {filters.map(({ value, label }) => (
            <button type="button" className={filter === value ? "is-active" : undefined} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>
              {label} <span>{counts[value]}</span>
            </button>
          ))}
        </div>
        <p aria-live="polite"><strong>{visible.length}</strong> {visible.length === 1 ? "entry" : "entries"}</p>
      </section>

      <section className="archive-index-list" aria-label="Chronological archive entries">
        {visible.length ? visible.map((entry, index) => (
          <article className={`archive-row archive-row--${entry.type}`} data-sort-date={entry.sortDate ?? ""} key={entry.id}>
            <div className="archive-row__date">
              <span>{entry.dateContext}</span>
              <strong>{entry.dateDisplay}</strong>
            </div>
            <div className="archive-row__record">
              <p>{entry.typeLabel}</p>
              <h2><Link href={entry.href}>{entry.title}</Link></h2>
              <span>{entry.summary}</span>
            </div>
            <div className="archive-row__action">
              <span>{String(index + 1).padStart(3, "0")}</span>
              <Link href={entry.href} aria-label={`Open full record: ${entry.title}`}>Open full record <b aria-hidden="true">↗</b></Link>
            </div>
          </article>
        )) : (
          <div className="archive-index-empty">
            <h2>No matching entries.</h2>
            <p>Try a broader term or select another record type.</p>
          </div>
        )}
      </section>
    </>
  );
}
