import { readFile, readdir } from "node:fs/promises";

const root = new URL("../research/", import.meta.url);
const files = (await readdir(root)).filter((file) => file.endsWith(".json")).sort();
if (files.length < 3) throw new Error(`Expected three research files; found ${files.length}`);

const ids = new Set();
const titles = new Set();
let itemCount = 0;
let sourceCount = 0;
let singleSourceItems = 0;
const errors = [];

for (const file of files) {
  const payload = JSON.parse(await readFile(new URL(file, root), "utf8"));
  if (!Array.isArray(payload.items) || payload.items.length < 10) {
    errors.push(`${file}: expected at least 10 researched items`);
    continue;
  }

  for (const [index, item] of payload.items.entries()) {
    const ref = `${file}#${index + 1}`;
    itemCount += 1;
    for (const field of ["id", "title", "date_start", "category", "status_label", "summary", "why_it_matters"]) {
      if (!item[field] || typeof item[field] !== "string") errors.push(`${ref}: missing ${field}`);
    }
    if (ids.has(item.id)) errors.push(`${ref}: duplicate id ${item.id}`);
    if (titles.has(item.title)) errors.push(`${ref}: duplicate title ${item.title}`);
    ids.add(item.id);
    titles.add(item.title);

    if (!Array.isArray(item.evidence) || item.evidence.length < 1) {
      errors.push(`${ref}: expected at least one evidence link`);
      continue;
    }
    if (item.evidence.length === 1) singleSourceItems += 1;
    for (const [sourceIndex, source] of item.evidence.entries()) {
      sourceCount += 1;
      const sourceRef = `${ref}.evidence[${sourceIndex}]`;
      for (const field of ["label", "url", "publisher", "source_type"]) {
        if (!source[field] || typeof source[field] !== "string") errors.push(`${sourceRef}: missing ${field}`);
      }
      if (!/^https:\/\//.test(source.url ?? "")) errors.push(`${sourceRef}: URL must use HTTPS`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Research audit passed: ${itemCount} case files, ${sourceCount} evidence links, ${files.length} research lanes, ${singleSourceItems} single-source primary records.`);
}
