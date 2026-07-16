import SwiftUI

struct EvidenceListView: View {
    let archive: ArchivePayload

    @State private var query = ""
    @State private var selectedCategory = "All evidence"
    @State private var newestFirst = true

    private var filteredCases: [CaseFile] {
        archive.cases
            .filter { selectedCategory == "All evidence" || $0.category == selectedCategory }
            .filter { item in
                let term = query.trimmingCharacters(in: .whitespacesAndNewlines)
                guard !term.isEmpty else { return true }
                return [item.title, item.summary, item.significance, item.status, item.subjects.joined(separator: " "), item.tags.joined(separator: " ")]
                    .joined(separator: " ")
                    .localizedCaseInsensitiveContains(term)
            }
            .sorted { newestFirst ? $0.sortDate > $1.sortDate : $0.sortDate < $1.sortDate }
    }

    private var sourceCount: Int {
        Set(archive.cases.flatMap { $0.sources.map(\.url) }).count
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVStack(spacing: 0) {
                    ArchiveHero()
                        .padding(.horizontal, 16)
                        .padding(.top, 12)

                    StatsStrip(caseCount: archive.cases.count, sourceCount: sourceCount)
                        .padding(.horizontal, 16)

                    categoryPicker

                    HStack {
                        Text("\(filteredCases.count) case files")
                            .font(.caption.weight(.bold))
                            .textCase(.uppercase)
                            .tracking(0.6)
                        Spacer()
                        Text(archive.lastReviewed)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)

                    if filteredCases.isEmpty {
                        ContentUnavailableView.search(text: query)
                            .padding(.vertical, 60)
                    } else {
                        ForEach(Array(filteredCases.enumerated()), id: \.element.id) { index, item in
                            NavigationLink(value: item) {
                                EvidenceRow(item: item, number: index + 1)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
            }
            .background(Color.tdsPaper.ignoresSafeArea())
            .navigationTitle("Evidence")
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: CaseFile.self) { item in
                CaseDetailView(item: item)
            }
            .searchable(text: $query, prompt: "Search cases, people, or topics")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Picker("Order", selection: $newestFirst) {
                            Text("Newest first").tag(true)
                            Text("Oldest first").tag(false)
                        }
                    } label: {
                        Label("Sort", systemImage: "arrow.up.arrow.down")
                    }
                }
            }
        }
    }

    private var categoryPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(["All evidence"] + archive.categories, id: \.self) { category in
                    Button {
                        selectedCategory = category
                    } label: {
                        Text(category)
                            .font(.caption.weight(.bold))
                            .foregroundStyle(selectedCategory == category ? Color.white : Color.tdsInk)
                            .padding(.horizontal, 14)
                            .frame(minHeight: 44)
                            .background(selectedCategory == category ? Color.tdsBlue : Color.tdsPaperBright)
                            .overlay(Capsule().stroke(Color.tdsInk.opacity(0.28)))
                            .clipShape(Capsule())
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
        }
    }
}

private struct StatsStrip: View {
    let caseCount: Int
    let sourceCount: Int

    var body: some View {
        HStack(spacing: 0) {
            stat(value: caseCount, label: "Case files")
            Divider().overlay(Color.white.opacity(0.25))
            stat(value: sourceCount, label: "Evidence links")
        }
        .background(Color.tdsInk)
    }

    private func stat(value: Int, label: String) -> some View {
        HStack(spacing: 8) {
            Text(value.formatted())
                .font(.system(.title3, design: .serif, weight: .bold))
                .foregroundStyle(Color.tdsGold)
            Text(label.uppercased())
                .font(.caption2.weight(.bold))
                .tracking(0.5)
                .foregroundStyle(.white)
            Spacer(minLength: 0)
        }
        .padding(.horizontal, 14)
        .frame(maxWidth: .infinity, minHeight: 58)
    }
}

private struct EvidenceRow: View {
    let item: CaseFile
    let number: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .firstTextBaseline) {
                Text(String(format: "%02d", number))
                    .font(.system(.caption, design: .serif, weight: .bold))
                    .foregroundStyle(.secondary)
                Text(item.category.uppercased())
                    .font(.caption2.weight(.heavy))
                    .tracking(0.6)
                    .foregroundStyle(Color.tdsRed)
                Spacer()
                Text(item.date)
                    .font(.caption2.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.trailing)
            }

            Text(item.title)
                .font(.system(.title2, design: .serif, weight: .bold))
                .foregroundStyle(Color.tdsInk)
                .multilineTextAlignment(.leading)

            Text(item.summary)
                .font(.body)
                .foregroundStyle(Color.tdsInkSoft)
                .lineSpacing(3)
                .lineLimit(4)

            HStack(spacing: 8) {
                Label("\(item.sources.count) sources", systemImage: "link")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                Spacer()
                ForEach(item.tests.prefix(3)) { test in
                    ScoreChip(test: test)
                }
                Image(systemName: "chevron.right")
                    .font(.caption.weight(.bold))
                    .foregroundStyle(.secondary)
            }
        }
        .padding(20)
        .background(item.isFeatured ? Color.tdsPaperBright : Color.tdsPaper)
        .overlay(alignment: .bottom) { Divider().overlay(Color.tdsInk) }
        .contentShape(Rectangle())
    }
}

struct ScoreChip: View {
    let test: TestLens

    var body: some View {
        Text(test.score.score.map(String.init) ?? "N/A")
            .font(.caption2.weight(.heavy))
            .foregroundStyle(.white)
            .frame(minWidth: 31, minHeight: 25)
            .background(TestTone.color(for: test.id))
            .accessibilityLabel("\(test.label), \(test.score.score.map { "\($0) out of 100" } ?? "not scored")")
    }
}
