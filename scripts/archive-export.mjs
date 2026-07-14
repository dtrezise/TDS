import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildArchiveExport, toD1Sql, validateArchiveExport } from "./lib/archive-export.mjs";

function valueAfter(flag) {
  const direct = process.argv.find((argument) => argument.startsWith(`${flag}=`));
  if (direct) return direct.slice(flag.length + 1);
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const outputPath = valueAfter("--output");
const sqlOutputPath = valueAfter("--sql-output");
const sourceCommit = valueAfter("--commit") ?? null;
const archive = await buildArchiveExport({ sourceCommit });
const errors = validateArchiveExport(archive);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  if (outputPath) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(archive, null, 2)}\n`);
  }
  if (sqlOutputPath) {
    await mkdir(path.dirname(sqlOutputPath), { recursive: true });
    await writeFile(sqlOutputPath, toD1Sql(archive));
  }
  console.log(
    `Archive portability audit passed: ${archive.counts.cases} canonical cases, ${archive.counts.claims} claims, ${archive.counts.sources} unique sources, ${archive.counts.claim_sources} claim-source citations.`,
  );
}
