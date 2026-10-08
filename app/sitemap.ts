import type { MetadataRoute } from "next";
import { caseFiles } from "@/data/cases";

const base = "https://dtrezise.github.io/TDS";
export const dynamic = "force-static";
const staticPaths = [
  "",
  "/whats-new",
  "/voices",
  "/rooftops",
  "/blind-eyes",
  "/anti-christ",
  "/tests",
  "/christianity-test",
  "/patriotic-test",
  "/america-first-test",
  "/deal-test",
  "/world-standing-test",
  "/methodology",
  "/about",
  "/corrections",
  "/editorial-independence",
  "/ai-use",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}/`,
    changeFrequency: path === "" || path === "/whats-new" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/whats-new" ? 0.9 : 0.7,
  }));
  const evidenceEntries: MetadataRoute.Sitemap = caseFiles.map((item) => ({
    url: `${base}/evidence/${item.id}/`,
    lastModified: new Date(`${item.lastSourceCheck}T00:00:00Z`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return [...staticEntries, ...evidenceEntries];
}
