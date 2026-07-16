import type { CaseFile } from "./cases";

export type TestId = "christianity" | "patriotic" | "america-first" | "deal" | "world-standing";
export type TestFinding = "Fails" | "Implicates" | "Not directly implicated" | "Passes";

export type RubricCriterion = {
  id: string;
  label: string;
  foundation: string;
  question: string;
  guidance: string;
  href?: string;
  keywords: readonly RegExp[];
};

export type TestRubric = {
  id: TestId;
  label: string;
  href: string;
  anchor: string;
  kicker: string;
  description: string;
  criteria: readonly RubricCriterion[];
};

export type CriterionScore = {
  id: string;
  label: string;
  points: number | null;
  maxPoints: 4;
  rationale: string;
};

export type TestScore = {
  testId: TestId;
  label: string;
  href: string;
  score: number | null;
  earnedPoints: number;
  possiblePoints: number;
  verdict: string;
  finding: TestFinding;
  breakdown: CriterionScore[];
};

export const scoreBands = [
  { range: "0–24", label: "Severe conflict", description: "The documented conduct directly contradicts one or more applicable criteria." },
  { range: "25–49", label: "Fails", description: "The record substantially conflicts with the applicable standard." },
  { range: "50–64", label: "Mixed / contested", description: "The record is divided, indirect, materially limited, or still unresolved." },
  { range: "65–79", label: "Substantial alignment", description: "The conduct largely satisfies the applicable criteria, with meaningful reservations." },
  { range: "80–100", label: "Passes", description: "The evidence strongly supports alignment with the applicable standard." },
] as const;

export const criterionPointScale = [
  { points: 0, label: "Direct conflict", description: "The record establishes a serious, direct contradiction of the criterion." },
  { points: 1, label: "Substantial conflict", description: "The documented conduct materially conflicts with the criterion." },
  { points: 2, label: "Mixed or limited", description: "The record is indirect, divided, unresolved, or materially limited." },
  { points: 3, label: "Mostly aligns", description: "The conduct substantially aligns, but meaningful reservations remain." },
  { points: 4, label: "Strongly aligns", description: "The available evidence strongly supports alignment with the criterion." },
] as const;

const christianityCriteria: readonly RubricCriterion[] = [
  { id: "truth", label: "Truthful witness", foundation: "Exodus 20:16 · Matthew 5:37", question: "Does the conduct tell the truth plainly and correct falsehood rather than manipulate belief?", guidance: "Score lies, concealment, falsified records, and corrected claims against dependable public truth.", href: "https://bible.usccb.org/bible/matthew/5", keywords: [/\blie|false|mislead|conceal|falsif|birther|truth|deceiv|election claim|disinfectant/i] },
  { id: "stewardship", label: "Honest stewardship", foundation: "Exodus 20:15 · Luke 16:10–13", question: "Does the conduct handle money, charity, property, and public resources honestly?", guidance: "Use the exact civil, criminal, fiduciary, or ethical status; do not relabel every misuse as theft.", href: "https://bible.usccb.org/bible/luke/16", keywords: [/fraud|charit|foundation|tax|business|payment|money|wealth|emolument|foreign government|resource|enrich/i] },
  { id: "fidelity", label: "Fidelity and dignity", foundation: "Exodus 20:14 · Matthew 5:27–28", question: "Does the conduct honor fidelity, consent, and the dignity of other people?", guidance: "Score authenticated speech and adjudicated conduct while keeping disputed allegations explicitly disputed.", href: "https://bible.usccb.org/bible/matthew/5", keywords: [/sexual|adulter|affair|hush|access hollywood|carroll|assault|abuse|entitlement/i] },
  { id: "mercy", label: "Mercy and forgiveness", foundation: "Matthew 5:7 · 6:14–15", question: "Does the response to wrongdoing preserve mercy and forgiveness rather than cultivate vengeance?", guidance: "Distinguish accountability from humiliation, indiscriminate punishment, and personal retribution.", href: "https://bible.usccb.org/bible/matthew/6", keywords: [/forgiv|mercy|clemency|pardon|death penalty|punish|vengeance|retribution|hate|enemy within/i] },
  { id: "peace", label: "Enemy-love and peacemaking", foundation: "Matthew 5:9 · 5:43–48", question: "Does the conduct make peace and love enemies rather than threaten, dehumanize, or glorify force?", guidance: "Score direct threats, political violence, stated hatred, and dehumanizing rhetoric against Jesus's commands.", href: "https://bible.usccb.org/bible/matthew/5", keywords: [/threat|enemy|hate|violence|force|war|insurrection|fight to the death|blood|dehuman/i] },
  { id: "fruit", label: "Fruit of the Spirit", foundation: "Galatians 5:22–23", question: "Does the public character show love, patience, kindness, gentleness, faithfulness, and self-control?", guidance: "Score repeated contempt, cruelty, mockery, racist speech, boasting, and loss of self-control.", href: "https://bible.usccb.org/bible/galatians/5", keywords: [/insult|mock|contempt|racis|ape|disab|boast|pride|cruel|conduct|pantomime/i] },
  { id: "service", label: "Authority as service", foundation: "Mark 10:42–45", question: "Is authority exercised as service rather than domination, self-exaltation, or demanded loyalty?", guidance: "Score public power, hierarchy, retaliation, and personality-centered loyalty against servant leadership.", href: "https://bible.usccb.org/bible/mark/10", keywords: [/authority|power|loyalty|purge|dominat|presiden|office|retaliat|dictator|leader/i] },
  { id: "neighbor", label: "Care for stranger and poor", foundation: "Matthew 25:35–40", question: "Does the conduct protect migrants, refugees, children, the sick, the hungry, and people with little power?", guidance: "Score documented policy effects without claiming that one policy interpretation binds every Christian.", href: "https://bible.usccb.org/bible/matthew/25", keywords: [/migrant|immigra|refugee|family separation|child|food|health|poor|usaid|stranger|deport/i] },
];

