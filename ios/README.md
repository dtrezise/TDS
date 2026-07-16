# TDS Evidence for iPhone

This is the first native SwiftUI companion to the TDS Evidence Archive. It bundles the same canonical case records, sources, Christianity analysis, and four additional test lenses used by the website.

## Open and run

1. Open `TDSArchive/TDSArchive.xcodeproj` in Xcode.
2. Choose an iPhone simulator.
3. Run the `TDSArchive` scheme.

The app currently works offline for archive browsing. Source links, rubric pages, Voices pages, and round-trip Evidence links open the public website.

## Refresh the bundled archive

From the repository root, run `pnpm mobile:export`, then rebuild the app. The exporter derives `archive.json` from the website's canonical TypeScript data rather than maintaining a second editorial dataset.

## First-version scope

- Browse, search, filter, and sort all case files.
- Read record status, significance, applicable test scores, and source links.
- Share an exact round-trip link to an Evidence eBox.
- Open the five rubric pages and three Voices collections.
- Read the archive's concise evidence standard.

The app does not yet include push updates, accounts, saved cases, or background synchronization. Those should follow a stable public data endpoint and privacy review.
