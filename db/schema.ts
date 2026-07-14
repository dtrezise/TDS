import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const createdAt = () => text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`);
const updatedAt = () => text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`);

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  label: text("label").notNull(),
  description: text("description"),
  createdAt: createdAt(),
}, (table) => [uniqueIndex("categories_slug_unique").on(table.slug)]);

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  label: text("label").notNull(),
  createdAt: createdAt(),
}, (table) => [uniqueIndex("tags_slug_unique").on(table.slug)]);

export const entities = sqliteTable("entities", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  entityType: text("entity_type").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("entities_slug_unique").on(table.slug),
  index("entities_name_idx").on(table.name),
  check("entities_type_check", sql`${table.entityType} in ('person', 'organization', 'movement', 'government', 'publication', 'other')`),
]);

export const sources = sqliteTable("sources", {
  id: text("id").primaryKey(),
  canonicalUrl: text("canonical_url").notNull(),
  originalUrl: text("original_url").notNull(),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  sourceType: text("source_type").notNull(),
  authorityTier: text("authority_tier").notNull(),
  publicationDate: text("publication_date"),
  retrievedAt: text("retrieved_at").notNull(),
  lastCheckedAt: text("last_checked_at"),
  archiveUrl: text("archive_url"),
  accessState: text("access_state").notNull().default("active"),
  copyrightHandling: text("copyright_handling").notNull().default("link_only"),
  mimeType: text("mime_type"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("sources_canonical_url_unique").on(table.canonicalUrl),
  index("sources_publisher_idx").on(table.publisher),
  index("sources_authority_tier_idx").on(table.authorityTier),
  check("sources_authority_tier_check", sql`${table.authorityTier} in ('primary', 'official', 'reporting', 'analysis', 'scripture')`),
  check("sources_access_state_check", sql`${table.accessState} in ('active', 'restricted', 'missing', 'superseded', 'archived')`),
  check("sources_copyright_handling_check", sql`${table.copyrightHandling} in ('link_only', 'limited_excerpt', 'redistributable_primary', 'public_domain', 'permission_granted', 'unknown')`),
]);

export const faithPrinciples = sqliteTable("faith_principles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  tradition: text("tradition"),
  citation: text("citation").notNull(),
  principle: text("principle").notNull(),
  url: text("url").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("faith_principles_slug_unique").on(table.slug),
  uniqueIndex("faith_principles_citation_url_unique").on(table.citation, table.url),
]);

export const archiveCases = sqliteTable("cases", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  publicationState: text("publication_state").notNull().default("draft"),
  currentStatus: text("current_status").notNull(),
  dateStart: text("date_start").notNull(),
  dateEnd: text("date_end"),
  summary: text("summary").notNull(),
  significance: text("significance").notNull(),
  editorialCaution: text("editorial_caution"),
  confidence: text("confidence").notNull().default("medium"),
  currentRevision: integer("current_revision").notNull().default(1),
  firstPublishedAt: text("first_published_at"),
  lastReviewedAt: text("last_reviewed_at").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("cases_slug_unique").on(table.slug),
  index("cases_publication_state_idx").on(table.publicationState),
  index("cases_date_start_idx").on(table.dateStart),
  index("cases_last_reviewed_idx").on(table.lastReviewedAt),
  check("cases_publication_state_check", sql`${table.publicationState} in ('draft', 'review', 'published', 'withdrawn')`),
  check("cases_confidence_check", sql`${table.confidence} in ('low', 'medium', 'high')`),
  check("cases_revision_check", sql`${table.currentRevision} >= 1`),
]);

export const caseAliases = sqliteTable("case_aliases", {
  legacyId: text("legacy_id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  sourceLane: text("source_lane").notNull(),
  createdAt: createdAt(),
}, (table) => [index("case_aliases_case_idx").on(table.caseId)]);

export const caseRevisions = sqliteTable("case_revisions", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  revisionNumber: integer("revision_number").notNull(),
  title: text("title").notNull(),
  currentStatus: text("current_status").notNull(),
  summary: text("summary").notNull(),
  significance: text("significance").notNull(),
  editorialCaution: text("editorial_caution"),
  changeSummary: text("change_summary").notNull(),
  createdBy: text("created_by").notNull(),
  supersedesRevisionId: text("supersedes_revision_id"),
  createdAt: createdAt(),
}, (table) => [
  uniqueIndex("case_revisions_case_number_unique").on(table.caseId, table.revisionNumber),
  index("case_revisions_case_idx").on(table.caseId),
  check("case_revisions_number_check", sql`${table.revisionNumber} >= 1`),
]);