const patrioticCriteria: readonly RubricCriterion[] = [
  { id: "constitution", label: "Constitution above leader", foundation: "Article VI · Presidential oath", question: "Did constitutional duty control the leader rather than personal loyalty controlling the institution?", guidance: "Score oath, supremacy, constitutional limits, and attempts to place a leader above them.", href: "https://constitution.congress.gov/constitution/article-6/", keywords: [/constitution|oath|supremacy|unconstitutional|above the law|article vi/i] },
  { id: "elections", label: "Free elections and transfer", foundation: "Articles I & II · 12th Amendment", question: "Did the conduct respect lawful votes, adjudication, certification, and peaceful transfer?", guidance: "Evidence-based court challenges are legitimate; false electors, coercion, intimidation, and force are not.", href: "https://constitution.congress.gov/constitution/amendment-12/", keywords: [/election|electoral|january 6|transfer|certif|vote|false elector|overturn/i] },
  { id: "law", label: "Rule of law", foundation: "Constitutional government", question: "Did the conduct accept accurate legal status and equal accountability under law?", guidance: "Keep verdict, civil liability, charge, settlement, acquittal, dismissal, pardon, and analysis distinct.", href: "https://constitution.congress.gov/constitution/", keywords: [/court|convict|liable|fraud|illegal|law|indict|dismiss|verdict|judg|criminal/i] },
  { id: "checks", label: "Checks and oversight", foundation: "Articles I–III", question: "Did the conduct preserve Congress, courts, inspectors general, civil service, and lawful investigation?", guidance: "Institutions that constrain a president are constitutional safeguards, not disloyal enemies.", href: "https://constitution.congress.gov/browse/article-2/", keywords: [/congress|inspector|oversight|obstruction|impound|judge|agency|civil service|investigat|subpoena/i] },
  { id: "expression", label: "Speech, press, and dissent", foundation: "First Amendment", question: "Did government preserve protected speech, press access, assembly, petition, and viewpoint neutrality?", guidance: "Preserve the government's lawful control of restricted spaces while scoring viewpoint retaliation precisely.", href: "https://constitution.congress.gov/constitution/amendment-1/", keywords: [/press|speech|reporter|media|first amendment|viewpoint|protest|assembly|petition/i] },
  { id: "equality", label: "Equal citizenship and due process", foundation: "Fifth & 14th Amendments", question: "Did the conduct protect citizenship, equality, notice, hearing, and judicial review?", guidance: "Rights do not depend on race, birthplace, religion, party, or presidential approval.", href: "https://constitution.congress.gov/constitution/amendment-14/", keywords: [/due process|citizenship|racial|discrimin|immigra|alien enemies|notice|hearing|equal protection|birthright/i] },
  { id: "public-trust", label: "Office as public trust", foundation: "Emoluments clauses · Public trust", question: "Was office used for public ends rather than enrichment, self-protection, family advantage, or revenge?", guidance: "Score documented conflicts and private benefit without presuming an unproven quid pro quo.", href: "https://constitution.congress.gov/browse/essay/artI-S9-C8-3-1/ALDE_00013204/", keywords: [/emolument|foreign government|conflict|nepot|family|private|gift|bribe|enemy|enrich|self-protect/i] },
  { id: "answerability", label: "Answerable lawful power", foundation: "Article II · Democratic accountability", question: "Even where power was lawful, was it exercised transparently, proportionally, and accountably?", guidance: "Legality is the floor; clemency, emergency power, war, and enforcement remain open to democratic judgment.", href: "https://constitution.congress.gov/browse/essay/artII-S2-C1-3-1/ALDE_00013316/", keywords: [/pardon|clemency|impeach|retaliat|executive|emergency|war power|enforcement|accountab/i] },
];

