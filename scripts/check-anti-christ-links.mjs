import { readFile } from "node:fs/promises";

const directory = JSON.parse(await readFile(new URL("../research/anti-christ/directory.json", import.meta.url), "utf8"));
const urls = new Set([directory.scripture.url]);

for (const item of directory.standalone_cases) {
  for (const source of item.sources) urls.add(source.url);
  for (const teaching of item.faithLens ?? []) urls.add(teaching.url);
}

for (const item of directory.recorded_words) urls.add(item.url);
for (const category of directory.categories) urls.add(category.teaching.url);

const queue = [...urls];
const results = [];

async function check(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TDS-Evidence-Archive/1.0; anti-christ-link-audit)",
        Range: "bytes=0-1023",
      },
      signal: AbortSignal.timeout(15_000),
    });
    const result = { url, status: response.status, finalUrl: response.url };
    await response.body?.cancel();
    return result;
  } catch (error) {
    return { url, status: 0, error: error instanceof Error ? error.message : String(error) };
  }
}

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (url) results.push(await check(url));
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));

const restricted = results.filter((result) => [401, 403, 429].includes(result.status));
const failed = results.filter((result) => result.status === 0 || (result.status >= 400 && ![401, 403, 429].includes(result.status)));

for (const result of [...failed, ...restricted]) {
  const label = result.status === 0 ? "ERR" : String(result.status);
  console.log(`${label}\t${result.url}${result.error ? `\t${result.error}` : ""}`);
}

console.log(`Checked ${results.length} Anti Christ links: ${results.length - failed.length - restricted.length} reachable, ${restricted.length} access-restricted, ${failed.length} failed.`);
if (failed.length) process.exitCode = 1;
