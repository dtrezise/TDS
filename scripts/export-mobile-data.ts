import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCaseTestLenses } from "../data/case-test-lenses";
import { caseFiles, categories, lastReviewed } from "../data/cases";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "ios", "TDSArchive", "TDSArchive", "Resources", "archive.json");

const mobileCases = caseFiles.map((item) => {
  const christianity = item.faithLens?.length
    ? [{
        id: "christianity",
        label: "Christianity Test",
        href: "/christianity-test/#christianity-scorecard",
        finding: "Applies for review",
        analysis: item.faithAnalysis ?? "The cited teaching is compared with the documented public record.",
      }]
    : [];

  return {
    ...item,
    tests: [...christianity, ...buildCaseTestLenses(item)],
  };
});

const payload = {
  schemaVersion: 2,
  lastReviewed,
  generatedFrom: "TDS canonical research and qualitative review data",
  categories: categories.filter((category) => category !== "All evidence"),
  cases: mobileCases,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${mobileCases.length} mobile case files to ${path.relative(projectRoot, outputPath)}.`);
