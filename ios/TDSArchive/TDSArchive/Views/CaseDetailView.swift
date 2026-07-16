import SwiftUI

struct CaseDetailView: View {
    let item: CaseFile

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                VStack(alignment: .leading, spacing: 10) {
                    Text(item.category.uppercased())
                        .font(.caption.weight(.heavy))
                        .tracking(0.8)
                        .foregroundStyle(Color.tdsRed)
                    Text(item.date)
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)
                    Text(item.title)
                        .font(.system(.largeTitle, design: .serif, weight: .bold))
                        .foregroundStyle(Color.tdsInk)
                        .fixedSize(horizontal: false, vertical: true)
                }

                VStack(alignment: .leading, spacing: 8) {
                    Text("RECORD STATUS")
                        .font(.caption2.weight(.heavy))
                        .tracking(0.8)
                        .foregroundStyle(Color.tdsRed)
                    Text(item.status)
                        .font(.subheadline.weight(.bold))
                        .foregroundStyle(Color.tdsInk)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(16)
                .background(Color.tdsPaperBright)
                .overlay(Rectangle().stroke(Color.tdsInk.opacity(0.25)))

                Text(item.summary)
                    .font(.system(.title3, design: .serif))
                    .lineSpacing(5)

                VStack(alignment: .leading, spacing: 8) {
                    Text("WHY IT MATTERS")
                        .font(.caption.weight(.heavy))
                        .tracking(0.7)
                        .foregroundStyle(Color.tdsRed)
                    Text(item.significance)
                        .font(.body)
                        .lineSpacing(4)
                }

                ShareLink(
                    item: TDSLinks.evidence(item.id),
                    subject: Text(item.title),
                    message: Text("\(item.summary)\n\nExamine the evidence and source record:")
                ) {
                    Label("Share evidence", systemImage: "square.and.arrow.up")
                        .font(.subheadline.weight(.bold))
                        .frame(maxWidth: .infinity, minHeight: 48)
                        .foregroundStyle(.white)
                        .background(Color.tdsInk)
                }

                if !item.tests.isEmpty {
                    sectionLabel("TESTS")
                    ForEach(item.tests) { test in
                        TestLensCard(test: test)
                    }
                }

                sectionLabel("EXAMINE THE EVIDENCE")
                VStack(spacing: 10) {
                    ForEach(item.sources) { source in
                        Link(destination: source.url) {
                            VStack(alignment: .leading, spacing: 6) {
                                HStack {
                                    Text(source.kind.uppercased())
                                        .font(.caption2.weight(.heavy))
                                        .tracking(0.5)
                                        .foregroundStyle(Color.tdsRed)
                                    Spacer()
                                    Image(systemName: "arrow.up.right")
                                        .font(.caption.weight(.bold))
                                }
                                Text(source.label)
                                    .font(.body.weight(.semibold))
                                    .multilineTextAlignment(.leading)
                                Text(source.publisher)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .foregroundStyle(Color.tdsInk)
                            .frame(maxWidth: .infinity, minHeight: 60, alignment: .leading)
                            .padding(16)
                            .background(Color.tdsPaperBright)
                            .overlay(Rectangle().stroke(Color.tdsInk.opacity(0.22)))
                        }
                    }
                }
            }
            .padding(20)
        }
        .background(Color.tdsPaper.ignoresSafeArea())
        .navigationTitle("Case file")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func sectionLabel(_ text: String) -> some View {
        Text(text)
            .font(.caption.weight(.heavy))
            .tracking(0.9)
            .foregroundStyle(Color.tdsRed)
            .padding(.top, 6)
    }
}

private struct TestLensCard: View {
    let test: TestLens

    @State private var expanded = false

    var body: some View {
        DisclosureGroup(isExpanded: $expanded) {
            VStack(alignment: .leading, spacing: 14) {
                Text(test.analysis)
                    .font(.body)
                    .lineSpacing(3)

                if test.score.score != nil {
                    Text("\(test.score.earnedPoints) of \(test.score.possiblePoints) applicable points, normalized to \(test.score.score ?? 0)/100.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Link(destination: TDSLinks.page(test.href)) {
                    Label("Open the complete rubric", systemImage: "arrow.up.right")
                        .font(.caption.weight(.bold))
                        .frame(minHeight: 44)
                }
            }
            .padding(.top, 12)
        } label: {
            HStack(spacing: 12) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(test.label.uppercased())
                        .font(.caption2.weight(.heavy))
                        .tracking(0.6)
                    Text(test.score.verdict)
                        .font(.caption)
                }
                Spacer()
                ScoreChip(test: test)
            }
            .foregroundStyle(TestTone.color(for: test.id))
        }
        .padding(16)
        .background(TestTone.color(for: test.id).opacity(0.10))
        .overlay(alignment: .leading) {
            Rectangle().fill(TestTone.color(for: test.id)).frame(width: 4)
        }
    }
}
