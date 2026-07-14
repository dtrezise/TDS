import { criterionPointScale, scoreBands, testRubrics, type TestId } from "@/data/test-rubrics";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function TestScorecard({ testId, intro }: { testId: TestId; intro: string }) {
  const rubric = testRubrics[testId];
  return (
    <section className="patriotic-standards test-scorecard" id={rubric.anchor} aria-labelledby={`${rubric.anchor}-title`}>
      <div className="patriotic-standards__heading">
        <p className="section-label">{rubric.kicker}</p>
        <h2 id={`${rubric.anchor}-title`}>{rubric.label} scorecard.</h2>
        <p>{intro} {rubric.description}</p>
      </div>

      <div className="scorecard-formula" aria-label="Rubric scoring method">
        <div><strong>0–4</strong><span>Score each applicable criterion</span></div>
        <div><strong>÷</strong><span>Exclude criteria the evidence does not implicate</span></div>
        <div><strong>100</strong><span>Normalize earned points to a 100-point alignment score</span></div>
        <p><strong>Direction:</strong> 100 means strong alignment with the test; 0 means direct conflict. Scores are transparent editorial analysis, not legal findings, and change when the underlying record changes.</p>
      </div>

      <div className="criterion-point-scale" aria-label="Criterion point rubric">
        {criterionPointScale.map((level) => (
          <article key={level.points}>
            <strong>{level.points}</strong>
            <span>{level.label}</span>
            <p>{level.description}</p>
          </article>
        ))}
      </div>

      <div className="scorecard-scale" aria-label="Score interpretation">
        {scoreBands.map((band) => (
          <article key={band.range}>
            <strong>{band.range}</strong>
            <span>{band.label}</span>
            <p>{band.description}</p>
          </article>
        ))}
      </div>

      <div className="patriotic-standards__grid scorecard-criteria">
        {rubric.criteria.map((criterion, index) => (
          <article id={`${rubric.anchor}-${criterion.id}`} key={criterion.id}>
            <span>{String(index + 1).padStart(2, "0")} · 0–4 points</span>
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
