#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { newYorkIsoDate, slug, stableHash } from "./whats-new-lib.mjs";

const root = process.cwd();
const ledgerPath = "research/whats-new.json";
const evidencePaths = [
  "research/legal_power.json",
  "research/conduct_family.json",
  "research/faith_movements.json",
  "research/america_first.json",
  "research/deal_record.json",
  "research/scope_expansion.json",
];
const voicePaths = [
  "research/voices/directory.json",
  "research/blind-eyes/directory.json",
  "research/anti-christ/directory.json",
];
const publicSourcePaths = [...evidencePaths, ...voicePaths];
const duplicateConductIds = new Set([
  "e-jean-carroll-liability",
  "new-york-civil-fraud",
  "trump-foundation-misuse",
  "foreign-government-payments-presidency",
]);

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const initialize = process.argv.includes("--initialize");
const checkOnly = process.argv.includes("--check");
const asOf = argument("--as-of") ?? newYorkIsoDate();

if (initialize && checkOnly) throw new Error("Use either --initialize or --check, not both.");
if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) throw new Error(`--as-of must be YYYY-MM-DD; received ${asOf}`);

async function json(path) {
  return JSON.parse(await readFile(resolve(root, path), "utf8"));
}

function assertCommittedPublicInputs() {
  const dirty = execFileSync("git", ["status", "--porcelain", "--", ...publicSourcePaths], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  if (dirty) {
    throw new Error(
      "Refusing to reconcile What’s New from uncommitted public source data. Review and commit the Evidence/Voices changes first.\n" + dirty,
    );
  }
}

function catalogItem(hashInput, entry) {
  return { hash: stableHash(hashInput), entry };
}

async function buildCatalog() {
  const catalog = new Map();
  for (const path of evidencePaths) {
    const bundle = await json(path);
    for (const item of bundle.items) {
      if (path.endsWith("conduct_family.json") && duplicateConductIds.has(item.id)) continue;
      const key = `evidence:${item.id}`;
      catalog.set(key, catalogItem(item, {
        section: "evidence",
        ref_type: "case",
        ref: item.id,
      }));
    }
  }

  const rooftops = await json("research/voices/directory.json");
  for (const item of rooftops.voices) {
    const key = `voices:rooftops:voice:${slug(item.name)}`;
    catalog.set(key, catalogItem(item, {
      section: "voices",
      ref_type: "rooftops_voice",
      ref: item.name,
    }));
  }
  for (const item of rooftops.movements) {
    const key = `voices:rooftops:movement:${slug(item.name)}`;
    catalog.set(key, catalogItem(item, {
      section: "voices",
      ref_type: "rooftops_movement",
      ref: item.name,
    }));
  }

  const blindEyes = await json("research/blind-eyes/directory.json");
  for (const item of blindEyes.profiles) {
    const key = `voices:blind-eyes:${item.id}`;
    catalog.set(key, catalogItem(item, {
      section: "voices",
      ref_type: "blind_profile",
      ref: item.id,
    }));
  }

  const antiChrist = await json("research/anti-christ/directory.json");
  const antiChristIndex = {
    categories: antiChrist.categories,
    recorded_words: antiChrist.recorded_words,
    standalone_cases: antiChrist.standalone_cases,
  };
  const placements = antiChrist.categories.reduce((count, category) => count + category.all_case_ids.length, 0);
  catalog.set("voices:anti-christ:collection", catalogItem(antiChristIndex, {
    section: "voices",
    ref_type: "manual",
    ref: "anti-christ-collection",
    title: "Anti Christ collection materially updated",
    summary: `The teaching-based comparison now contains ${placements} categorized record placements across ${antiChrist.categories.length} moral categories.`,
    label: "Voices · Anti Christ",
    status: `${antiChrist.categories.length} moral categories · ${placements} record placements`,
    href: "/anti-christ/",
  }));

  return catalog;
}

function snapshotFor(catalog) {
  return Object.fromEntries([...catalog.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([key, value]) => [key, value.hash]));
}

function pendingChanges(catalog, snapshot) {
  const pending = [];
  for (const [key, item] of catalog) {
    if (!snapshot[key]) pending.push({ key, change: "added", ...item.entry });
    else if (snapshot[key] !== item.hash) pending.push({ key, change: "updated", ...item.entry });
  }
  return pending.sort((left, right) => left.key.localeCompare(right.key));
}

assertCommittedPublicInputs();
const ledger = await json(ledgerPath);
const catalog = await buildCatalog();
const nextSnapshot = snapshotFor(catalog);

if (initialize) {
  ledger.catalog_snapshot = nextSnapshot;
  ledger.last_reconciled = asOf;
  await writeFile(resolve(root, ledgerPath), `${JSON.stringify(ledger, null, 2)}\n`);
  console.log(`Initialized What’s New snapshot with ${catalog.size} approved public records; preserved ${ledger.entries.length} feed entries.`);
  process.exit(0);
}

if (!ledger.catalog_snapshot || Object.keys(ledger.catalog_snapshot).length === 0) {
  throw new Error("What’s New has no catalog snapshot. Run this script once with --initialize after editorial review.");
}

const pending = pendingChanges(catalog, ledger.catalog_snapshot);
const removed = Object.keys(ledger.catalog_snapshot).filter((key) => !catalog.has(key));

if (checkOnly) {
  if (pending.length || removed.length) {
    console.error(`What’s New is stale: ${pending.length} added/updated and ${removed.length} removed catalog records await reconciliation.`);
    process.exit(1);
  }
  console.log(`What’s New catalog is synchronized across ${catalog.size} approved public records.`);
  process.exit(0);
}

if (!pending.length && !removed.length) {
  console.log("No reviewed public changes to add to What’s New.");
  process.exit(0);
}

const existingIds = new Set(ledger.entries.map((entry) => entry.id));
for (const item of pending) {
  const id = `${item.key}:${asOf}`;
  if (existingIds.has(id)) continue;
  const entry = { ...item };
  delete entry.key;
  ledger.entries.push({ id, published_on: asOf, ...entry });
  existingIds.add(id);
}
ledger.catalog_snapshot = nextSnapshot;
ledger.last_reconciled = asOf;
await writeFile(resolve(root, ledgerPath), `${JSON.stringify(ledger, null, 2)}\n`);
console.log(`Reconciled What’s New: ${pending.length} added/updated, ${removed.length} removed from the catalog, ${ledger.entries.length} historical feed entries retained.`);