export const claims = sqliteTable("claims", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  claimKey: text("claim_key").notNull(),
  claimType: text("claim_type").notNull(),
  claimStatus: text("claim_status").notNull(),
  text: text("text").notNull(),
  attribution: text("attribution"),
  responseSummary: text("response_summary"),
  publicationState: text("publication_state").notNull().default("draft"),
  currentRevision: integer("current_revision").notNull().default(1),
  sortOrder: integer("sort_order").notNull().default(0),
  lastReviewedAt: text("last_reviewed_at").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("claims_case_key_unique").on(table.caseId, table.claimKey),
  index("claims_case_idx").on(table.caseId),
  index("claims_status_idx").on(table.claimStatus),
  check("claims_type_check", sql`${table.claimType} in ('factual', 'procedural_status', 'allegation', 'attribution', 'editorial_analysis', 'faith_analysis')`),
  check("claims_status_check", sql`${table.claimStatus} in ('supported', 'adjudicated', 'attributed', 'alleged', 'disputed', 'denied', 'editorial_opinion', 'superseded', 'retracted')`),
  check("claims_publication_state_check", sql`${table.publicationState} in ('draft', 'review', 'published', 'withdrawn')`),
  check("claims_revision_check", sql`${table.currentRevision} >= 1`),
]);

export const claimRevisions = sqliteTable("claim_revisions", {
  id: text("id").primaryKey(),
  claimId: text("claim_id").notNull().references(() => claims.id, { onDelete: "cascade" }),
  revisionNumber: integer("revision_number").notNull(),
  claimStatus: text("claim_status").notNull(),
  text: text("text").notNull(),
  attribution: text("attribution"),
  responseSummary: text("response_summary"),
  changeSummary: text("change_summary").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: createdAt(),
}, (table) => [
  uniqueIndex("claim_revisions_claim_number_unique").on(table.claimId, table.revisionNumber),
  index("claim_revisions_claim_idx").on(table.claimId),
  check("claim_revisions_number_check", sql`${table.revisionNumber} >= 1`),
]);