const americaFirstCriteria: readonly RubricCriterion[] = [
  { id: "benefit", label: "National benefit measured", foundation: "Security, prosperity, health, freedom", question: "Did Americans receive a measurable net benefit after predictable costs were counted?", guidance: "Put gains, household cost, public capacity, security, health, and freedom in the same ledger.", href: "https://www.gao.gov/yellowbook", keywords: [/cost|security|prosper|health|freedom|jobs|price|economic|benefit|american/i] },
  { id: "sovereignty", label: "Sovereignty without imperialism", foundation: "UN Charter · Self-determination", question: "Did the policy defend territorial integrity rather than threaten another population's land or resources?", guidance: "Separate threats and coercion from completed annexation, occupation, or adjudicated theft.", href: "https://www.un.org/en/about-us/un-charter/full-text", keywords: [/annex|greenland|canada|panama|venezuela|territor|sovereign|oil|self-determination/i] },
  { id: "alliances", label: "Alliances as force multipliers", foundation: "North Atlantic Treaty · Article 5", question: "Did the policy strengthen credible collective defense and allied willingness to act with America?", guidance: "Count both burden-sharing gains and costs imposed by conditional-protection threats.", href: "https://www.nato.int/cps/en/natolive/official_texts_17120.htm", keywords: [/nato|allia|ukraine|russia|article 5|collective defense|partner/i] },
  { id: "war", label: "Constitutional use of force", foundation: "Article I · War Powers Resolution", question: "Was force necessary, lawful, disclosed, authorized, and tied to a durable objective?", guidance: "Immediate military effect does not answer authorization, evidence, escalation, civilian risk, or aftermath.", href: "https://constitution.congress.gov/browse/essay/artI-S8-C11-1/ALDE_00013587/", keywords: [/war|strike|military|iran|boat|force|maduro|armed|bomb|lethal/i] },
  { id: "cooperation", label: "Capacity against shared threats", foundation: "Climate, disease, trafficking, finance", question: "Did cooperation increase American capacity, information, standards, and coordinated leverage?", guidance: "Withdrawal can be justified, but its lost intelligence, access, and agenda-setting power must be counted.", href: "https://www.gao.gov/products/gao-24-106102", keywords: [/climate|paris|who|usaid|traffick|borderless|united nations|pandemic|disease/i] },
  { id: "diplomacy", label: "Diplomacy before improvisation", foundation: "Foreign service · Development · Intelligence", question: "Did the policy preserve expertise and institutions needed to prevent conflict and verify results?", guidance: "Score dismantling, personnel loss, intelligence interruption, improvisation, and monitoring capacity.", href: "https://www.congress.gov/crs-product/IF12044", keywords: [/state department|foreign service|diploma|summit|agreement|expert|intelligence|monitor|rubio/i] },
  { id: "trade", label: "Trade serving the public", foundation: "Lawful authority · Household cost", question: "Were trade tools lawful, predictable, limited, and tied to an achievable objective?", guidance: "Score household cost, retaliation, legal authority, target stability, and delivered purchases or production.", href: "https://www.cbo.gov/publication/62210", keywords: [/tariff|trade|china|purchase|import|export|retaliat|ieepa/i] },
  { id: "credibility", label: "Credibility as national power", foundation: "Promises, threats, data, and law", question: "Did the action leave allies, adversaries, markets, and citizens more able to trust the next commitment?", guidance: "Measure durability, reversals, threats, counterparty response, and whether stated objectives survived.", href: "https://www.gao.gov/products/gao-21-105160", keywords: [/commit|promise|threat|withdraw|credib|trust|un vote|revers|durab/i] },
];

