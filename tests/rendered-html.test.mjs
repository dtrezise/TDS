import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
const voicesHtml = await readFile(new URL("../out/voices/index.html", import.meta.url), "utf8");
const blindEyesHtml = await readFile(new URL("../out/blind-eyes/index.html", import.meta.url), "utf8");

test("exports the finished evidence archive", () => {
  assert.match(html, /<title>TDS — The Evidence Archive/);
  assert.match(html, /Trump Derangement Syndrome \| The Evidence Archive/);
  assert.match(html, /The derangement is/);
  assert.match(html, /Case files, not catchphrases/);
  assert.match(html, /Christianity test/);
  assert.match(html, /Evidence rules/);
  assert.match(html, /56<!-- --> documented case files|56<\/strong><span>documented case files/);
  assert.match(html, /Record status/);
  assert.match(html, /birthright-citizenship order/i);
  assert.match(html, /Project 2025/);
  assert.match(html, /faith-kirk-memorial-forgiveness-2025/);
  assert.match(html, /forgiveness met Trump/);
  assert.match(html, /The fruit of the Spirit/);
  assert.match(html, /A citation is not immunity/);
  assert.match(html, /EDITORIAL_STANDARDS\.md/);
  assert.match(html, /property="og:image" content="https:\/\/dtrezise\.github\.io\/TDS\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
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
  assert.ok((blindEyesHtml.match(/class="blind-card"/g) ?? []).length === 8, "expected 8 documented Blind Eyes profiles");
});

test("links the archive, Rooftops, and Blind Eyes in both directions", () => {
  assert.match(html, /Rooftops \/ Join/);
  assert.match(html, /Blind Eyes/);
  assert.match(voicesHtml, /Evidence archive/);
  assert.match(voicesHtml, /Blind Eyes/);
  assert.match(blindEyesHtml, /Rooftops/);
  assert.match(blindEyesHtml, /Evidence archive/);
});
