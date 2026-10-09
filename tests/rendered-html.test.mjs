import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function output(path) {
  return readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
}

const html = await output("index.html");
const whatsNewHtml = await output("whats-new/index.html");
const archiveHtml = await output("archive/index.html");
const suggestHtml = await output("suggest/index.html");
const voicesHubHtml = await output("voices/index.html");
const rooftopsHtml = await output("rooftops/index.html");
const testsHubHtml = await output("tests/index.html");
const blindEyesHtml = await output("blind-eyes/index.html");
const antiChristHtml = await output("anti-christ/index.html");
const christianityTestHtml = await output("christianity-test/index.html");
const patrioticTestHtml = await output("patriotic-test/index.html");
const americaFirstTestHtml = await output("america-first-test/index.html");
const dealTestHtml = await output("deal-test/index.html");
const worldStandingTestHtml = await output("world-standing-test/index.html");
const methodologyHtml = await output("methodology/index.html");
const aboutHtml = await output("about/index.html");
const correctionsHtml = await output("corrections/index.html");
const privacyHtml = await output("privacy/index.html");
const independenceHtml = await output("editorial-independence/index.html");
const aiUseHtml = await output("ai-use/index.html");
const permanentCaseHtml = await output("evidence/new-york-falsifying-business-records-conviction/index.html");
const shareEBoxSource = await readFile(new URL("../app/share-ebox.tsx", import.meta.url), "utf8");
const suggestionFormSource = await readFile(new URL("../app/suggest/suggestion-form.tsx", import.meta.url), "utf8");

const renderedPages = [
  html, whatsNewHtml, archiveHtml, suggestHtml, voicesHubHtml, rooftopsHtml, testsHubHtml, blindEyesHtml, antiChristHtml,
  christianityTestHtml, patrioticTestHtml, americaFirstTestHtml, dealTestHtml,
  worldStandingTestHtml, methodologyHtml, aboutHtml, correctionsHtml, privacyHtml,
  independenceHtml, aiUseHtml, permanentCaseHtml,
];

function primaryNavigation(pageHtml) {
  const match = pageHtml.match(/<nav aria-label="Primary navigation">([\s\S]*?)<\/nav>/);
  assert.ok(match, "expected the shared primary navigation");
  return match[1];
}

function route(path) {
  return new RegExp(`href="(?:/TDS)?/${path}/"`);
}

function assertReviewFramework(pageHtml, testId, label) {
  assert.match(pageHtml, new RegExp(`id="${testId}-scorecard"`));
  assert.match(pageHtml, new RegExp(`${label}(?:<!-- -->)? review framework\.`));
  assert.match(pageHtml, /aria-label="Qualitative review method"/);
  assert.match(pageHtml, /Identify the exact criterion implicated by the record/);
  assert.match(pageHtml, /Publish a written judgment only after human review/);
  assert.match(pageHtml, /No automated score/);
  assert.ok((pageHtml.match(/evidence-specific review<\/span>/g) ?? []).length === 8, `expected eight criteria for ${label}`);
  assert.doesNotMatch(pageHtml, /normalized to|\/100|0–4 points|Rubric scoring method|Score interpretation/i);
}

