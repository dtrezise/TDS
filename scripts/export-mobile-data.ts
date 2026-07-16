import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCaseTestLenses } from "../data/case-test-lenses";
import { caseFiles, categories, lastReviewed } from "../data/cases";
import { scoreCaseAgainstRubric } from "../data/test-rubrics";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "ios", "TDSArchive", "TDSArchive", "Resources", "archive.json");

const mobileCases = caseFiles.map((item) => {
  const christianity = item.faithLens?.length
    ? [{
        id: "christianity",
        label: "Christianity Test",
        href: "/christianity-test#christianity-scorecard",
        finding: "Fails",
        analysis: item.faithAnalysis ?? "The cited teaching is compared with the documented public record.",
        score: scoreCaseAgainstRubric(item, "christianity", "Fails"),
      }]
    : [];

  return {
    ...item,
    tests: [...christianity, ...buildCaseTestLenses(item)],
  };
});

const payload = {
  schemaVersion: 1,
  lastReviewed,
  generatedFrom: "TDS canonical research and rubric data",
  categories: categories.filter((category) => category !== "All evidence"),
  cases: mobileCases,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${mobileCases.length} mobile case files to ${path.relative(projectRoot, outputPath)}.`);
