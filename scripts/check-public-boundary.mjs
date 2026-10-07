import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean);

const forbiddenExact = new Set([
  "docs/EDITORIAL_REVIEW_LOG.md",
]);

const forbiddenPrefixes = [
  "private/",
  "output/",
  "outputs/",
  ".env",
  ".wrangler/",
];

const violations = tracked.filter((file) =>
  existsSync(file) && (forbiddenExact.has(file) || forbiddenPrefixes.some((prefix) => file === prefix.slice(0, -1) || file.startsWith(prefix))),
);

if (violations.length) {
  console.error("Public-boundary audit failed. Remove private or generated files from Git:");
  for (const file of violations) console.error(`- ${file}`);
  process.exit(1);
}

console.log(`Public-boundary audit passed for ${tracked.length} tracked files.`);
