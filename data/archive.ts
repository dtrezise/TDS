import antiChristDirectory from "@/research/anti-christ/directory.json";
import blindEyesDirectory from "@/research/blind-eyes/directory.json";
import voicesDirectory from "@/research/voices/directory.json";
import { caseFiles } from "./cases";

export type ArchiveType = "evidence" | "rooftops" | "blind-eyes" | "anti-christ";

export type ArchiveEntry = {
  id: string;
  type: ArchiveType;
  typeLabel: string;
  title: string;
  summary: string;
  dateDisplay: string;
  dateContext: string;
  sortDate: string | null;
  href: string;
};

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatIsoDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function latestIncidentDate(values: string[]) {
  const dates = values.flatMap((value) => value.match(/\d{4}-\d{2}-\d{2}/g) ?? []);
  return dates.sort().at(-1) ?? null;
}

const evidenceEntries: ArchiveEntry[] = caseFiles.map((item) => ({
  id: `evidence:${item.id}`,
  type: "evidence",
  typeLabel: "Evidence",
  title: item.title,
  summary: item.summary,
  dateDisplay: item.date,
  dateContext: "Incident record",
  sortDate: item.sortDate,
  href: `/evidence/${item.id}/`,
}));

const rooftopVoiceEntries: ArchiveEntry[] = voicesDirectory.voices.map((item, index) => ({
  id: `rooftops:voice:${slug(item.name)}`,
  type: "rooftops",
  typeLabel: "Voices · Rooftops voice",
  title: item.name,
  summary: item.description,
  dateDisplay: "Ongoing public profile",
  dateContext: "No single incident date",
  sortDate: null,
  href: `/rooftops/#rooftops-voice-${slug(item.name) || index + 1}`,
}));

const rooftopMovementEntries: ArchiveEntry[] = voicesDirectory.movements.map((item, index) => ({
  id: `rooftops:movement:${slug(item.name)}`,
  type: "rooftops",
  typeLabel: "Voices · Rooftops organization",
  title: item.name,
  summary: item.description,
  dateDisplay: "Ongoing public profile",
  dateContext: "No single incident date",
  sortDate: null,
  href: `/rooftops/#rooftops-movement-${slug(item.name) || index + 1}`,
}));

const blindEyesEntries: ArchiveEntry[] = blindEyesDirectory.profiles.map((item) => {
  const incidentDate = latestIncidentDate(item.evidence.map((evidence) => evidence.date));
  return {
    id: `blind-eyes:${item.id}`,
    type: "blind-eyes",
    typeLabel: "Voices · Blind Eyes profile",
    title: item.name,
    summary: item.summary,
    dateDisplay: incidentDate ? formatIsoDate(incidentDate) : "Date not established",
    dateContext: "Latest documented incident",
    sortDate: incidentDate,
    href: `/blind-eyes/#${item.id}`,
  };
});

type DatedRecord = { id: string; date: string; sortDate: string };
const datedRecords = new Map<string, DatedRecord>([
  ...caseFiles.map((item) => [item.id, item] as const),
  ...antiChristDirectory.standalone_cases.map((item) => [item.id, item] as const),
]);

const antiChristEntries: ArchiveEntry[] = antiChristDirectory.categories.map((item) => {
  const latest = item.all_case_ids
    .map((id) => datedRecords.get(id))
    .filter((record): record is DatedRecord => Boolean(record))
    .sort((left, right) => right.sortDate.localeCompare(left.sortDate))[0];
  return {
    id: `anti-christ:${item.id}`,
    type: "anti-christ",
    typeLabel: "Voices · Anti Christ collection",
    title: item.label,
    summary: item.description,
    dateDisplay: latest?.date ?? "Date not established",
    dateContext: "Latest included incident",
    sortDate: latest?.sortDate ?? null,
    href: `/anti-christ/#${item.id}`,
  };
});

export const archiveEntries: ArchiveEntry[] = [
  ...evidenceEntries,
  ...blindEyesEntries,
  ...antiChristEntries,
  ...rooftopVoiceEntries,
  ...rooftopMovementEntries,
].sort((left, right) => {
  if (left.sortDate && right.sortDate) return right.sortDate.localeCompare(left.sortDate) || left.title.localeCompare(right.title);
  if (left.sortDate) return -1;
  if (right.sortDate) return 1;
  return left.typeLabel.localeCompare(right.typeLabel) || left.title.localeCompare(right.title);
});

export const archiveCounts = {
  all: archiveEntries.length,
  evidence: evidenceEntries.length,
  rooftops: rooftopVoiceEntries.length + rooftopMovementEntries.length,
  "blind-eyes": blindEyesEntries.length,
  "anti-christ": antiChristEntries.length,
};
