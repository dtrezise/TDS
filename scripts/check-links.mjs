import { readFile, readdir } from "node:fs/promises";

const researchRoot = new URL("../research/", import.meta.url);
const files = (await readdir(researchRoot)).filter((file) => file.endsWith(".json"));
const urls = new Set();

for (const file of files) {
  const bundle = JSON.parse(await readFile(new URL(file, researchRoot), "utf8"));
  for (const item of bundle.items) {
    for (const source of item.evidence ?? []) urls.add(source.url);
    for (const teaching of item.christian_teaching ?? []) urls.add(teaching.url);
  }
}

const queue = [...urls];
const results = [];
const workerCount = 12;

async function checkOnce(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TDS-Evidence-Archive/1.0; link-audit)",
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

async function check(url) {
  const first = await checkOnce(url);
  if (first.status !== 0 && first.status < 500) return first;
  return checkOnce(url);
}

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (url) results.push(await check(url));
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

// Some evidence hosts block automated audits or terminate the TLS handshake at
// their edge even though the same public URL remains usable in a browser.
const accessRestrictedStatuses = [401, 403, 429, 525];
const restricted = results.filter((result) => accessRestrictedStatuses.includes(result.status));
const failed = results.filter((result) => result.status === 0 || (result.status >= 400 && !accessRestrictedStatuses.includes(result.status)));

for (const result of [...failed, ...restricted]) {
  const label = result.status === 0 ? "ERR" : String(result.status);
  console.log(`${label}\t${result.url}${result.error ? `\t${result.error}` : ""}`);
}

console.log(`Checked ${results.length} unique links: ${results.length - failed.length - restricted.length} reachable, ${restricted.length} access-restricted, ${failed.length} failed.`);
if (failed.length) process.exitCode = 1;
