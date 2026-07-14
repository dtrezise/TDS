import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
const voicesHubHtml = await readFile(new URL("../out/voices/index.html", import.meta.url), "utf8");
const rooftopsHtml = await readFile(new URL("../out/rooftops/index.html", import.meta.url), "utf8");
const testsHubHtml = await readFile(new URL("../out/tests/index.html", import.meta.url), "utf8");
const blindEyesHtml = await readFile(new URL("../out/blind-eyes/index.html", import.meta.url), "utf8");
const antiChristHtml = await readFile(new URL("../out/anti-christ/index.html", import.meta.url), "utf8");
const christianityTestHtml = await readFile(new URL("../out/christianity-test/index.html", import.meta.url), "utf8");
const patrioticTestHtml = await readFile(new URL("../out/patriotic-test/index.html", import.meta.url), "utf8");
const americaFirstTestHtml = await readFile(new URL("../out/america-first-test/index.html", import.meta.url), "utf8");
const dealTestHtml = await readFile(new URL("../out/deal-test/index.html", import.meta.url), "utf8");
const worldStandingTestHtml = await readFile(new URL("../out/world-standing-test/index.html", import.meta.url), "utf8");
const methodologyHtml = await readFile(new URL("../out/methodology/index.html", import.meta.url), "utf8");
const shareEBoxSource = await readFile(new URL("../app/share-ebox.tsx", import.meta.url), "utf8");

const renderedPages = [html, voicesHubHtml, rooftopsHtml, testsHubHtml, blindEyesHtml, antiChristHtml, christianityTestHtml, patrioticTestHtml, americaFirstTestHtml, dealTestHtml, worldStandingTestHtml, methodologyHtml];

function primaryNavigation(pageHtml) {
  const match = pageHtml.match(/<nav aria-label="Primary navigation">([\s\S]*?)<\/nav>/);
  assert.ok(match, "expected the shared primary navigation");
  return match[1];
}

function assertScorecard(pageHtml, testId, label) {
  assert.match(pageHtml, new RegExp(`id="${testId}-scorecard"`));
  assert.match(pageHtml, new RegExp(`${label}(?:<!-- -->)? scorecard\\.`));
  assert.match(pageHtml, /aria-label="Rubric scoring method"/);
  assert.match(pageHtml, /Normalize earned points to a 100-point alignment score/);
  assert.match(pageHtml, /Exclude criteria the evidence does not implicate/);
  assert.match(pageHtml, /aria-label="Criterion point rubric"/);
  assert.match(pageHtml, /Direct conflict/);
  assert.match(pageHtml, /Substantial conflict/);
  assert.match(pageHtml, /Mixed or limited/);
  assert.match(pageHtml, /Mostly aligns/);
  assert.match(pageHtml, /Strongly aligns/);
  assert.match(pageHtml, /aria-label="Score interpretation"/);
  assert.ok((pageHtml.match(/0–4 points<\/span>/g) ?? []).length === 8, `expected eight rubric criteria for ${label}`);
}

