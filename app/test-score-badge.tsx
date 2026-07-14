import Link from "next/link";
import type { TestScore } from "@/data/test-rubrics";

export function TestScoreBadge({ score, id }: { score: TestScore; id: string }) {
  const applicable = score.breakdown.filter((criterion) => criterion.points !== null);
  const display = score.score === null ? "N/A" : String(score.score);
  const label = score.score === null
    ? `${score.label}: not scored because this record does not directly implicate the rubric`
    : `${score.label}: ${score.score} out of 100, ${score.verdict}. Open the full rubric.`;

  return (
    <span className={`test-score-badge test-score-badge--${score.testId}`}>
      <Link className="test-score-badge__link" href={score.href} aria-label={label} aria-describedby={`${id}-breakdown`}>
        <strong>{display}</strong>{score.score === null ? null : <small>/100</small>}
      </Link>
      <span className="test-score-popover" id={`${id}-breakdown`}>
        <span className="test-score-popover__topline"><strong>{score.label}</strong><em>{score.verdict}</em></span>
        {score.score === null ? (
          <span className="test-score-popover__empty">The cited record does not directly implicate this test, so no neutral or invented points were added.</span>
        ) : (
          <>
            <span className="test-score-popover__formula">{score.earnedPoints} of {score.possiblePoints} applicable points · normalized to {score.score}/100</span>
            <span className="test-score-popover__criteria">
              {applicable.map((criterion) => (
                <span key={criterion.id}>
                  <strong>{criterion.label}</strong>
                  <b>{criterion.points}/4</b>
                  <small>{criterion.rationale}</small>
                </span>
              ))}
            </span>
          </>
        )}
        <span className="test-score-popover__action">Open the complete rubric <span aria-hidden="true">↗</span></span>
      </span>
    </span>
  );
}
