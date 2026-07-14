import directory from "@/research/anti-christ/directory.json";
import { caseFiles, type CaseFile, type EvidenceSource } from "./cases";

type RawStandaloneCase = (typeof directory.standalone_cases)[number];

export type AntiChristQuote = (typeof directory.recorded_words)[number];

export type AntiChristCategory = {
  id: string;
  label: string;
  title: string;
  description: string;
  theologicalCaution: string;
  teaching: {
    reference: string;
    principle: string;
    url: string;
  };
  featuredCases: CaseFile[];
  allCases: CaseFile[];
};

function normalizeStandaloneCase(item: RawStandaloneCase): CaseFile {
  return {
    ...item,
    category: item.category as CaseFile["category"],
    sources: item.sources.map((source) => ({
      ...source,
      kind: source.kind as EvidenceSource["kind"],
    })),
  };
}

export const antiChristStandaloneCases = directory.standalone_cases.map(normalizeStandaloneCase);
export const antiChristCases = [...caseFiles, ...antiChristStandaloneCases];

const caseById = new Map(antiChristCases.map((item) => [item.id, item]));

function resolveCase(id: string) {
  const item = caseById.get(id);
  if (!item) throw new Error(`Anti Christ directory references missing case: ${id}`);
  return item;
}

export const antiChristCategories: AntiChristCategory[] = directory.categories.map((category) => ({
  id: category.id,
  label: category.label,
  title: category.title,
  description: category.description,
  theologicalCaution: category.theological_caution,
  teaching: category.teaching,
  featuredCases: category.featured_case_ids.map(resolveCase),
  allCases: category.all_case_ids.map(resolveCase),
}));

export const antiChristQuotes = directory.recorded_words;
export const antiChristReviewed = directory.reviewed;
export const antiChristScope = directory.scope;
export const antiChristTitleNote = directory.title_note;
export const antiChristEditorialNote = directory.editorial_note;
export const antiChristScripture = directory.scripture;

export const antiChristStats = {
  categories: antiChristCategories.length,
  featuredPlacements: antiChristCategories.reduce((total, category) => total + category.featuredCases.length, 0),
  collectionPlacements: antiChristCategories.reduce((total, category) => total + category.allCases.length, 0),
  uniqueCases: new Set(antiChristCategories.flatMap((category) => category.allCases.map((item) => item.id))).size,
  directSources: new Set(antiChristCategories.flatMap((category) => category.allCases.flatMap((item) => item.sources.map((source) => source.url)))).size,
};
