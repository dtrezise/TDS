import americaResearch from "@/research/america_first.json";
import conductResearch from "@/research/conduct_family.json";
import dealResearch from "@/research/deal_record.json";
import faithResearch from "@/research/faith_movements.json";
import legalResearch from "@/research/legal_power.json";

export type EvidenceSource = {
  label: string;
  publisher: string;
  url: string;
  kind: "Court record" | "Official record" | "Primary source" | "Reporting" | "Analysis";
};

export type FaithLens = {
  teaching: string;
  reference: string;
  url: string;
};

export type CaseFile = {
  id: string;
  title: string;
  date: string;
  sortDate: string;
  category:
    | "Law & accountability"
    | "Democracy & power"
    | "Truth & public conduct"
    | "Family & business"
    | "Christianity & character"
    | "MAGA & movement"
    | "America & the world"
    | "Deals & economic power";
  status: string;
  summary: string;
  significance: string;
  subjects: string[];
  tags: string[];
  sources: EvidenceSource[];
  faithAnalysis?: string;
  faithLens?: FaithLens[];
  featured?: boolean;
};

type RawSource = {
  label: string;
  publisher: string;
  url: string;
  source_type: string;
};

type RawTeaching = {
  citation: string;
  principle: string;
  url: string;
};

type RawItem = {
  id: string;
  title: string;
  date_start: string;
  date_end?: string | null;
  people?: string[];
  category: string;
  status_label: string;
  summary: string;
  why_it_matters: string;
  evidence: RawSource[];
  christian_teaching?: RawTeaching[];
  tags?: string[];
  confidence?: string;
};

type ResearchBundle = { items: RawItem[] };
type ResearchLane = "legal" | "conduct" | "faith" | "america" | "deal";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  if (!month) return year;
  if (!day) return `${months[Number(month) - 1]} ${year}`;
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
}

function formatDateRange(start: string, end?: string | null) {
  if (!end || end === start) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function sortableDate(value: string) {
  const parts = value.split("-");
  return [parts[0], parts[1] ?? "01", parts[2] ?? "01"].join("-");
}

function sourceKind(sourceType: string): EvidenceSource["kind"] {
  const type = sourceType.toLowerCase();
  if (/court|verdict|complaint|indictment|filing|judgment|consent.decree/.test(type)) return "Court record";
  if (/government|official|congress|agency|executive|white.house|inspector|gao|crs|senate|house|federal.register/.test(type)) return "Official record";
  if (/primary|transcript|video|audio|statement|speech|scripture|bible|policy|platform|report/.test(type)) return "Primary source";
  if (/news|reporting|journalism|fact.check/.test(type)) return "Reporting";
  return "Analysis";
}

function categoryFor(item: RawItem, lane: ResearchLane): CaseFile["category"] {
  const category = item.category.toLowerCase();
  const text = `${category} ${item.title} ${(item.tags ?? []).join(" ")}`.toLowerCase();

  if (lane === "america") return "America & the world";
  if (lane === "deal") return "Deals & economic power";

  if (lane === "faith") {
    if (/movement|heritage|project 2025|america.first|nationalism|religious.alliance/.test(text)) return "MAGA & movement";
    return "Christianity & character";
  }

  if (lane === "legal") {
    if (/business|civil.liability|criminal.case/.test(category)) return "Law & accountability";
    return "Democracy & power";
  }

  if (/organization|business|charity|nepotism|foreign.conflict|family/.test(category)) return "Family & business";
  if (/republican.enabling|election.subversion/.test(category)) return "Democracy & power";
  return "Truth & public conduct";
}

const featuredIds = new Set([
  "new-york-falsifying-business-records-conviction",
  "carroll-sexual-abuse-defamation-judgments",
  "election-subversion-january-6-report",
  "family-separation-zero-tolerance",
  "obama-apes-social-post",
  "faith-repentance-2015",
  "faith-kirk-memorial-forgiveness-2025",
  "faith-mass-deportation-2025",
  "faith-project2025-schedule-policy-career-2022-2025",
  "ieepa-tariffs-supreme-court-2026",
  "maduro-capture-and-venezuelan-oil-control-2026",
  "qatar-gifted-presidential-jet-2025-2026",
  "iran-deal-exit-to-hormuz-crisis-2018-2026",
  "trump-amplified-criminalize-socialism-deport-leaders-video-2026",
]);

function mapItem(item: RawItem, lane: ResearchLane): CaseFile {
  const teachings = item.christian_teaching ?? [];
  return {
    id: item.id,
    title: item.title,
    date: formatDateRange(item.date_start, item.date_end),
    sortDate: sortableDate(item.date_end ?? item.date_start),
    category: categoryFor(item, lane),
    status: item.status_label,
    summary: item.summary,
    significance: item.why_it_matters,
    subjects: item.people ?? [],
    tags: item.tags ?? [],
    sources: item.evidence.map((source) => ({
      label: source.label,
      publisher: source.publisher,
      url: source.url,
      kind: sourceKind(source.source_type),
    })),
    faithAnalysis: teachings.length ? teachings.map((teaching) => teaching.principle).join(" ") : undefined,
    faithLens: teachings.length ? teachings.map((teaching) => ({
      teaching: teaching.principle,
      reference: teaching.citation,
      url: teaching.url,
    })) : undefined,
    featured: featuredIds.has(item.id),
  };
}

const duplicateConductIds = new Set([
  "e-jean-carroll-liability",
  "new-york-civil-fraud",
  "trump-foundation-misuse",
  "foreign-government-payments-presidency",
]);

const legalItems = (legalResearch as ResearchBundle).items.map((item) => mapItem(item, "legal"));
const conductItems = (conductResearch as ResearchBundle).items
  .filter((item) => !duplicateConductIds.has(item.id))
  .map((item) => mapItem(item, "conduct"));
const faithItems = (faithResearch as ResearchBundle).items.map((item) => mapItem(item, "faith"));
const americaItems = (americaResearch as ResearchBundle).items.map((item) => mapItem(item, "america"));
const dealItems = (dealResearch as ResearchBundle).items.map((item) => mapItem(item, "deal"));

// Repeated events remain in the faith lane when they support a distinct moral
// analysis. Purely duplicative legal/business entries are removed above.
export const caseFiles: CaseFile[] = [...legalItems, ...conductItems, ...faithItems, ...americaItems, ...dealItems];

export const categories = [
  "All evidence",
  "Law & accountability",
  "Democracy & power",
  "Truth & public conduct",
  "Family & business",
  "Christianity & character",
  "MAGA & movement",
  "America & the world",
  "Deals & economic power",
] as const;

export const lastReviewed = "July 15, 2026";
