import { createHash } from "node:crypto";

export const DAY_MS = 86_400_000;

export function utcDay(value) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) throw new Error(`Invalid ISO date: ${value}`);
  return Date.UTC(year, month - 1, day);
}

export function addUtcDays(value, days) {
  return new Date(utcDay(value) + days * DAY_MS).toISOString().slice(0, 10);
}

export function isInsideWindow(publishedOn, asOf, windowDays) {
  const age = Math.floor((utcDay(asOf) - utcDay(publishedOn)) / DAY_MS);
  return age >= 0 && age < windowDays;
}

function sortedValue(value) {
  if (Array.isArray(value)) return value.map(sortedValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortedValue(value[key])]));
  }
  return value;
}

export function stableHash(value) {
  return createHash("sha256").update(JSON.stringify(sortedValue(value))).digest("hex");
}

export function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function newYorkIsoDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}
