import blindEyesDirectory from "@/research/blind-eyes/directory.json";
import voicesDirectory from "@/research/voices/directory.json";
import ledger from "@/research/whats-new.json";
import { caseFiles } from "./cases";

export type WhatsNewSection = "evidence" | "voices";
export type WhatsNewChange = "added" | "updated";

type RawEntry = {
  id: string;
  published_on: string;
  section: WhatsNewSection;
  change: WhatsNewChange;
  ref_type: "case" | "rooftops_voice" | "rooftops_movement" | "blind_profile" | "manual";
  ref: string;
  title?: string;
  summary?: string;
  label?: string;
  status?: string;
  href?: string;
};

export type WhatsNewEntry = {
  id: string;
  publishedOn: string;
  expiresOn: string;
  section: WhatsNewSection;
  change: WhatsNewChange;
  title: string;
  summary: string;
  label: string;
  status: string;
  href: string;
};

const caseById = new Map(caseFiles.map((item) => [item.id, item]));
const voiceByName = new Map(voicesDirectory.voices.map((item) => [item.name, item]));
const movementByName = new Map(voicesDirectory.movements.map((item) => [item.name, item]));
const blindProfileById = new Map(blindEyesDirectory.profiles.map((item) => [item.id, item]));

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function utcDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function addUtcDays(value: string, days: number) {
  return new Date(utcDay(value) + days * 86_400_000).toISOString().slice(0, 10);
}

export function isInsideWhatsNewWindow(publishedOn: string, asOf: string, windowDays = ledger.window_days) {
  const ageInDays = Math.floor((utcDay(asOf) - utcDay(publishedOn)) / 86_400_000);
  return ageInDays >= 0 && ageInDays < windowDays;
}

function changeTitle(change: WhatsNewChange, added: string, updated: string) {
  return change === "added" ? added : updated;
}

function resolveEntry(raw: RawEntry): WhatsNewEntry {
  const base = {
    id: raw.id,
    publishedOn: raw.published_on,
    expiresOn: addUtcDays(raw.published_on, ledger.window_days),
    section: raw.section,
    change: raw.change,
  };

  if (raw.ref_type === "case") {
    const item = caseById.get(raw.ref);
    if (!item) throw new Error(`What's New references missing evidence case: ${raw.ref}`);
    return {
      ...base,
      title: changeTitle(raw.change, item.title, `Updated: ${item.title}`),
      summary: item.summary,
      label: `Evidence · ${item.category}`,
      status: item.status,
      href: `/evidence/${item.id}/`,
    };
  }

  if (raw.ref_type === "rooftops_voice") {
    const item = voiceByName.get(raw.ref);
    if (!item) throw new Error(`What's New references missing Rooftops voice: ${raw.ref}`);
    return {
      ...base,
      title: changeTitle(raw.change, `New Rooftops voice: ${item.name}`, `Updated Rooftops profile: ${item.name}`),
      summary: item.description,
      label: "Voices · Rooftops",
      status: item.role,
      href: `/rooftops/#rooftops-voice-${slug(item.name)}`,
    };
  }

  if (raw.ref_type === "rooftops_movement") {
    const item = movementByName.get(raw.ref);
    if (!item) throw new Error(`What's New references missing Rooftops movement: ${raw.ref}`);
    return {
      ...base,
      title: changeTitle(raw.change, `New Rooftops organization: ${item.name}`, `Updated Rooftops organization: ${item.name}`),
      summary: item.description,
      label: "Voices · Rooftops",
      status: item.kind,
      href: `/rooftops/#rooftops-movement-${slug(item.name)}`,
    };
  }

  if (raw.ref_type === "blind_profile") {
    const item = blindProfileById.get(raw.ref);
    if (!item) throw new Error(`What's New references missing Blind Eyes profile: ${raw.ref}`);
    return {
      ...base,
      title: changeTitle(raw.change, `New Blind Eyes profile: ${item.name}`, `Updated Blind Eyes profile: ${item.name}`),
      summary: item.summary,
      label: "Voices · Blind Eyes",
      status: `${item.alignment} · ${item.alignment_strength}`,
      href: `/blind-eyes/#${item.id}`,
    };
  }

  if (!raw.title || !raw.summary || !raw.label || !raw.status || !raw.href) {
    throw new Error(`What's New manual entry is incomplete: ${raw.id}`);
  }
  return {
    ...base,
    title: raw.title,
    summary: raw.summary,
    label: raw.label,
    status: raw.status,
    href: raw.href,
  };
}

export const whatsNewWindowDays = ledger.window_days;
export const whatsNewLastReconciled = ledger.last_reconciled;
export const whatsNewEditorialNote = ledger.editorial_note;
export const whatsNewEntries = (ledger.entries as RawEntry[])
  .map(resolveEntry)
  .sort((left, right) => right.publishedOn.localeCompare(left.publishedOn) || left.title.localeCompare(right.title));

export function activeWhatsNewEntries(asOf: string) {
  return whatsNewEntries.filter((item) => isInsideWhatsNewWindow(item.publishedOn, asOf));
}
