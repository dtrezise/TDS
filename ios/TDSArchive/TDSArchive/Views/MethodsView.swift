import SwiftUI

struct MethodsView: View {
    let archive: ArchivePayload

    private let standards = [
        MethodStandard(title: "Prefer primary records", body: "Court opinions, official records, direct transcripts, agency findings, and public documents come before commentary."),
        MethodStandard(title: "Name the legal status", body: "Conviction, civil liability, allegation, charge, settlement, dismissal, appeal, pardon, reporting, and analysis are not interchangeable."),
        MethodStandard(title: "Preserve limiting context", body: "Denials, acquittals, dismissals, reversals, appeals, changed circumstances, and later corrections stay attached to the record."),
        MethodStandard(title: "Make every claim inspectable", body: "Each public case file includes direct evidence links so readers can examine the source and test the archive's argument."),
        MethodStandard(title: "Correct the archive", body: "Titles, summaries, share copy, scores, and source status must be revisited when the underlying record changes."),
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    BrandBar().padding(.bottom, 4)
                    Text("HARSH ARGUMENT.\nEXACT RECORD.")
                        .font(.system(.largeTitle, design: .serif, weight: .bold))
                    Text("The archive is explicitly critical of Trump. That stance increases—not decreases—the obligation to describe evidence and legal status precisely.")
                        .font(.title3)
                        .foregroundStyle(Color.tdsInkSoft)
                        .lineSpacing(4)

                    ForEach(Array(standards.enumerated()), id: \.element.title) { index, standard in
                        HStack(alignment: .top, spacing: 14) {
                            Text(String(format: "%02d", index + 1))
                                .font(.system(.caption, design: .serif, weight: .bold))
                                .foregroundStyle(Color.tdsRed)
                            VStack(alignment: .leading, spacing: 7) {
                                Text(standard.title)
                                    .font(.headline)
                                Text(standard.body)
                                    .font(.body)
                                    .lineSpacing(3)
                                    .foregroundStyle(Color.tdsInkSoft)
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.vertical, 14)
                        .overlay(alignment: .bottom) { Divider().overlay(Color.tdsInk.opacity(0.25)) }
                    }

                    Link(destination: TDSLinks.page("methodology")) {
                        Label("Read the complete methodology", systemImage: "arrow.up.right")
                            .font(.subheadline.weight(.bold))
                            .frame(maxWidth: .infinity, minHeight: 48)
                            .foregroundStyle(.white)
                            .background(Color.tdsInk)
                    }

                    Text("Bundled archive reviewed \(archive.lastReviewed).")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding(20)
            }
            .background(Color.tdsPaper.ignoresSafeArea())
            .navigationTitle("Methods")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

private struct MethodStandard {
    let title: String
    let body: String
}