test("exports the evidence archive and permanent case links", () => {
  assert.match(html, /<title>TDS — The Evidence Archive/);
  assert.match(html, /TRUMP DERANGEMENT SYNDROME/);
  assert.match(html, /Accountability is not derangement\. Refusing the record is\./);
  assert.match(html, /Case files, not catchphrases/);
  assert.match(html, /124<\/strong><span>case files/);
  assert.match(html, /Latest source check/);
  assert.match(html, /Strongest evidence links/);
  assert.match(html, /Court record<\/span><strong>January 3, 2025 sentencing decision and post-trial procedural history/);
  assert.ok((html.match(/Open the permanent case file/g) ?? []).length === 124);
  assert.match(html, route("evidence/new-york-falsifying-business-records-conviction"));
  assert.doesNotMatch(html, /test-score-badge|test-score-popover|\/100/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps visible Christianity analysis and four qualitative lenses", () => {
  assert.ok((html.match(/class="faith-note"/g) ?? []).length === 22);
  for (const id of ["patriotic", "america-first", "deal", "world-standing"]) {
    assert.ok((html.match(new RegExp(`class="case-test-note case-test-note--${id}"`, "g")) ?? []).length === 124);
  }
  assert.match(html, /Applies for review/);
  assert.match(html, /Related context/);
  assert.match(html, /Not directly implicated/);
  assert.doesNotMatch(html, />Fails<|>Implicates</);
});

test("exports a share-safe permanent evidence page", () => {
  assert.match(permanentCaseHtml, /Permanent evidence case file/);
  assert.match(permanentCaseHtml, /Archive case ID/);
  assert.match(permanentCaseHtml, /What the record establishes/);
  assert.match(permanentCaseHtml, /Required reading boundary/);
  assert.match(permanentCaseHtml, /Sources and retrieval dates/);
  assert.match(permanentCaseHtml, /Qualitative editorial review/);
  assert.match(permanentCaseHtml, /property="og:url" content="https:\/\/dtrezise\.github\.io\/TDS\/evidence\/new-york-falsifying-business-records-conviction\/"/);
  assert.match(permanentCaseHtml, /application\/ld\+json/);
  assert.doesNotMatch(permanentCaseHtml, /test-score-badge|\/100/);
});

test("exports accessible archive and share controls", () => {
  assert.match(html, /aria-label="Evidence filters"/);
  assert.match(html, /type="search"/);
  assert.match(html, /aria-live="polite"/);
  assert.ok((html.match(/class="ebox-share-trigger"/g) ?? []).length === 124);
  assert.ok((html.match(/Share evidence<\/button>/g) ?? []).length === 124);
  assert.match(shareEBoxSource, /role="dialog"/);
  assert.match(shareEBoxSource, /trigger\?\.focus/);
  assert.match(shareEBoxSource, /document\.body\.style\.overflow = "hidden"/);
  assert.match(shareEBoxSource, /function DestinationIcon/);
});

test("exports the Voices and Tests hubs", () => {
  assert.match(voicesHubHtml, /Hear the resistance/);
  assert.match(voicesHubHtml, /Examine the complicity/);
  assert.match(voicesHubHtml, /16 voices/);
  assert.match(voicesHubHtml, /10 profiles/);
  assert.match(voicesHubHtml, /100 record placements/);
  for (const href of ["rooftops", "blind-eyes", "anti-christ"]) assert.match(voicesHubHtml, route(href));
  assert.doesNotMatch(voicesHubHtml, /class="hub-intro"/);

  for (const href of ["christianity-test", "patriotic-test", "america-first-test", "deal-test", "world-standing-test"]) {
    assert.match(testsHubHtml, route(href));
  }
  assert.doesNotMatch(testsHubHtml, /class="hub-intro"|>Apply a test</);
});

test("exports a rolling What’s New index with permanent-record links", () => {
  assert.match(whatsNewHtml, /<title>What’s New \| TDS/);
  assert.match(whatsNewHtml, /A rolling two-week publication window/);
  assert.match(whatsNewHtml, /Discovery is not publication/);
  assert.match(whatsNewHtml, /New Rooftops voice: Jennifer Butler/);
  assert.match(whatsNewHtml, /Trump used reckless and ambiguous language about Iran/);
  assert.match(whatsNewHtml, /Open the permanent record/);
  assert.match(whatsNewHtml, route("evidence/la-san-diego-iran-rally-language-2026"));
  assert.ok((whatsNewHtml.match(/class="new-card new-card--/g) ?? []).length === 53);
  assert.ok((whatsNewHtml.match(/class="ebox-share-trigger"/g) ?? []).length === 53);
  assert.match(whatsNewHtml, /All 53/);
  assert.match(whatsNewHtml, /Evidence 42/);
  assert.match(whatsNewHtml, /Voices 11/);
});

test("exports a complete incident-date archive with typed permanent-record links", () => {
  assert.match(archiveHtml, /<title>Archive \| TDS/);
  assert.match(archiveHtml, /The complete record · one compact chronology/);
  assert.match(archiveHtml, /Dated records are ordered by the incident or documented conduct/);
  assert.match(archiveHtml, /<strong>167<\/strong> total entries/);
  assert.match(archiveHtml, /<strong>124<\/strong> Evidence/);
  assert.match(archiveHtml, /<strong>25<\/strong> Rooftops/);
  assert.match(archiveHtml, /<strong>10<\/strong> Blind Eyes/);
  assert.match(archiveHtml, /<strong>8<\/strong> Anti Christ/);
  assert.ok((archiveHtml.match(/class="archive-row archive-row--/g) ?? []).length === 167);
  assert.ok((archiveHtml.match(/archive-row--evidence/g) ?? []).length === 124);
  assert.ok((archiveHtml.match(/archive-row--rooftops/g) ?? []).length === 25);
  assert.ok((archiveHtml.match(/archive-row--blind-eyes/g) ?? []).length === 10);
  assert.ok((archiveHtml.match(/archive-row--anti-christ/g) ?? []).length === 8);
  assert.match(archiveHtml, route("evidence/new-york-falsifying-business-records-conviction"));
  assert.match(archiveHtml, /href="(?:\/TDS)?\/rooftops\/#rooftops-voice-/);
  assert.match(archiveHtml, /href="(?:\/TDS)?\/blind-eyes\/#/);
  assert.match(archiveHtml, /href="(?:\/TDS)?\/anti-christ\/#/);
  assert.match(archiveHtml, /Incident record/);
  assert.match(archiveHtml, /Latest documented incident/);
  assert.match(archiveHtml, /Latest included incident/);
  assert.match(archiveHtml, /No single incident date/);
  assert.match(archiveHtml, route("suggest"));

  const sortDates = [...archiveHtml.matchAll(/data-sort-date="([^"]*)"/g)].map((match) => match[1]);
  const dated = sortDates.filter(Boolean);
  assert.ok(dated.length > 100);
  assert.deepEqual(dated, [...dated].sort((left, right) => right.localeCompare(left)));
  assert.ok(sortDates.slice(dated.length).every((value) => value === ""), "undated profiles should follow the dated chronology");
});

test("exports a privacy-conscious incident suggestion workflow", () => {
  assert.match(suggestHtml, /<title>Suggest an Incident \| TDS/);
  assert.match(suggestHtml, /Suggest an incident\./);
  assert.match(suggestHtml, /A suggestion enters the research process as a lead/);
  assert.match(suggestHtml, /Direct delivery is not configured on this build/);
  assert.match(suggestHtml, /<input[^>]*required=""[^>]*name="title"/);
  assert.match(suggestHtml, /<input[^>]*type="date"[^>]*required=""[^>]*name="incidentDate"/);
  assert.match(suggestHtml, /<input[^>]*type="url"[^>]*name="primarySource"/);
  assert.match(suggestHtml, /name="contraryContext"/);
  assert.match(suggestHtml, /<input[^>]*type="checkbox"[^>]*required=""[^>]*name="publicRecordAffirmation"/);
  assert.match(suggestHtml, /Prepare review packet/);
  assert.match(suggestionFormSource, /NEXT_PUBLIC|submissionEndpoint/);
  assert.match(suggestionFormSource, /method: "POST"/);
  assert.match(suggestionFormSource, /Nothing was uploaded/);
  assert.match(suggestionFormSource, /Copy packet/);
  assert.match(suggestionFormSource, /Download \.txt/);
  assert.match(privacyHtml, /incident suggestion form prepares a structured research lead in your browser/);
});

test("exports the Christian resistance and accountability directories", () => {
  assert.match(rooftopsHtml, /A directory for Christian resistance/);
  assert.match(rooftopsHtml, /Christians Against Christian Nationalism/);
  assert.match(rooftopsHtml, /Amanda Tyler/);
  assert.match(rooftopsHtml, /William J\. Barber II/);
  assert.match(rooftopsHtml, /Jennifer Butler/);
  assert.match(rooftopsHtml, /Matthew D\. Taylor/);
  assert.ok((rooftopsHtml.match(/class="voice-card"/g) ?? []).length === 16);

  assert.match(blindEyesHtml, /Franklin Graham/);
  assert.match(blindEyesHtml, /Eric Metaxas/);
  assert.match(blindEyesHtml, /Paula White-Cain/);
  assert.match(blindEyesHtml, /Jack Hibbs/);
  assert.match(blindEyesHtml, /Denial, response, or limiting context/);
  assert.match(blindEyesHtml, /No guilt by association/);
  assert.ok((blindEyesHtml.match(/class="blind-card"/g) ?? []).length === 10);
  assert.doesNotMatch(blindEyesHtml, /test-score-badge|\/100/);
});

test("exports the Anti Christ teaching comparison without pseudo-scores", () => {
  assert.match(antiChristHtml, /Not a prophecy/);
  assert.match(antiChristHtml, /Against Christ/);
  for (const category of ["LIES", "STEALING", "SEXUAL ENTITLEMENT", "CRUELTY", "VENGEANCE", "PRIDE &amp; IDOLATRY", "RACISM &amp; CONTEMPT", "DOMINATION"]) {
    assert.match(antiChristHtml, new RegExp(category));
  }
  assert.ok((antiChristHtml.match(/class="anti-category"/g) ?? []).length === 8);
  assert.ok((antiChristHtml.match(/class="anti-case-date"/g) ?? []).length === 40);
  assert.ok((antiChristHtml.match(/class="anti-record-card"/g) ?? []).length === 100);
  assert.doesNotMatch(antiChristHtml, /test-score-badge|\/100/);
});

test("exports all five qualitative review frameworks", () => {
  assertReviewFramework(christianityTestHtml, "christianity", "Christianity Test");
  assertReviewFramework(patrioticTestHtml, "patriotic", "Patriotic Test");
  assertReviewFramework(americaFirstTestHtml, "america-first", "America First Test");
  assertReviewFramework(dealTestHtml, "deal", "Deal Test");
  assertReviewFramework(worldStandingTestHtml, "world-standing", "World Standing Test");

  assert.match(christianityTestHtml, /Truthful witness/);
  assert.match(patrioticTestHtml, /Free elections and transfer/);
  assert.match(americaFirstTestHtml, /Sovereignty without imperialism/);
  assert.match(dealTestHtml, /Beneficiary/);
  assert.match(worldStandingTestHtml, /Strategic advantage/);

  assert.ok((patrioticTestHtml.match(/class="patriotic-record"/g) ?? []).length === 16);
  assert.ok((americaFirstTestHtml.match(/class="patriotic-record test-record"/g) ?? []).length === 14);
  assert.ok((dealTestHtml.match(/class="patriotic-record test-record"/g) ?? []).length === 12);
  assert.ok((worldStandingTestHtml.match(/class="patriotic-record test-record"/g) ?? []).length === 17);
  for (const page of [patrioticTestHtml, americaFirstTestHtml, dealTestHtml, worldStandingTestHtml]) {
    assert.match(page, /Qualitative editorial review/);
    assert.doesNotMatch(page, /test-score-badge|\/100/);
  }
});

test("exports methodology and public accountability policies", () => {
  assert.match(methodologyHtml, /Harsh argument/);
  assert.match(methodologyHtml, /Primary records first/);
  assert.match(methodologyHtml, /Status is part of the fact/);
  assert.match(methodologyHtml, /A citation is not immunity/);
  assert.match(methodologyHtml, /Explain the judgment\. Do not manufacture precision/);
  assert.match(methodologyHtml, /Archive system updated/);
  assert.match(methodologyHtml, /October 7, 2026/);

  assert.match(aboutHtml, /An argument that owes the public a record/);
  assert.match(correctionsHtml, /The record changes\. The history should remain visible/);
  assert.match(correctionsHtml, /Launch gate/);
  assert.match(privacyHtml, /Collect less\. Expose less/);
  assert.match(independenceHtml, /Support may fund the work/);
  assert.match(aiUseHtml, /AI can assist the workflow\. It cannot become the source/);
  assert.match(aiUseHtml, /does not autonomously publish factual records/);
  assert.match(aiUseHtml, /narrow deterministic process may update the What’s New navigation index/);
});

test("uses a consistent header and accountability footer", () => {
  for (const pageHtml of renderedPages) {
    const nav = primaryNavigation(pageHtml);
    for (const label of ["Evidence", "What’s New", "Voices", "Tests", "Methods", "Archive"]) assert.match(nav, new RegExp(`>${label}<`));
    assert.ok((nav.match(/primary-nav__link/g) ?? []).length === 6);
    const labels = [...nav.matchAll(/<span>([^<]+)<\/span>/g)].map((match) => match[1]);
    assert.deepEqual(labels, ["What’s New", "Evidence", "Voices", "Tests", "Methods", "Archive"]);

    const footerMatch = pageHtml.match(/<footer>([\s\S]*?)<\/footer>/);
    assert.ok(footerMatch, "expected the shared footer");
    const footer = footerMatch[1];
    for (const label of ["About", "Methods", "Suggest an incident", "Corrections", "Independence", "AI use", "Privacy"]) assert.match(footer, new RegExp(`>${label}<`));
    assert.match(footer, /class="footer-top" href="#top" aria-label="Back to top">↑<\/a>$/);
  }
});

test("keeps social metadata on public pages", () => {
  for (const pageHtml of renderedPages) {
    assert.match(pageHtml, /property="og:image" content="https:\/\/dtrezise\.github\.io\/TDS\/share-banner\.png"/);
  }
});
