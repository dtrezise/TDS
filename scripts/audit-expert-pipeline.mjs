import { readFile } from "node:fs/promises";

const requireRegistry = process.argv.includes("--require");
const registryUrl = new URL("../private/expert-interviews/expert-registry.json", import.meta.url);
const researchRoot = new URL("../research/", import.meta.url);
const researchFiles = [
  ["legal_power.json", "legal"],
  ["conduct_family.json", "conduct"],
  ["faith_movements.json", "faith"],
  ["america_first.json", "america"],
  ["deal_record.json", "deal"],
];
const duplicateConductIds = new Set([
  "e-jean-carroll-liability",
  "new-york-civil-fraud",
  "trump-foundation-misuse",
  "foreign-government-payments-presidency",
]);

async function readJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

let registry;
try {
  registry = await readJson(registryUrl);
} catch (error) {
  if (error?.code === "ENOENT" && !requireRegistry) {
    console.log("Private expert registry is not present; public-tree privacy check passed.");
    process.exit(0);
  }
  if (error?.code === "ENOENT") {
    console.error("Missing private/expert-interviews/expert-registry.json. Restore the private editorial registry before running the required audit.");
    process.exit(1);
  }
  throw error;
}

const canonicalCases = [];
for (const [file, lane] of researchFiles) {
  const payload = await readJson(new URL(file, researchRoot));
  for (const item of payload.items ?? []) {
    if (lane === "conduct" && duplicateConductIds.has(item.id)) continue;
    canonicalCases.push({ id: item.id, title: item.title, lane });
  }
}

const errors = [];
const caseIds = new Set(canonicalCases.map((item) => item.id));
const expertIds = new Set();
const registryCases = new Map();
const assignmentsByCase = new Map();

for (const expert of registry.experts ?? []) {
  if (expertIds.has(expert.expert_id)) errors.push(`Duplicate expert ID: ${expert.expert_id}`);
  expertIds.add(expert.expert_id);
  if (!/^https:\/\//.test(expert.profile_url ?? "")) errors.push(`${expert.expert_id}: profile_url must use HTTPS`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expert.verified_on ?? "")) errors.push(`${expert.expert_id}: verified_on must be an ISO date`);
  if (expert.contact_route_url && !/^https:\/\//.test(expert.contact_route_url)) errors.push(`${expert.expert_id}: contact route must use HTTPS`);
}

for (const item of registry.cases ?? []) {
  if (registryCases.has(item.case_id)) errors.push(`Duplicate eBox brief: ${item.case_id}`);
  registryCases.set(item.case_id, item);
  if (!caseIds.has(item.case_id)) errors.push(`Unknown eBox brief: ${item.case_id}`);
  if (!Array.isArray(item.expert_domains) || item.expert_domains.length < 1) errors.push(`${item.case_id}: missing expert domains`);
  if (!Array.isArray(item.interview_questions) || item.interview_questions.length < 3) errors.push(`${item.case_id}: fewer than three interview questions`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.last_reviewed ?? "")) errors.push(`${item.case_id}: invalid review date`);
}

for (const item of canonicalCases) {
  const brief = registryCases.get(item.id);
  if (!brief) errors.push(`Missing eBox expert brief: ${item.id}`);
  else {
    if (brief.title !== item.title) errors.push(`${item.id}: private title is out of sync with canonical research`);
    if (brief.lane !== item.lane) errors.push(`${item.id}: private lane is ${brief.lane}; expected ${item.lane}`);
  }
}

for (const assignment of registry.assignments ?? []) {
  if (!caseIds.has(assignment.case_id)) errors.push(`${assignment.assignment_id}: unknown case ${assignment.case_id}`);
  if (!expertIds.has(assignment.expert_id)) errors.push(`${assignment.assignment_id}: unknown expert ${assignment.expert_id}`);
  const key = `${assignment.case_id}\u001f${assignment.expert_id}`;
  const list = assignmentsByCase.get(assignment.case_id) ?? [];
  if (list.some((item) => `${item.case_id}\u001f${item.expert_id}` === key)) errors.push(`Duplicate assignment: ${key}`);
  list.push(assignment);
  assignmentsByCase.set(assignment.case_id, list);
}

for (const item of canonicalCases) {
  const candidates = (assignmentsByCase.get(item.id) ?? []).filter((assignment) => ["Candidate", "Alternate"].includes(assignment.status));
  const verified = candidates.filter((assignment) => registry.experts.find((expert) => expert.expert_id === assignment.expert_id)?.status === "Verified candidate");
  if (verified.length < 2) errors.push(`${item.id}: requires at least two verified candidate assignments; found ${verified.length}`);
}

for (const outreach of registry.outreach ?? []) {
  if (!caseIds.has(outreach.case_id)) errors.push(`${outreach.outreach_id}: unknown case ${outreach.case_id}`);
  if (!expertIds.has(outreach.expert_id)) errors.push(`${outreach.outreach_id}: unknown expert ${outreach.expert_id}`);
  if (outreach.dan_approval?.approved !== true || !outreach.dan_approval?.approved_on || !outreach.dan_approval?.scope) {
    errors.push(`${outreach.outreach_id}: outreach is blocked without explicit scoped Dan approval`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Expert pipeline audit passed: ${canonicalCases.length} eBoxes, ${expertIds.size} candidates, ${registry.assignments.length} assignments, ${registry.outreach.length} outreach records.`);