const dealCriteria: readonly RubricCriterion[] = [
  { id: "promise", label: "Promise", foundation: "What exact outcome was sold?", question: "Was the promised result specific, time-bounded, and recorded before the terms changed?", guidance: "Freeze the public commitment before later rhetoric can move the objective.", keywords: [/promise|announce|commit|sold|vision|target|pledge/i] },
  { id: "leverage", label: "Leverage", foundation: "What did each side need?", question: "Did the United States use durable leverage without imposing avoidable costs on itself?", guidance: "Separate bargaining power from threats that also weaken the American position.", keywords: [/leverage|threat|bargain|pressure|need|coerc|conditional/i] },
  { id: "concessions", label: "Concessions", foundation: "What did America give?", question: "Were sanctions relief, access, recognition, deadlines, subsidies, and foregone options proportionate?", guidance: "Count the full exchange, including commitments that never appeared in the announcement headline.", keywords: [/concession|relief|access|recognition|deadline|subsid|security commitment|gave|withdrawal timetable/i] },
  { id: "verification", label: "Verification", foundation: "How could performance be measured?", question: "Were the terms enforceable, inspectable, and backed by an agreed measurement process?", guidance: "A photo, aspiration, memorandum, or vague promise is not verifiable performance.", keywords: [/verif|inspect|memorandum|terms|monitor|enforce|measure/i] },
  { id: "delivery", label: "Delivery", foundation: "What actually happened?", question: "Did jobs, purchases, limits, cost, schedule, and conduct match the stated commitment?", guidance: "Compare the announcement with the completed result and preserve partial performance.", keywords: [/deliver|jobs|purchase|layoff|performance|result|shortfall|completed|quota/i] },
  { id: "durability", label: "Durability", foundation: "Did the result survive?", question: "Did the bargain remain useful after the summit, news cycle, administration, shock, or first violation?", guidance: "A durable deal should outlast the ceremony and retain enforceable value.", keywords: [/durab|survive|later|collapse|bankrupt|withdrawal|unravel|ended|reset/i] },
  { id: "public-cost", label: "Public cost", foundation: "Who absorbed the downside?", question: "Were taxes, subsidies, consumer prices, retrofit cost, debt, military exposure, and opportunity cost justified?", guidance: "A private or political gain is not a national bargain when the public absorbs the downside.", keywords: [/cost|price|tax|subsid|retrofit|debt|military exposure|consumer|billion|million/i] },
  { id: "beneficiary", label: "Beneficiary", foundation: "Who gained the most?", question: "Did the public gain more than the counterparty, private brand, family, or leader's prestige?", guidance: "Separate national benefit from spectacle, access, branding, and strategic advantage for the other side.", keywords: [/benefit|prestige|brand|private|counterparty|qatar|trump|access|foreign government/i] },
];

