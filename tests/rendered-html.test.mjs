import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
const voicesHtml = await readFile(new URL("../out/voices/index.html", import.meta.url), "utf8");
const blindEyesHtml = await readFile(new URL("../out/blind-eyes/index.html", import.meta.url), "utf8");
const antiChristHtml = await readFile(new URL("../out/anti-christ/index.html", import.meta.url), "utf8");
const christianityTestHtml = await readFile(new URL("../out/christianity-test/index.html", import.meta.url), "utf8");
const patrioticTestHtml = await readFile(new URL("../out/patriotic-test/index.html", import.meta.url), "utf8");
const methodologyHtml = await readFile(new URL("../out/methodology/index.html", import.meta.url), "utf8");

const renderedPages = [html, voicesHtml, blindEyesHtml, antiChristHtml, christianityTestHtml, patrioticTestHtml, methodologyHtml];

function primaryNavigation(pageHtml) {
  const match = pageHtml.match(/<nav aria-label="Primary navigation">([\s\S]*?)<\/nav>/);
  assert.ok(match, "expected the shared primary navigation");
  return match[1];
}

test("exports the finished evidence archive", () => {
  assert.match(html, /<title>TDS — The Evidence Archive/);
  assert.match(html, /Trump Derangement Syndrome \| The Evidence Archive/);
  assert.match(html, /DERANGEMENT/);
  assert.match(html, /denying the record/);
  assert.match(html, /Accountability is not derangement\. Refusing the record is\./);
  assert.match(html, /How much verified misconduct must be ignored, excused, or celebrated to keep believing the myth\?/);
  assert.doesNotMatch(html, /usually deployed to dismiss critics/);
  assert.match(html, /Case files, not catchphrases/);
  assert.match(html, /Christianity test/);
  assert.match(html, /Apply the Patriotic Test/);
  assert.match(html, /Read our evidence rules/);
  assert.match(html, /56<!-- --> documented case files|56<\/strong><span>documented case files/);
  assert.match(html, /Record status/);
  assert.match(html, /birthright-citizenship order/i);
  assert.match(html, /Project 2025/);
  assert.match(html, /faith-kirk-memorial-forgiveness-2025/);
  assert.match(html, /forgiveness met Trump/);
  assert.match(html, /evidence-hero\.jpg/);
  assert.match(html, /property="og:image" content="https:\/\/dtrezise\.github\.io\/TDS\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(html, /The central contradiction/);
  assert.doesNotMatch(html, /Six non-negotiable rules/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the case-level Christianity Tests visible", () => {
  assert.ok((html.match(/class="faith-note"/g) ?? []).length === 21, "expected 21 visible Christianity Tests");
  assert.ok((html.match(/faith-note__label">Christianity test/g) ?? []).length === 21, "expected every test to keep its visible label");
  assert.doesNotMatch(html, /<details class="faith-note"/);
});

test("exports accessible archive controls", () => {
  assert.match(html, /aria-label="Evidence filters"/);
  assert.match(html, /type="search"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.ok((html.match(/target="_blank"/g) ?? []).length > 150, "expected the evidence and teaching links to render");
});

test("exports the Christian resistance directory", () => {
  assert.match(voicesHtml, /<title>Shout It from the Rooftops \| TDS/);
  assert.match(voicesHtml, /A directory for Christian resistance/);
  assert.match(voicesHtml, /Proclaim it on the housetops/);
  assert.match(voicesHtml, /Matthew 10:27/);
  assert.match(voicesHtml, /Christians Against Christian Nationalism/);
  assert.match(voicesHtml, /Amanda Tyler/);
  assert.match(voicesHtml, /William J\. Barber II/);
  assert.match(voicesHtml, /Russell Moore/);
  assert.match(voicesHtml, /Jemar Tisby/);
  assert.match(voicesHtml, /Kristin Kobes Du Mez/);
  assert.match(voicesHtml, /Brian Kaylor/);
  assert.match(voicesHtml, /Basis for inclusion|Source for this description/);
  assert.match(voicesHtml, /bsky\.app\/intent\/compose/);
  assert.match(voicesHtml, /facebook\.com\/sharer\/sharer\.php/);
  assert.match(voicesHtml, /mailto:/);
  assert.match(voicesHtml, /aria-live="polite"/);
  assert.match(voicesHtml, /application\/ld\+json/);
  assert.match(voicesHtml, /rooftops-hero\.jpg/);
  assert.ok((voicesHtml.match(/class="voice-card"/g) ?? []).length === 12, "expected 12 curated voice profiles");
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
});

test("exports the Christianity Test framework and collection hub", () => {
  assert.match(christianityTestHtml, /<title>Christianity Test \| TDS/);
  assert.match(christianityTestHtml, /christianity-test-hero\.jpg/);
  assert.match(christianityTestHtml, /Test the public witness by the public record/);
  assert.match(christianityTestHtml, /Conduct\. Teaching\. Comparison\./);
  assert.match(christianityTestHtml, /Truth, not false witness/);
  assert.match(christianityTestHtml, /Do not steal; steward faithfully/);
  assert.match(christianityTestHtml, /Fidelity, not adultery/);
  assert.match(christianityTestHtml, /Mercy and forgiveness/);
  assert.match(christianityTestHtml, /The fruit of the Spirit/);
  assert.match(christianityTestHtml, /Welcome the stranger; serve the poor/);
  assert.match(christianityTestHtml, /Rooftops/);
  assert.match(christianityTestHtml, /Blind Eyes/);
  assert.match(christianityTestHtml, /Anti Christ/);
  assert.match(christianityTestHtml, /faith-framework__grid"><article>/);
});

test("exports the Patriotic Test framework and evidence record", () => {
  assert.match(patrioticTestHtml, /<title>Patriotic Test \| TDS/);
  assert.match(patrioticTestHtml, /patriotic-test-hero\.jpg/);
  assert.match(patrioticTestHtml, /A patriot owes loyalty to the Constitution/);
  assert.match(patrioticTestHtml, /A loyalist asks what serves the leader/);
  assert.match(patrioticTestHtml, /The leader above the law/);
  assert.match(patrioticTestHtml, /The Constitution above the leader/);
  assert.match(patrioticTestHtml, /Free elections and peaceful transfer/);
  assert.match(patrioticTestHtml, /Rule of law, accurately stated/);
  assert.match(patrioticTestHtml, /Checks, balances, and independent oversight/);
  assert.match(patrioticTestHtml, /Free speech, press, assembly, and petition/);
  assert.match(patrioticTestHtml, /Equal citizenship and due process/);
  assert.match(patrioticTestHtml, /Public office, not private benefit/);
  assert.match(patrioticTestHtml, /Lawful power is still answerable/);
  assert.match(patrioticTestHtml, /Power must yield to elections/);
  assert.match(patrioticTestHtml, /The executive must obey law and oversight/);
  assert.match(patrioticTestHtml, /Office is a trust, not a personal weapon/);
  assert.match(patrioticTestHtml, /A free press is not a presidential favor/);
  assert.match(patrioticTestHtml, /election-subversion-january-6-report/);
  assert.match(patrioticTestHtml, /gop-election-certification-objections/);
  assert.match(patrioticTestHtml, /Completed lawful exercise of presidential clemency/);
  assert.match(patrioticTestHtml, /District-court preliminary injunction; appellate panel stayed relief for restricted presidential spaces but not the East Room/);
  assert.match(patrioticTestHtml, /USCOURTS-dcd-1_25-cv-00532-0/);
  assert.match(patrioticTestHtml, /25-5109LDSN3\.pdf/);
  assert.match(patrioticTestHtml, /Patriotism is not a shortcut around proof/);
  assert.ok((patrioticTestHtml.match(/class="patriotic-record"/g) ?? []).length === 12, "expected 11 archive records and one press-access record");
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

test("uses one uncluttered four-section header on every page", () => {
  for (const pageHtml of renderedPages) {
    const nav = primaryNavigation(pageHtml);
    assert.match(nav, />Evidence</);
    assert.match(nav, />Christianity Test</);
    assert.match(nav, />Patriotic Test</);
    assert.match(nav, />Methodology</);
    assert.doesNotMatch(nav, /Anti Christ|Blind Eyes|Rooftops|Categories|Take action|Profiles|Full record/);
    assert.ok((nav.match(/primary-nav__link/g) ?? []).length === 4, "expected exactly four primary links");
  }

  assert.match(christianityTestHtml, /href="\/voices\/"/);
  assert.match(christianityTestHtml, /href="\/blind-eyes\/"/);
  assert.match(christianityTestHtml, /href="\/anti-christ\/"/);
  assert.match(voicesHtml, /href="\/christianity-test\/"/);
  assert.match(blindEyesHtml, /href="\/christianity-test\/"/);
  assert.match(antiChristHtml, /href="\/christianity-test\/"/);
  assert.match(html, /href="\/patriotic-test\/"/);
});
