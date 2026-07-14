import Link from "next/link";
import type { CaseFile } from "@/data/cases";
import { scoreCaseAgainstRubric, type TestId } from "@/data/test-rubrics";
import { ShareEBox } from "./share-ebox";
import { TestScoreBadge } from "./test-score-badge";

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
  const score = scoreCaseAgainstRubric(item, testId, "Fails");
  return (
    <article className="patriotic-record test-record" id={anchor}>
      <TestScoreBadge score={score} id={`${anchor}-score`} />
      <p className="patriotic-record__date">{item.date}</p>
      <h3>{item.title}</h3>
      <div className="patriotic-record__status"><strong>Record status</strong><span>{item.status}</span></div>
      <p>{item.summary}</p>
      <p className="patriotic-record__significance"><strong>Why it matters</strong>{item.significance}</p>
      <ShareEBox anchor={anchor} title={item.title} summary={item.summary} status={item.status} context={label} />
      <div className="patriotic-record__links">
        {item.sources.slice(0, 3).map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.publisher}: {source.label} <ArrowIcon /></a>
        ))}
        <Link href={`/#${item.id}`}>Open full Evidence case file <ArrowIcon /></Link>
      </div>
    </article>
  );
}