const worldStandingCriteria: readonly RubricCriterion[] = [
  { id: "commitments", label: "Credible commitments", foundation: "Treaties, guarantees, and agreements", question: "Did the action make the next U.S. commitment more believable and durable?", guidance: "Score reversals, conditional promises, compliance, verification, and counterparty expectations.", keywords: [/commit|treaty|guarantee|agreement|withdraw|promise|credib|durab/i] },
  { id: "alliances", label: "Alliance leverage", foundation: "Influence multiplied through partners", question: "Did trusted partners leave more willing and able to act with the United States?", guidance: "Count burden sharing, coercion, retaliation, hedging, coordination, and coalition capacity.", keywords: [/allia|nato|partner|ukraine|canada|greenland|collective|coalition/i] },
  { id: "rule-setting", label: "Seat at the table", foundation: "Institutions set rules with or without us", question: "Did the United States gain or surrender votes, standards, information, and agenda-setting power?", guidance: "Withdrawal is scored by the influence retained and by who filled the space afterward.", keywords: [/who|paris|united nations|institution|withdraw|standard|vote|climate|table/i] },
  { id: "capacity", label: "National capacity", foundation: "Diplomacy, aid, health, science, expertise", question: "Did the action preserve the people and systems needed to understand and prevent crises?", guidance: "Score workforce, expertise, local access, intelligence, implementation, and institutional memory.", keywords: [/usaid|state department|foreign service|expert|workforce|health|science|intelligence|capacity/i] },
  { id: "example", label: "Lawful example", foundation: "Constitutional credibility abroad", question: "Did the conduct strengthen America's ability to defend law, elections, sovereignty, and rights abroad?", guidance: "Domestic illegality and selective principles can spend diplomatic credibility even without a treaty change.", keywords: [/law|constitution|election|sovereign|rights|due process|illegal|court|human rights/i] },
  { id: "economic", label: "Economic influence", foundation: "Currency, trade, sanctions, markets", question: "Did the policy make U.S. markets, rules, and commitments more attractive and dependable?", guidance: "Score tariffs, retaliation, investment, sanctions leverage, volatility, and pressure to build alternatives.", keywords: [/tariff|trade|market|currency|dollar|sanction|economic|price|investment|oil/i] },
  { id: "prevention", label: "Crisis prevention", foundation: "Deterrence, monitoring, and de-escalation", question: "Did the action reduce future danger rather than exchange a visible act for greater escalation risk?", guidance: "Count monitoring, warning, diplomacy, civilian risk, escalation, deterrence, and the order left behind.", keywords: [/crisis|war|strike|force|iran|venezuela|north korea|afghan|escalat|monitor/i] },
  { id: "competition", label: "Strategic advantage", foundation: "Long-term influence relative to competitors", question: "Did the result increase U.S. freedom of action relative to rivals and future counterparties?", guidance: "Score what Russia, China, Iran, non-state actors, and future negotiators learned or gained.", keywords: [/russia|china|iran|taliban|competitor|adversar|counterparty|strategic|future/i] },
];

export const testRubrics: Record<TestId, TestRubric> = {
  christianity: { id: "christianity", label: "Christianity Test", href: "/christianity-test/", anchor: "christianity-scorecard", kicker: "Eight criteria · 0–4 points each", description: "The score measures alignment between documented public conduct and the cited commands, character, and teachings—not anyone's salvation or private faith.", criteria: christianityCriteria },
  patriotic: { id: "patriotic", label: "Patriotic Test", href: "/patriotic-test/", anchor: "patriotic-scorecard", kicker: "Eight criteria · 0–4 points each", description: "The score measures loyalty to constitutional government, public rights, lawful limits, and office held for the people rather than a leader.", criteria: patrioticCriteria },
  "america-first": { id: "america-first", label: "America First Test", href: "/america-first-test/", anchor: "america-first-scorecard", kicker: "Eight criteria · 0–4 points each", description: "The score measures concrete benefit to Americans after costs, law, capacity, alliances, and long-term leverage are put in the same ledger.", criteria: americaFirstCriteria },
  deal: { id: "deal", label: "Deal Test", href: "/deal-test/", anchor: "deal-scorecard", kicker: "Eight criteria · 0–4 points each", description: "The score compares the advertised bargain with leverage, concessions, verification, delivery, durability, public cost, and beneficiary.", criteria: dealCriteria },
  "world-standing": { id: "world-standing", label: "World Standing Test", href: "/world-standing-test/", anchor: "world-standing-scorecard", kicker: "Eight criteria · 0–4 points each", description: "The score measures the influence available to America through commitments, partners, institutions, capacity, lawful example, prevention, and strategic advantage.", criteria: worldStandingCriteria },
};

