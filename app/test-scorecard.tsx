import { testRubrics, type TestId } from "@/data/test-rubrics";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function TestScorecard({ testId, intro }: { testId: TestId; intro: string }) {
  const rubric = testRubrics[testId];
  return (
    <section className="patriotic-standards test-scorecard" id={rubric.anchor} aria-labelledby={`${rubric.anchor}-title`}>
      <div className="patriotic-standards__heading">
        <p className="section-label">{rubric.kicker}</p>
        <h2 id={`${rubric.anchor}-title`}>{rubric.label} review framework.</h2>
        <p>{intro} {rubric.description}</p>
      </div>

      <div className="scorecard-formula" aria-label="Qualitative review method">
        <div><strong>01</strong><span>Identify the exact criterion implicated by the record</span></div>
        <div><strong>02</strong><span>Cite the fact, status, contrary evidence, and limitation</span></div>
        <div><strong>03</strong><span>Publish a written judgment only after human review</span></div>
        <p><strong>No automated score:</strong> TDS does not convert keyword frequency into a numerical judgment. A conclusion must be explained criterion by criterion and remain open to correction.</p>
      </div>

      <div className="patriotic-standards__grid scorecard-criteria">
        {rubric.criteria.map((criterion, index) => (
          <article id={`${rubric.anchor}-${criterion.id}`} key={criterion.id}>
            <span>{String(index + 1).padStart(2, "0")} · evidence-specific review</span>
            <h3>{criterion.label}</h3>
            {criterion.href ? <a href={criterion.href} target="_blank" rel="noreferrer">{criterion.foundation} <ArrowIcon /></a> : <strong className="scorecard-criterion__foundation">{criterion.foundation}</strong>}
            <p><strong>{criterion.question}</strong></p>
            <p>{criterion.guidance}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