export const claimSources = sqliteTable("claim_sources", {
  id: text("id").primaryKey(),
  claimId: text("claim_id").notNull().references(() => claims.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull().references(() => sources.id, { onDelete: "restrict" }),
  relationship: text("relationship").notNull(),
  locator: text("locator"),
  excerpt: text("excerpt"),
  excerptWordCount: integer("excerpt_word_count").notNull().default(0),
  citationNote: text("citation_note"),
  isPrimary: integer("is_primary", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
}, (table) => [
  uniqueIndex("claim_sources_claim_source_locator_unique").on(table.claimId, table.sourceId, table.locator),
  index("claim_sources_claim_idx").on(table.claimId),
  index("claim_sources_source_idx").on(table.sourceId),
  check("claim_sources_relationship_check", sql`${table.relationship} in ('supports', 'contradicts', 'contextualizes', 'documents_status', 'contains_denial', 'contains_response')`),
  check("claim_sources_excerpt_word_count_check", sql`${table.excerptWordCount} >= 0 and ${table.excerptWordCount} <= 100`),
]);

export const entityAliases = sqliteTable("entity_aliases", {
  id: text("id").primaryKey(),
  entityId: text("entity_id").notNull().references(() => entities.id, { onDelete: "cascade" }),
  alias: text("alias").notNull(),
  createdAt: createdAt(),
}, (table) => [
  uniqueIndex("entity_aliases_entity_alias_unique").on(table.entityId, table.alias),
  index("entity_aliases_alias_idx").on(table.alias),
]);

export const caseEntities = sqliteTable("case_entities", {
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  entityId: text("entity_id").notNull().references(() => entities.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("subject"),
  createdAt: createdAt(),
}, (table) => [
  primaryKey({ columns: [table.caseId, table.entityId, table.role] }),
  index("case_entities_entity_idx").on(table.entityId),
  check("case_entities_role_check", sql`${table.role} in ('subject', 'actor', 'organization', 'official', 'witness', 'source_author', 'other')`),
]);

export const caseCategories = sqliteTable("case_categories", {
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  categoryId: text("category_id").notNull().references(() => categories.id, { onDelete: "restrict" }),
  isPrimary: integer("is_primary", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
}, (table) => [
  primaryKey({ columns: [table.caseId, table.categoryId] }),
  index("case_categories_category_idx").on(table.categoryId),
]);

export const caseTags = sqliteTable("case_tags", {
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  createdAt: createdAt(),
}, (table) => [
  primaryKey({ columns: [table.caseId, table.tagId] }),
  index("case_tags_tag_idx").on(table.tagId),
]);

export const legalStatusEvents = sqliteTable("legal_status_events", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  claimId: text("claim_id").references(() => claims.id, { onDelete: "set null" }),
  sourceId: text("source_id").references(() => sources.id, { onDelete: "set null" }),
  eventDate: text("event_date").notNull(),
  eventType: text("event_type").notNull(),
  statusLabel: text("status_label").notNull(),
  jurisdiction: text("jurisdiction"),
  courtOrAgency: text("court_or_agency"),
  docketNumber: text("docket_number"),
  isCurrent: integer("is_current", { mode: "boolean" }).notNull().default(false),
  notes: text("notes"),
  createdAt: createdAt(),
}, (table) => [
  index("legal_status_events_case_date_idx").on(table.caseId, table.eventDate),
  index("legal_status_events_current_idx").on(table.isCurrent),
]);

export const caseFaithPrinciples = sqliteTable("case_faith_principles", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  principleId: text("principle_id").notNull().references(() => faithPrinciples.id, { onDelete: "restrict" }),
  sourceClaimId: text("source_claim_id").references(() => claims.id, { onDelete: "set null" }),
  analysis: text("analysis").notNull(),
  currentRevision: integer("current_revision").notNull().default(1),
  reviewedAt: text("reviewed_at").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("case_faith_principles_case_principle_unique").on(table.caseId, table.principleId),
  check("case_faith_principles_revision_check", sql`${table.currentRevision} >= 1`),
]);

export const documentSnapshots = sqliteTable("document_snapshots", {
  id: text("id").primaryKey(),
  sourceId: text("source_id").notNull().references(() => sources.id, { onDelete: "cascade" }),
  capturedAt: text("captured_at").notNull(),
  r2ObjectKey: text("r2_object_key").notNull(),
  contentSha256: text("content_sha256").notNull(),
  mimeType: text("mime_type").notNull(),
  byteSize: integer("byte_size").notNull(),
  rightsBasis: text("rights_basis").notNull(),
  isCurrent: integer("is_current", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
}, (table) => [
  uniqueIndex("document_snapshots_r2_key_unique").on(table.r2ObjectKey),
  index("document_snapshots_source_idx").on(table.sourceId),
  check("document_snapshots_byte_size_check", sql`${table.byteSize} >= 0`),
  check("document_snapshots_rights_basis_check", sql`${table.rightsBasis} in ('public_domain', 'government_record', 'permission_granted', 'fair_use_excerpt', 'other_reviewed')`),
]);

export const editorialReviews = sqliteTable("editorial_reviews", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  claimId: text("claim_id").references(() => claims.id, { onDelete: "cascade" }),
  reviewType: text("review_type").notNull(),
  outcome: text("outcome").notNull(),
  reviewer: text("reviewer").notNull(),
  notes: text("notes"),
  reviewedAt: text("reviewed_at").notNull(),
  expiresAt: text("expires_at"),
  createdAt: createdAt(),
}, (table) => [
  index("editorial_reviews_case_idx").on(table.caseId),
  index("editorial_reviews_claim_idx").on(table.claimId),
  check("editorial_reviews_type_check", sql`${table.reviewType} in ('source', 'legal_status', 'defamation', 'headline', 'faith', 'correction', 'link')`),
  check("editorial_reviews_outcome_check", sql`${table.outcome} in ('pending', 'approved', 'changes_required', 'blocked')`),
]);

export const corrections = sqliteTable("corrections", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull().references(() => archiveCases.id, { onDelete: "cascade" }),
  claimId: text("claim_id").references(() => claims.id, { onDelete: "set null" }),
  sourceId: text("source_id").references(() => sources.id, { onDelete: "set null" }),
  correctionType: text("correction_type").notNull(),
  previousText: text("previous_text").notNull(),
  correctedText: text("corrected_text").notNull(),
  explanation: text("explanation").notNull(),
  publishedAt: text("published_at").notNull(),
  createdAt: createdAt(),
}, (table) => [
  index("corrections_case_idx").on(table.caseId),
  check("corrections_type_check", sql`${table.correctionType} in ('factual', 'legal_status', 'source', 'copy', 'headline', 'faith_analysis')`),
]);

export const importRuns = sqliteTable("import_runs", {
  id: text("id").primaryKey(),
  formatVersion: text("format_version").notNull(),
  sourceCommit: text("source_commit"),
  sourceHash: text("source_hash").notNull(),
  recordCountsJson: text("record_counts_json").notNull(),
  status: text("status").notNull(),
  notes: text("notes"),
  importedAt: text("imported_at").notNull(),
}, (table) => [
  uniqueIndex("import_runs_source_hash_unique").on(table.sourceHash),
  check("import_runs_status_check", sql`${table.status} in ('prepared', 'imported', 'failed', 'rolled_back')`),
]);