function bandFor(score: number) {
  if (score <= 24) return "Severe conflict";
  if (score <= 49) return "Fails";
  if (score <= 64) return "Mixed / contested";
  if (score <= 79) return "Substantial alignment";
  return "Passes";
}

function rationaleFor(points: number, finding: TestFinding, limitingContext: boolean) {
  if (points === 0) return "Direct, serious conflict with this criterion is documented.";
  if (points === 1) return limitingContext
    ? "The criterion substantially fails, with material limiting context preserved."
    : "The documented conduct substantially conflicts with this criterion.";
  if (points === 2) return finding === "Implicates"
    ? "The record implicates this criterion but is indirect, mixed, or materially limited."
    : "The record is mixed or unresolved under this criterion.";
  if (points === 3) return "The conduct substantially aligns, with meaningful reservations.";
  return "The available evidence strongly supports alignment with this criterion.";
}

function countPatternMatches(text: string, pattern: RegExp) {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  return [...text.matchAll(new RegExp(pattern.source, flags))].length;
}

export function scoreTextAgainstRubric(
  testId: TestId,
  text: string,
  finding: TestFinding,
): TestScore {
  const rubric = testRubrics[testId];
  const normalized = text.toLowerCase();
  const limitingContext = /acquit|dismiss|vacat|appeal pending|not adjudicated|without admission|partial|mixed|preliminary|no final|remained|preserved|later increased|limiting context/.test(normalized);
  const seriousRecord = /convict|liable|unconstitutional|illegal|violat|false|fraud|abuse|incitement|killed|death|separat|retaliat|overturn|threat/.test(normalized);

  const matchCounts = rubric.criteria.map((criterion) => criterion.keywords.reduce(
    (count, pattern) => count + countPatternMatches(normalized, pattern),
    0,
  ));
  const hasMatches = matchCounts.some(Boolean);

  const breakdown = rubric.criteria.map((criterion, index): CriterionScore => {
    const matchCount = matchCounts[index];
    if (finding === "Not directly implicated" || (!matchCount && (hasMatches || index !== 0))) {
      return { id: criterion.id, label: criterion.label, points: null, maxPoints: 4, rationale: "Not implicated by the cited record; excluded from the denominator." };
    }

    let points: number;
    if (finding === "Passes") points = matchCount >= 2 ? 4 : 3;
    else if (finding === "Implicates") points = (seriousRecord && matchCount >= 2) || matchCount >= 4 ? 1 : 2;
    else if (limitingContext && matchCount === 1) points = 2;
    else points = (seriousRecord && matchCount >= 2) || matchCount >= 4 ? 0 : 1;

    return { id: criterion.id, label: criterion.label, points, maxPoints: 4, rationale: rationaleFor(points, finding, limitingContext) };
  });

  const applicable = breakdown.filter((criterion) => criterion.points !== null);
  if (finding === "Not directly implicated" || applicable.length === 0) {
    return { testId, label: rubric.label, href: `${rubric.href}#${rubric.anchor}`, score: null, earnedPoints: 0, possiblePoints: 0, verdict: "Not scored", finding, breakdown };
  }

  const earnedPoints = applicable.reduce((total, criterion) => total + (criterion.points ?? 0), 0);
  const possiblePoints = applicable.length * 4;
  const score = Math.round((earnedPoints / possiblePoints) * 100);
  return { testId, label: rubric.label, href: `${rubric.href}#${rubric.anchor}`, score, earnedPoints, possiblePoints, verdict: bandFor(score), finding, breakdown };
}

export function scoreCaseAgainstRubric(item: CaseFile, testId: TestId, finding: TestFinding): TestScore {
  const teachingText = item.faithLens?.flatMap((lens) => [lens.reference, lens.teaching]).join(" ") ?? "";
  return scoreTextAgainstRubric(
    testId,
    [item.title, item.summary, item.significance, item.status, item.faithAnalysis ?? "", teachingText, ...item.subjects, ...item.tags].join(" "),
    finding,
  );
}
