CREATE TABLE `cases` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`publication_state` text DEFAULT 'draft' NOT NULL,
	`current_status` text NOT NULL,
	`date_start` text NOT NULL,
	`date_end` text,
	`summary` text NOT NULL,
	`significance` text NOT NULL,
	`editorial_caution` text,
	`confidence` text DEFAULT 'medium' NOT NULL,
	`current_revision` integer DEFAULT 1 NOT NULL,
	`first_published_at` text,
	`last_reviewed_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "cases_publication_state_check" CHECK("cases"."publication_state" in ('draft', 'review', 'published', 'withdrawn')),
	CONSTRAINT "cases_confidence_check" CHECK("cases"."confidence" in ('low', 'medium', 'high')),
	CONSTRAINT "cases_revision_check" CHECK("cases"."current_revision" >= 1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cases_slug_unique` ON `cases` (`slug`);--> statement-breakpoint
CREATE INDEX `cases_publication_state_idx` ON `cases` (`publication_state`);--> statement-breakpoint
CREATE INDEX `cases_date_start_idx` ON `cases` (`date_start`);--> statement-breakpoint
CREATE INDEX `cases_last_reviewed_idx` ON `cases` (`last_reviewed_at`);--> statement-breakpoint
CREATE TABLE `case_aliases` (
	`legacy_id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`source_lane` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `case_aliases_case_idx` ON `case_aliases` (`case_id`);--> statement-breakpoint
CREATE TABLE `case_categories` (
	`case_id` text NOT NULL,
	`category_id` text NOT NULL,
	`is_primary` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`case_id`, `category_id`),
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `case_categories_category_idx` ON `case_categories` (`category_id`);--> statement-breakpoint
CREATE TABLE `case_entities` (
	`case_id` text NOT NULL,
	`entity_id` text NOT NULL,
	`role` text DEFAULT 'subject' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`case_id`, `entity_id`, `role`),
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`entity_id`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "case_entities_role_check" CHECK("case_entities"."role" in ('subject', 'actor', 'organization', 'official', 'witness', 'source_author', 'other'))
);
--> statement-breakpoint
CREATE INDEX `case_entities_entity_idx` ON `case_entities` (`entity_id`);--> statement-breakpoint
CREATE TABLE `case_faith_principles` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`principle_id` text NOT NULL,
	`source_claim_id` text,
	`analysis` text NOT NULL,
	`current_revision` integer DEFAULT 1 NOT NULL,
	`reviewed_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`principle_id`) REFERENCES `faith_principles`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`source_claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "case_faith_principles_revision_check" CHECK("case_faith_principles"."current_revision" >= 1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `case_faith_principles_case_principle_unique` ON `case_faith_principles` (`case_id`,`principle_id`);--> statement-breakpoint
CREATE TABLE `case_revisions` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`revision_number` integer NOT NULL,
	`title` text NOT NULL,
	`current_status` text NOT NULL,
	`summary` text NOT NULL,
	`significance` text NOT NULL,
	`editorial_caution` text,
	`change_summary` text NOT NULL,
	`created_by` text NOT NULL,
	`supersedes_revision_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "case_revisions_number_check" CHECK("case_revisions"."revision_number" >= 1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `case_revisions_case_number_unique` ON `case_revisions` (`case_id`,`revision_number`);--> statement-breakpoint
CREATE INDEX `case_revisions_case_idx` ON `case_revisions` (`case_id`);--> statement-breakpoint
CREATE TABLE `case_tags` (
	`case_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`case_id`, `tag_id`),
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `case_tags_tag_idx` ON `case_tags` (`tag_id`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`label` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `claim_revisions` (
	`id` text PRIMARY KEY NOT NULL,
	`claim_id` text NOT NULL,
	`revision_number` integer NOT NULL,
	`claim_status` text NOT NULL,
	`text` text NOT NULL,
	`attribution` text,
	`response_summary` text,
	`change_summary` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "claim_revisions_number_check" CHECK("claim_revisions"."revision_number" >= 1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `claim_revisions_claim_number_unique` ON `claim_revisions` (`claim_id`,`revision_number`);--> statement-breakpoint
CREATE INDEX `claim_revisions_claim_idx` ON `claim_revisions` (`claim_id`);--> statement-breakpoint
CREATE TABLE `claim_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`claim_id` text NOT NULL,
	`source_id` text NOT NULL,
	`relationship` text NOT NULL,
	`locator` text,
	`excerpt` text,
	`excerpt_word_count` integer DEFAULT 0 NOT NULL,
	`citation_note` text,
	`is_primary` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "claim_sources_relationship_check" CHECK("claim_sources"."relationship" in ('supports', 'contradicts', 'contextualizes', 'documents_status', 'contains_denial', 'contains_response')),
	CONSTRAINT "claim_sources_excerpt_word_count_check" CHECK("claim_sources"."excerpt_word_count" >= 0 and "claim_sources"."excerpt_word_count" <= 100)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `claim_sources_claim_source_locator_unique` ON `claim_sources` (`claim_id`,`source_id`,`locator`);--> statement-breakpoint
CREATE INDEX `claim_sources_claim_idx` ON `claim_sources` (`claim_id`);--> statement-breakpoint
CREATE INDEX `claim_sources_source_idx` ON `claim_sources` (`source_id`);--> statement-breakpoint
CREATE TABLE `claims` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`claim_key` text NOT NULL,
	`claim_type` text NOT NULL,
	`claim_status` text NOT NULL,
	`text` text NOT NULL,
	`attribution` text,
	`response_summary` text,
	`publication_state` text DEFAULT 'draft' NOT NULL,
	`current_revision` integer DEFAULT 1 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`last_reviewed_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "claims_type_check" CHECK("claims"."claim_type" in ('factual', 'procedural_status', 'allegation', 'attribution', 'editorial_analysis', 'faith_analysis')),
	CONSTRAINT "claims_status_check" CHECK("claims"."claim_status" in ('supported', 'adjudicated', 'attributed', 'alleged', 'disputed', 'denied', 'editorial_opinion', 'superseded', 'retracted')),
	CONSTRAINT "claims_publication_state_check" CHECK("claims"."publication_state" in ('draft', 'review', 'published', 'withdrawn')),
	CONSTRAINT "claims_revision_check" CHECK("claims"."current_revision" >= 1)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `claims_case_key_unique` ON `claims` (`case_id`,`claim_key`);--> statement-breakpoint
CREATE INDEX `claims_case_idx` ON `claims` (`case_id`);--> statement-breakpoint
CREATE INDEX `claims_status_idx` ON `claims` (`claim_status`);--> statement-breakpoint
CREATE TABLE `corrections` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`claim_id` text,
	`source_id` text,
	`correction_type` text NOT NULL,
	`previous_text` text NOT NULL,
	`corrected_text` text NOT NULL,
	`explanation` text NOT NULL,
	`published_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "corrections_type_check" CHECK("corrections"."correction_type" in ('factual', 'legal_status', 'source', 'copy', 'headline', 'faith_analysis'))
);
--> statement-breakpoint
CREATE INDEX `corrections_case_idx` ON `corrections` (`case_id`);--> statement-breakpoint
CREATE TABLE `document_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`source_id` text NOT NULL,
	`captured_at` text NOT NULL,
	`r2_object_key` text NOT NULL,
	`content_sha256` text NOT NULL,
	`mime_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`rights_basis` text NOT NULL,
	`is_current` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "document_snapshots_byte_size_check" CHECK("document_snapshots"."byte_size" >= 0),
	CONSTRAINT "document_snapshots_rights_basis_check" CHECK("document_snapshots"."rights_basis" in ('public_domain', 'government_record', 'permission_granted', 'fair_use_excerpt', 'other_reviewed'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `document_snapshots_r2_key_unique` ON `document_snapshots` (`r2_object_key`);--> statement-breakpoint
CREATE INDEX `document_snapshots_source_idx` ON `document_snapshots` (`source_id`);--> statement-breakpoint
CREATE TABLE `editorial_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`claim_id` text,
	`review_type` text NOT NULL,
	`outcome` text NOT NULL,
	`reviewer` text NOT NULL,
	`notes` text,
	`reviewed_at` text NOT NULL,
	`expires_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "editorial_reviews_type_check" CHECK("editorial_reviews"."review_type" in ('source', 'legal_status', 'defamation', 'headline', 'faith', 'correction', 'link')),
	CONSTRAINT "editorial_reviews_outcome_check" CHECK("editorial_reviews"."outcome" in ('pending', 'approved', 'changes_required', 'blocked'))
);
--> statement-breakpoint
CREATE INDEX `editorial_reviews_case_idx` ON `editorial_reviews` (`case_id`);--> statement-breakpoint
CREATE INDEX `editorial_reviews_claim_idx` ON `editorial_reviews` (`claim_id`);--> statement-breakpoint
CREATE TABLE `entities` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`entity_type` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "entities_type_check" CHECK("entities"."entity_type" in ('person', 'organization', 'movement', 'government', 'publication', 'other'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entities_slug_unique` ON `entities` (`slug`);--> statement-breakpoint
CREATE INDEX `entities_name_idx` ON `entities` (`name`);--> statement-breakpoint
CREATE TABLE `entity_aliases` (
	`id` text PRIMARY KEY NOT NULL,
	`entity_id` text NOT NULL,
	`alias` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`entity_id`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entity_aliases_entity_alias_unique` ON `entity_aliases` (`entity_id`,`alias`);--> statement-breakpoint
CREATE INDEX `entity_aliases_alias_idx` ON `entity_aliases` (`alias`);--> statement-breakpoint
CREATE TABLE `faith_principles` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`tradition` text,
	`citation` text NOT NULL,
	`principle` text NOT NULL,
	`url` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `faith_principles_slug_unique` ON `faith_principles` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `faith_principles_citation_url_unique` ON `faith_principles` (`citation`,`url`);--> statement-breakpoint
CREATE TABLE `import_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`format_version` text NOT NULL,
	`source_commit` text,
	`source_hash` text NOT NULL,
	`record_counts_json` text NOT NULL,
	`status` text NOT NULL,
	`notes` text,
	`imported_at` text NOT NULL,
	CONSTRAINT "import_runs_status_check" CHECK("import_runs"."status" in ('prepared', 'imported', 'failed', 'rolled_back'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `import_runs_source_hash_unique` ON `import_runs` (`source_hash`);--> statement-breakpoint
CREATE TABLE `legal_status_events` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`claim_id` text,
	`source_id` text,
	`event_date` text NOT NULL,
	`event_type` text NOT NULL,
	`status_label` text NOT NULL,
	`jurisdiction` text,
	`court_or_agency` text,
	`docket_number` text,
	`is_current` integer DEFAULT false NOT NULL,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `legal_status_events_case_date_idx` ON `legal_status_events` (`case_id`,`event_date`);--> statement-breakpoint
CREATE INDEX `legal_status_events_current_idx` ON `legal_status_events` (`is_current`);--> statement-breakpoint
CREATE TABLE `sources` (
	`id` text PRIMARY KEY NOT NULL,
	`canonical_url` text NOT NULL,
	`original_url` text NOT NULL,
	`title` text NOT NULL,
	`publisher` text NOT NULL,
	`source_type` text NOT NULL,
	`authority_tier` text NOT NULL,
	`publication_date` text,
	`retrieved_at` text NOT NULL,
	`last_checked_at` text,
	`archive_url` text,
	`access_state` text DEFAULT 'active' NOT NULL,
	`copyright_handling` text DEFAULT 'link_only' NOT NULL,
	`mime_type` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "sources_authority_tier_check" CHECK("sources"."authority_tier" in ('primary', 'official', 'reporting', 'analysis', 'scripture')),
	CONSTRAINT "sources_access_state_check" CHECK("sources"."access_state" in ('active', 'restricted', 'missing', 'superseded', 'archived')),
	CONSTRAINT "sources_copyright_handling_check" CHECK("sources"."copyright_handling" in ('link_only', 'limited_excerpt', 'redistributable_primary', 'public_domain', 'permission_granted', 'unknown'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sources_canonical_url_unique` ON `sources` (`canonical_url`);--> statement-breakpoint
CREATE INDEX `sources_publisher_idx` ON `sources` (`publisher`);--> statement-breakpoint
CREATE INDEX `sources_authority_tier_idx` ON `sources` (`authority_tier`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`label` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_slug_unique` ON `tags` (`slug`);