test("exports the finished evidence archive", () => {
  assert.match(html, /<title>TDS — The Evidence Archive/);
  assert.match(html, /TRUMP DERANGEMENT SYNDROME/);
  assert.doesNotMatch(primaryNavigation(html), /The Evidence Archive/);
  assert.doesNotMatch(html, /<h1>DERANGEMENT/);
  assert.match(html, /Accountability is not derangement\. Refusing the record is\./);
  assert.match(html, /How much verified misconduct must be ignored, excused, or celebrated to keep believing the myth\?/);
  assert.doesNotMatch(html, /usually deployed to dismiss critics/);
  assert.match(html, /Case files, not catchphrases/);
  assert.match(html, /Christianity test/);
  assert.match(html, /Apply the Patriotic Test/);
  assert.match(html, /Read our evidence rules/);
  assert.match(html, /80<\/strong><span>case files/);
  assert.match(html, /Record status/);
  assert.match(html, /birthright-citizenship order/i);
  assert.match(html, /Project 2025/);
  assert.match(html, /faith-kirk-memorial-forgiveness-2025/);
  assert.match(html, /ieepa-tariffs-supreme-court-2026/);
  assert.match(html, /maduro-capture-and-venezuelan-oil-control-2026/);
  assert.match(html, /qatar-gifted-presidential-jet-2025-2026/);
  assert.match(html, /America &amp; world/);
  assert.match(html, /Deals &amp; outcomes/);
  assert.match(html, /forgiveness met Trump/);
  assert.match(html, /evidence-hero\.jpg/);
  assert.match(html, /property="og:image" content="https:\/\/dtrezise\.github\.io\/TDS\/share-banner\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(html, /The central contradiction/);
  assert.doesNotMatch(html, /Six non-negotiable rules/);
  assert.doesNotMatch(html, /Four tests, one record/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the case-level Christianity Tests visible", () => {
  assert.ok((html.match(/class="faith-note"/g) ?? []).length === 21, "expected 21 visible Christianity Tests");
  assert.ok((html.match(/faith-note__label">Christianity test/g) ?? []).length === 21, "expected every test to keep its visible label");
  assert.doesNotMatch(html, /<details class="faith-note"/);
});

test("applies the four additional tests to every Evidence eBox without forcing a conclusion", () => {
  assert.ok((html.match(/class="case-test-note case-test-note--patriotic"/g) ?? []).length === 80, "expected a Patriotic Test lens on every case");
  assert.ok((html.match(/class="case-test-note case-test-note--america-first"/g) ?? []).length === 80, "expected an America First Test lens on every case");
  assert.ok((html.match(/class="case-test-note case-test-note--deal"/g) ?? []).length === 80, "expected a Deal Test lens on every case");
  assert.ok((html.match(/class="case-test-note case-test-note--world-standing"/g) ?? []).length === 80, "expected a World Standing Test lens on every case");
  assert.match(html, /Not directly implicated/);
  assert.match(html, />Fails</);
  assert.match(html, />Implicates</);
  assert.ok((html.match(/class="test-score-badge test-score-badge--christianity"/g) ?? []).length === 21, "expected a Christianity rubric score on every applicable case");
  assert.ok((html.match(/class="test-score-badge test-score-badge--patriotic"/g) ?? []).length === 80, "expected a Patriotic score on every case");
  assert.ok((html.match(/class="test-score-badge test-score-badge--america-first"/g) ?? []).length === 80, "expected an America First score on every case");
  assert.ok((html.match(/class="test-score-badge test-score-badge--deal"/g) ?? []).length === 80, "expected a Deal score on every case");
  assert.ok((html.match(/class="test-score-badge test-score-badge--world-standing"/g) ?? []).length === 80, "expected a World Standing score on every case");
  assert.match(html, /test-score-popover__criteria/);
  assert.match(html, /Open the complete rubric/);
  assert.match(html, /href="\/patriotic-test\/#patriotic-scorecard"/);
  assert.match(html, /href="\/america-first-test\/#america-first-scorecard"/);
  assert.match(html, /href="\/deal-test\/#deal-scorecard"/);
  assert.match(html, /href="\/world-standing-test\/#world-standing-scorecard"/);
  assert.match(html, />N\/A</);
});

test("exports accessible archive controls", () => {
  assert.match(html, /aria-label="Evidence filters"/);
  assert.match(html, /type="search"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.ok((html.match(/target="_blank"/g) ?? []).length > 150, "expected the evidence and teaching links to render");
});

test("exports the Voices and Tests springboard pages", () => {
  assert.match(voicesHubHtml, /<title>Voices \| TDS/);
  assert.match(voicesHubHtml, /Hear the resistance/);
  assert.match(voicesHubHtml, /Examine the complicity/);
  assert.match(voicesHubHtml, /href="\/rooftops\/"/);
  assert.match(voicesHubHtml, /href="\/blind-eyes\/"/);
  assert.match(voicesHubHtml, /href="\/anti-christ\/"/);
  assert.match(voicesHubHtml, /rooftops-hero\.jpg/);
  assert.match(voicesHubHtml, /blind-eyes-hero\.jpg/);
  assert.match(voicesHubHtml, /anti-christ-hero\.jpg/);
  assert.doesNotMatch(voicesHubHtml, /class="hub-intro"/);

  assert.match(testsHubHtml, /<title>Tests \| TDS/);
  assert.doesNotMatch(testsHubHtml, /class="hub-intro"/);
  assert.match(testsHubHtml, /href="\/christianity-test\/"/);
  assert.match(testsHubHtml, /href="\/patriotic-test\/"/);
  assert.match(testsHubHtml, /href="\/america-first-test\/"/);
  assert.match(testsHubHtml, /href="\/deal-test\/"/);
  assert.match(testsHubHtml, /href="\/world-standing-test\/"/);
  assert.match(testsHubHtml, /world-standing-test-hero\.png/);
});

test("exports the Christian resistance directory", () => {
  assert.match(rooftopsHtml, /<title>Shout It from the Rooftops \| TDS/);
  assert.match(rooftopsHtml, /A directory for Christian resistance/);
  assert.match(rooftopsHtml, /Proclaim it on the housetops/);
  assert.match(rooftopsHtml, /Matthew 10:27/);
  assert.match(rooftopsHtml, /Christians Against Christian Nationalism/);
  assert.match(rooftopsHtml, /Amanda Tyler/);
  assert.match(rooftopsHtml, /William J\. Barber II/);
  assert.match(rooftopsHtml, /Russell Moore/);
  assert.match(rooftopsHtml, /Jemar Tisby/);
  assert.match(rooftopsHtml, /Kristin Kobes Du Mez/);
  assert.match(rooftopsHtml, /Brian Kaylor/);
  assert.match(rooftopsHtml, /Basis for inclusion|Source for this description/);
  assert.match(rooftopsHtml, /bsky\.app\/intent\/compose/);
  assert.match(rooftopsHtml, /facebook\.com\/sharer\/sharer\.php/);
  assert.match(rooftopsHtml, /mailto:/);
  assert.match(rooftopsHtml, /aria-live="polite"/);
  assert.match(rooftopsHtml, /application\/ld\+json/);
  assert.match(rooftopsHtml, /rooftops-hero\.jpg/);
  assert.ok((rooftopsHtml.match(/class="voice-card"/g) ?? []).length === 12, "expected 12 curated voice profiles");
});

test("exports the Blind Eyes accountability directory", () => {
  assert.match(blindEyesHtml, /<title>Blind Eyes \| TDS/);
  assert.match(blindEyesHtml, /Blind eyes/);
  assert.match(blindEyesHtml, /Loud pulpits/);
  assert.match(blindEyesHtml, /Do you have eyes/);
  assert.match(blindEyesHtml, /Mark 8:18/);
  assert.match(blindEyesHtml, /Franklin Graham/);
  assert.match(blindEyesHtml, /Eric Metaxas/);
  assert.match(blindEyesHtml, /Lance Wallnau/);
  assert.match(blindEyesHtml, /Doug Wilson, Christ Church &amp; CREC/);
  assert.match(blindEyesHtml, /Greg Locke &amp; Global Vision Bible Church/);
  assert.match(blindEyesHtml, /Robert Jeffress &amp; First Baptist Dallas/);
  assert.match(blindEyesHtml, /Sean Feucht &amp; Let Us Worship/);
  assert.match(blindEyesHtml, /TPUSA Faith/);
  assert.match(blindEyesHtml, /Denial, response, or limiting context/);
  assert.match(blindEyesHtml, /Christianity test · editorial analysis/);
  assert.match(blindEyesHtml, /No guilt by association/);
  assert.match(blindEyesHtml, /bsky\.app\/intent\/compose/);
  assert.match(blindEyesHtml, /facebook\.com\/sharer\/sharer\.php/);
  assert.match(blindEyesHtml, /mailto:/);
  assert.match(blindEyesHtml, /application\/ld\+json/);
  assert.match(blindEyesHtml, /blind-eyes-hero\.jpg/);
  assert.ok((blindEyesHtml.match(/class="blind-card"/g) ?? []).length === 8, "expected 8 documented Blind Eyes profiles");
  assert.ok((blindEyesHtml.match(/class="test-score-badge test-score-badge--christianity"/g) ?? []).length === 8, "expected one Christianity score per Blind Eyes profile");
});

test("exports the Anti Christ teaching comparison", () => {
  assert.match(antiChristHtml, /<title>Anti Christ \| TDS/);
  assert.match(antiChristHtml, /Not a prophecy/);
  assert.match(antiChristHtml, /Against Christ/);
  assert.match(antiChristHtml, /Not <em>the<\/em> Antichrist/);
  assert.match(antiChristHtml, /1 John 2:6/);
  assert.match(antiChristHtml, /LIES/);
  assert.match(antiChristHtml, /STEALING/);
  assert.match(antiChristHtml, /SEXUAL ENTITLEMENT/);
  assert.match(antiChristHtml, /CRUELTY/);
  assert.match(antiChristHtml, /VENGEANCE/);
  assert.match(antiChristHtml, /PRIDE &amp; IDOLATRY/);
  assert.match(antiChristHtml, /RACISM &amp; CONTEMPT/);
  assert.match(antiChristHtml, /DOMINATION/);
  assert.match(antiChristHtml, /Grab them by the pussy/);
  assert.match(antiChristHtml, /I am your retribution/);
  assert.match(antiChristHtml, /I hate my opponent/);
  assert.match(antiChristHtml, /The category names are theological and editorial/);
  assert.match(antiChristHtml, /Christianity test · editorial analysis/);
  assert.match(antiChristHtml, /anti-christ-hero\.jpg/);
  assert.match(antiChristHtml, /application\/ld\+json/);
  assert.ok((antiChristHtml.match(/class="anti-category"/g) ?? []).length === 8, "expected 8 moral categories");
  assert.ok((antiChristHtml.match(/class="anti-case-date"/g) ?? []).length === 40, "expected five headline records in each category");
  assert.ok((antiChristHtml.match(/class="anti-record-card"/g) ?? []).length === 71, "expected 71 expanded category placements");
  assert.ok((antiChristHtml.match(/class="test-score-badge test-score-badge--christianity"/g) ?? []).length === 120, "expected one Christianity score per Anti Christ eBox");
});

test("exports the Christianity Test framework without the redundant Voices collection", () => {
  assert.match(christianityTestHtml, /<title>Christianity Test \| TDS/);
  assert.match(christianityTestHtml, /christianity-test-hero\.jpg/);
  assert.match(christianityTestHtml, /Test the public witness by the public record/);
  assert.match(christianityTestHtml, /Conduct\. Teaching\. Comparison\./);
  assertScorecard(christianityTestHtml, "christianity", "Christianity Test");
  assert.match(christianityTestHtml, /Truthful witness/);
  assert.match(christianityTestHtml, /Honest stewardship/);
  assert.match(christianityTestHtml, /Fidelity and dignity/);
  assert.match(christianityTestHtml, /Mercy and forgiveness/);
  assert.match(christianityTestHtml, /Fruit of the Spirit/);
  assert.match(christianityTestHtml, /Care for stranger and poor/);
  assert.doesNotMatch(christianityTestHtml, /The Christianity Collection/);
  assert.doesNotMatch(christianityTestHtml, /christianity-collection/);
});

test("exports the Patriotic Test framework and evidence record", () => {
  assert.match(patrioticTestHtml, /<title>Patriotic Test \| TDS/);
  assert.match(patrioticTestHtml, /patriotic-test-hero\.jpg/);
  assert.match(patrioticTestHtml, /A patriot owes loyalty to the Constitution/);
  assert.match(patrioticTestHtml, /A loyalist asks what serves the leader/);
  assert.match(patrioticTestHtml, /The leader above the law/);
  assert.match(patrioticTestHtml, /The Constitution above the leader/);
  assertScorecard(patrioticTestHtml, "patriotic", "Patriotic Test");
  assert.match(patrioticTestHtml, /Free elections and transfer/);
  assert.match(patrioticTestHtml, /Rule of law/);
  assert.match(patrioticTestHtml, /Checks and oversight/);
  assert.match(patrioticTestHtml, /Speech, press, and dissent/);
  assert.match(patrioticTestHtml, /Equal citizenship and due process/);
  assert.match(patrioticTestHtml, /Office as public trust/);
  assert.match(patrioticTestHtml, /Answerable lawful power/);
  assert.match(patrioticTestHtml, /Power must yield to elections/);
  assert.match(patrioticTestHtml, /The executive must obey law and oversight/);
  assert.match(patrioticTestHtml, /Office is a trust, not a personal weapon/);
  assert.match(patrioticTestHtml, /Emergency and foreign-policy labels do not erase constitutional limits/);
  assert.match(patrioticTestHtml, /A free press is not a presidential favor/);
  assert.match(patrioticTestHtml, /election-subversion-january-6-report/);
  assert.match(patrioticTestHtml, /gop-election-certification-objections/);
  assert.match(patrioticTestHtml, /Completed lawful exercise of presidential clemency/);
  assert.match(patrioticTestHtml, /District-court preliminary injunction; appellate panel stayed relief for restricted presidential spaces but not the East Room/);
  assert.match(patrioticTestHtml, /USCOURTS-dcd-1_25-cv-00532-0/);
  assert.match(patrioticTestHtml, /25-5109LDSN3\.pdf/);
  assert.match(patrioticTestHtml, /Patriotism is not a shortcut around proof/);
  assert.match(patrioticTestHtml, /ieepa-tariffs-supreme-court-2026/);
  assert.match(patrioticTestHtml, /alien-enemies-act-summary-removals-2025/);
  assert.match(patrioticTestHtml, /iran-nuclear-strikes-war-powers-2025/);
  assert.match(patrioticTestHtml, /rubio-usaid-state-dismantling-2025/);
  assert.ok((patrioticTestHtml.match(/class="patriotic-record"/g) ?? []).length === 16, "expected 15 archive records and one press-access record");
  assert.ok((patrioticTestHtml.match(/class="test-score-badge test-score-badge--patriotic"/g) ?? []).length === 16, "expected one Patriotic rubric score per test record");
  assert.ok(patrioticTestHtml.indexOf("patriotic-contrast") < patrioticTestHtml.indexOf("test-suite-nav"), "expected Loyalism and Patriotism immediately before the test navigation");
});

test("exports the America First Test framework and evidence", () => {
  assert.match(americaFirstTestHtml, /<title>America First Test \| TDS/);
  assert.match(americaFirstTestHtml, /america-first-test-hero\.jpg/);
  assert.match(americaFirstTestHtml, /Putting Americans first requires measuring what Americans actually gain/);
  assert.match(americaFirstTestHtml, /Leader-first nationalism/);
  assert.match(americaFirstTestHtml, /The durable power of a free republic/);
  assertScorecard(americaFirstTestHtml, "america-first", "America First Test");
  assert.match(americaFirstTestHtml, /National benefit measured/);
  assert.match(americaFirstTestHtml, /Sovereignty without imperialism/);
  assert.match(americaFirstTestHtml, /Alliances as force multipliers/);
  assert.match(americaFirstTestHtml, /Constitutional use of force/);
  assert.match(americaFirstTestHtml, /paris-unfccc-withdrawals-2025-2026/);
  assert.match(americaFirstTestHtml, /nato-threats-and-five-percent-bargain-2024-2026/);
  assert.match(americaFirstTestHtml, /ukraine-aid-pause-and-un-vote-2025/);
  assert.match(americaFirstTestHtml, /venezuela-lethal-boat-strikes-2025/);
  assert.match(americaFirstTestHtml, /alien-enemies-act-summary-removals-2025/);
  assert.doesNotMatch(americaFirstTestHtml, /Claims we will not overstate/);
  assert.ok((americaFirstTestHtml.match(/class="patriotic-record test-record"/g) ?? []).length === 14, "expected all 14 America First records");
  assert.ok((americaFirstTestHtml.match(/class="test-score-badge test-score-badge--america-first"/g) ?? []).length === 14, "expected one America First rubric score per test record");
  assert.ok(americaFirstTestHtml.indexOf("Leader-first nationalism") < americaFirstTestHtml.indexOf("test-suite-nav"), "expected the America First contrast immediately before the test navigation");
});

test("exports the Deal Test scorecard and records without a public corrections section", () => {
  assert.match(dealTestHtml, /<title>Deal Test \| TDS/);
  assert.match(dealTestHtml, /deal-test-hero\.jpg/);
  assert.match(dealTestHtml, /A deal is not a press conference/);
  assertScorecard(dealTestHtml, "deal", "Deal Test");
  assert.match(dealTestHtml, /Promise/);
  assert.match(dealTestHtml, /Leverage/);
  assert.match(dealTestHtml, /Concessions/);
  assert.match(dealTestHtml, /Verification/);
  assert.match(dealTestHtml, /Delivery/);
  assert.match(dealTestHtml, /Durability/);
  assert.match(dealTestHtml, /Public cost/);
  assert.match(dealTestHtml, /Beneficiary/);
  assert.match(dealTestHtml, /usfl-antitrust-strategy-1983-1988/);
  assert.match(dealTestHtml, /trump-university-settlement/);
  assert.match(dealTestHtml, /trump-casino-company-bankruptcies-2004-2009/);
  assert.match(dealTestHtml, /qatar-gifted-presidential-jet-2025-2026/);
  assert.match(dealTestHtml, /iran-deal-exit-to-hormuz-crisis-2018-2026/);
  assert.doesNotMatch(dealTestHtml, /Record corrections/);
  assert.doesNotMatch(dealTestHtml, /class="test-corrections"/);
  assert.match(dealTestHtml, /not personal bankruptcy/);
  assert.ok((dealTestHtml.match(/class="patriotic-record test-record"/g) ?? []).length === 12, "expected ten new and two existing deal records");
  assert.ok((dealTestHtml.match(/class="test-score-badge test-score-badge--deal"/g) ?? []).length === 12, "expected one Deal rubric score per test record");
  assert.ok(dealTestHtml.indexOf("The brand") < dealTestHtml.indexOf("test-suite-nav"), "expected The Brand and The Verdict immediately before the test navigation");
});

test("exports the World Standing Test framework and evidence", () => {
  assert.match(worldStandingTestHtml, /<title>World Standing Test \| TDS/);
  assert.match(worldStandingTestHtml, /world-standing-test-hero\.png/);
  assert.match(worldStandingTestHtml, /Power as isolation/);
  assert.match(worldStandingTestHtml, /World standing, tested/);
  assertScorecard(worldStandingTestHtml, "world-standing", "World Standing Test");
  assert.match(worldStandingTestHtml, /credible commitments/i);
  assert.match(worldStandingTestHtml, /Alliance leverage/);
  assert.match(worldStandingTestHtml, /Seat at the table/);
  assert.match(worldStandingTestHtml, /National capacity/);
  assert.match(worldStandingTestHtml, /Lawful example/);
  assert.match(worldStandingTestHtml, /Economic influence/);
  assert.match(worldStandingTestHtml, /Crisis prevention/);
  assert.match(worldStandingTestHtml, /Strategic advantage/);
  assert.match(worldStandingTestHtml, /who-withdrawal-2025-2026/);
  assert.match(worldStandingTestHtml, /rubio-usaid-state-dismantling-2025/);
  assert.match(worldStandingTestHtml, /ukraine-aid-pause-and-un-vote-2025/);
  assert.match(worldStandingTestHtml, /iran-nuclear-strikes-war-powers-2025/);
  assert.match(worldStandingTestHtml, /china-phase-one-purchase-shortfall-2020-2025/);
  assert.ok((worldStandingTestHtml.match(/class="patriotic-record test-record"/g) ?? []).length === 17, "expected all 17 World Standing records");
  assert.ok((worldStandingTestHtml.match(/class="test-score-badge test-score-badge--world-standing"/g) ?? []).length === 17, "expected one World Standing rubric score per test record");
});

test("exports the complete publication methodology", () => {
  assert.match(methodologyHtml, /<title>Methodology \| TDS/);
  assert.match(methodologyHtml, /methodology-hero\.jpg/);
  assert.match(methodologyHtml, /Harsh argument/);
  assert.match(methodologyHtml, /Six non-negotiable rules/);
  assert.match(methodologyHtml, /Primary records first/);
  assert.match(methodologyHtml, /Status is part of the fact/);
  assert.match(methodologyHtml, /No guilt by association/);
  assert.match(methodologyHtml, /A citation is not immunity/);
  assert.match(methodologyHtml, /Corrections stay visible/);
  assert.match(methodologyHtml, /Source hierarchy/);
  assert.match(methodologyHtml, /Criminal verdict/);
  assert.match(methodologyHtml, /Write no broader than the proof/);
  assert.match(methodologyHtml, /EDITORIAL_STANDARDS\.md/);
  assert.match(methodologyHtml, /ARCHIVE_DATA_ARCHITECTURE\.md/);
});

test("adds a share composer trigger to every evidence eBox", () => {
  assert.ok((html.match(/class="ebox-share-trigger"/g) ?? []).length === 80, "expected every archive case file to be shareable");
  assert.ok((rooftopsHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 18, "expected every Rooftops movement and voice card to be shareable");
  assert.ok((blindEyesHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 8, "expected every Blind Eyes profile to be shareable");
  assert.ok((antiChristHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 120, "expected every Anti Christ evidence and quotation card to be shareable");
  assert.ok((patrioticTestHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 16, "expected every Patriotic Test record to be shareable");
  assert.ok((americaFirstTestHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 14, "expected every America First Test record to be shareable");
  assert.ok((dealTestHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 12, "expected every Deal Test record to be shareable");
  assert.ok((worldStandingTestHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 17, "expected every World Standing Test record to be shareable");
  for (const pageHtml of renderedPages) {
    assert.match(pageHtml, /property="og:image" content="https:\/\/dtrezise\.github\.io\/TDS\/share-banner\.png"/);
  }
  assert.ok((html.match(/Share evidence<\/button>/g) ?? []).length === 80, "expected the archive share buttons to say Share evidence");
  assert.doesNotMatch(html, /> Share eBox</);
  assert.match(shareEBoxSource, /tds-share-logo\.png/);
  assert.match(shareEBoxSource, /function DestinationIcon/);
  assert.ok((shareEBoxSource.match(/aria-label={`Format for \$\{item\.label\}`}/g) ?? []).length === 1, "expected accessible labels on the icon-only destinations");
  assert.match(shareEBoxSource, /visually-hidden/);
});

test("uses one uncluttered four-section header on every page", () => {
  for (const pageHtml of renderedPages) {
    const nav = primaryNavigation(pageHtml);
    assert.match(nav, />Evidence</);
    assert.match(nav, />Voices</);
    assert.match(nav, />Tests</);
    assert.match(nav, />Methods</);
    assert.doesNotMatch(nav, /The Evidence Archive|Christianity Test|Patriotic Test|Anti Christ|Blind Eyes|Rooftops|Categories|Take action|Profiles|Full record/);
    assert.ok((nav.match(/primary-nav__link/g) ?? []).length === 4, "expected exactly four primary links");
  }

  assert.match(html, /href="\/patriotic-test\/"/);
  assert.match(html, /href="\/america-first-test\/"/);
  assert.match(html, /href="\/deal-test\/"/);
  assert.match(html, /href="\/world-standing-test\/"/);
  for (const pageHtml of [christianityTestHtml, patrioticTestHtml, americaFirstTestHtml, dealTestHtml, worldStandingTestHtml]) {
    assert.match(pageHtml, /aria-label="Evidence tests"/);
    assert.match(pageHtml, /href="\/christianity-test\/"/);
    assert.match(pageHtml, /href="\/patriotic-test\/"/);
    assert.match(pageHtml, /href="\/america-first-test\/"/);
    assert.match(pageHtml, /href="\/deal-test\/"/);
    assert.match(pageHtml, /href="\/world-standing-test\/"/);
  }
});

test("uses the same four-link footer and a far-right arrow on every page", () => {
  for (const pageHtml of renderedPages) {
    const match = pageHtml.match(/<footer>([\s\S]*?)<\/footer>/);
    assert.ok(match, "expected the shared footer");
    const footer = match[1];
    assert.match(footer, />Evidence</);
    assert.match(footer, />Voices</);
    assert.match(footer, />Tests</);
    assert.match(footer, />Methods</);
    assert.match(footer, /class="footer-top" href="#top" aria-label="Back to top">↑<\/a>$/);
    assert.doesNotMatch(footer, />Back to top/);
  }
});
