import type { CaseFile } from "./cases";
import { scoreCaseAgainstRubric, type TestScore } from "./test-rubrics";

export type CaseTestLens = {
  id: "patriotic" | "america-first" | "deal" | "world-standing";
  label: string;
  href: string;
  finding: "Fails" | "Implicates" | "Not directly implicated";
  analysis: string;
  score: TestScore;
};

type UnscoredCaseTestLens = Omit<CaseTestLens, "score">;

function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return (match?.[0] ?? text).trim();
}

function lens(
  id: CaseTestLens["id"],
  label: string,
  href: string,
  finding: CaseTestLens["finding"],
  analysis: string,
): UnscoredCaseTestLens {
  return { id, label, href, finding, analysis };
}

/**
 * Applies each archive test without manufacturing a contradiction. A case can
 * fail, implicate, or simply not establish a given test. The distinction keeps
 * the editorial conclusion no broader than the cited record.
 */
export function buildCaseTestLenses(item: CaseFile): CaseTestLens[] {
  const text = [item.title, item.summary, item.significance, item.status, ...item.tags]
    .join(" ")
    .toLowerCase();
  const recordPoint = firstSentence(item.summary);
  const isLaw = item.category === "Law & accountability";
  const isDemocracy = item.category === "Democracy & power";
  const isWorld = item.category === "America & the world";
  const isDeal = item.category === "Deals & economic power";
  const isMovement = item.category === "MAGA & movement";
  const isTruth = item.category === "Truth & public conduct";
  const isFamily = item.category === "Family & business";

  const officeOrConstitution = /presiden|white house|administration|congress|election|constitution|impeach|pardon|clemency|inspector general|government|public power|official|war power|due process|citizenship|immigration/.test(text);
  const foreignOrAlliance = /foreign|world|allia|nato|ukraine|russia|china|iran|qatar|venezuela|greenland|canada|panama|afghan|north korea|climate|who|usaid|united nations|diploma|tariff|trade|emolument/.test(text);
  const bargainOrOutcome = /deal|agreement|settlement|bankrupt|business|fraud|tariff|trade|purchase|subsid|jobs|summit|contract|aircraft|jet|payment|economic|cost|price|leverage|concession|retrofit/.test(text);

  let patriotic: UnscoredCaseTestLens;
  if (isLaw || isDemocracy || (officeOrConstitution && (isWorld || isMovement))) {
    patriotic = lens(
      "patriotic",
      "Patriotic Test",
      "/patriotic-test",
      "Fails",
      `The record conflicts with rule-of-law government, constitutional restraint, equal citizenship, or public accountability. ${recordPoint}`,
    );
  } else if (isTruth || (isFamily && officeOrConstitution) || isMovement) {
    patriotic = lens(
      "patriotic",
      "Patriotic Test",
      "/patriotic-test",
      "Implicates",
      `Constitutional self-government depends on public truth, equal dignity, and loyalty to law above a leader. ${recordPoint}`,
    );
  } else {
    patriotic = lens(
      "patriotic",
      "Patriotic Test",
      "/patriotic-test",
      "Not directly implicated",
      "This record documents serious conduct, but it does not by itself establish a constitutional, civil-liberties, or public-authority failure.",
    );
  }

  let americaFirst: UnscoredCaseTestLens;
  if (isWorld) {
    americaFirst = lens(
      "america-first",
      "America First Test",
      "/america-first-test",
      "Fails",
      `The claimed national benefit must be measured against costs to Americans, lawful institutions, security, and durable leverage. ${recordPoint}`,
    );
  } else if ((isDeal && /tariff|trade|china|carrier|foxconn|afghan|iran|qatar|north korea|economic|jobs|cost|subsid/.test(text)) || foreignOrAlliance) {
    americaFirst = lens(
      "america-first",
      "America First Test",
      "/america-first-test",
      "Implicates",
      `This outcome bears on whether national-interest branding delivered a measurable and durable benefit to Americans. ${recordPoint}`,
    );
  } else {
    americaFirst = lens(
      "america-first",
      "America First Test",
      "/america-first-test",
      "Not directly implicated",
      "The cited record does not directly measure a foreign-policy, national-security, trade, or broad public-benefit outcome.",
    );
  }

  let deal: UnscoredCaseTestLens;
  if (isDeal) {
    deal = lens(
      "deal",
      "Deal Test",
      "/deal-test",
      "Fails",
      `The promised result, concessions, delivery, durability, public cost, and beneficiary do not support the advertised deal-making claim. ${recordPoint}`,
    );
  } else if (bargainOrOutcome) {
    deal = lens(
      "deal",
      "Deal Test",
      "/deal-test",
      "Implicates",
      `This record bears on the gap between branding and measurable terms, delivery, cost, or beneficiary. ${recordPoint}`,
    );
  } else {
    deal = lens(
      "deal",
      "Deal Test",
      "/deal-test",
      "Not directly implicated",
      "This evidence does not itself document a bargain, transaction, negotiated commitment, or measurable delivery claim.",
    );
  }

  let worldStanding: UnscoredCaseTestLens;
  if (isWorld) {
    worldStanding = lens(
      "world-standing",
      "World Standing Test",
      "/world-standing-test",
      "Fails",
      `The record shows a cost to U.S. credibility, alliance leverage, lawful example, expertise, or the ability to shape international outcomes. ${recordPoint}`,
    );
  } else if (foreignOrAlliance || (officeOrConstitution && (isLaw || isDemocracy))) {
    worldStanding = lens(
      "world-standing",
      "World Standing Test",
      "/world-standing-test",
      "Implicates",
      `America's influence also rests on credible commitments and the democratic example it presents abroad. ${recordPoint}`,
    );
  } else {
    worldStanding = lens(
      "world-standing",
      "World Standing Test",
      "/world-standing-test",
      "Not directly implicated",
      "The cited record does not directly establish a consequence for alliances, diplomacy, international credibility, or U.S. global influence.",
    );
  }

  return [patriotic, americaFirst, deal, worldStanding].map((entry) => ({
    ...entry,
    score: scoreCaseAgainstRubric(item, entry.id, entry.finding),
  }));
}
