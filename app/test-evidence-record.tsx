import Link from "next/link";
import type { CaseFile } from "@/data/cases";
import { ShareEBox } from "./share-ebox";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function TestEvidenceRecord({ item, prefix }: { item: CaseFile; prefix: string }) {
  const anchor = `${prefix}-${item.id}`;
  return (
    <article className="patriotic-record test-record" id={anchor}>
      <p className="patriotic-record__date">{item.date}</p>
      <h3>{item.title}</h3>
      <div className="patriotic-record__status"><strong>Record status</strong><span>{item.status}</span></div>
      <p>{item.summary}</p>
      <p className="patriotic-record__significance"><strong>Why it matters</strong>{item.significance}</p>
      <ShareEBox anchor={anchor} title={item.title} summary={item.summary} status={item.status} context={`${prefix.replaceAll("-", " ")} test`} />
      <div className="patriotic-record__links">
        {item.sources.slice(0, 3).map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.publisher}: {source.label} <ArrowIcon /></a>
        ))}
        <Link href={`/#${item.id}`}>Open full Evidence case file <ArrowIcon /></Link>
      </div>
    </article>
  );
}
