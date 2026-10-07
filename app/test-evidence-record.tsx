import Link from "next/link";
import type { CaseFile } from "@/data/cases";
import type { TestId } from "@/data/test-rubrics";
import { ShareEBox } from "./share-ebox";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

const recordContext: Record<Exclude<TestId, "christianity">, { prefix: string; label: string }> = {
  patriotic: { prefix: "patriotic", label: "Patriotic Test" },
  "america-first": { prefix: "america", label: "America First Test" },
  deal: { prefix: "deal", label: "Deal Test" },
  "world-standing": { prefix: "world", label: "World Standing Test" },
};

export function TestEvidenceRecord({ item, testId }: { item: CaseFile; testId: Exclude<TestId, "christianity"> }) {
  const { prefix, label } = recordContext[testId];
  const anchor = `${prefix}-${item.id}`;
  return (
    <article className="patriotic-record test-record" id={anchor}>
      <span className="record-review-label">Qualitative editorial review</span>
      <p className="patriotic-record__date">{item.date}</p>
      <h3>{item.title}</h3>
      <div className="patriotic-record__status"><strong>Record status</strong><span>{item.status}</span></div>
      <p>{item.summary}</p>
      <p className="patriotic-record__significance"><strong>Why it matters</strong>{item.significance}</p>
      <ShareEBox anchor={anchor} permalink={`/evidence/${item.id}/`} title={item.title} summary={item.summary} status={item.status} context={label} />
      <div className="patriotic-record__links">
        {item.sources.slice(0, 3).map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.publisher}: {source.label} <ArrowIcon /></a>
        ))}
        <Link href={`/evidence/${item.id}/`}>Open permanent Evidence case file <ArrowIcon /></Link>
      </div>
    </article>
  );
}
