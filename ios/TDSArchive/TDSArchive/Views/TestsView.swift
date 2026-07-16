import SwiftUI

struct TestsView: View {
    let archive: ArchivePayload

    private let tests = [
        TestSummary(id: "christianity", title: "Christianity Test", premise: "Conduct measured against commandments, Jesus's teaching, the Beatitudes, and the fruit of the Spirit.", path: "christianity-test#christianity-scorecard"),
        TestSummary(id: "patriotic", title: "Patriotic Test", premise: "Conduct measured against constitutional government, equal citizenship, free expression, and the rule of law.", path: "patriotic-test#patriotic-scorecard"),
        TestSummary(id: "america-first", title: "America First Test", premise: "Policy measured by concrete benefit after costs, law, capacity, alliances, and long-term leverage are counted.", path: "america-first-test#america-first-scorecard"),
        TestSummary(id: "deal", title: "Deal Test", premise: "The advertised bargain measured against leverage, concessions, verification, delivery, durability, cost, and beneficiary.", path: "deal-test#deal-scorecard"),
        TestSummary(id: "world-standing", title: "World Standing Test", premise: "Conduct measured by its effect on credibility, alliances, expertise, financial influence, and global leverage.", path: "world-standing-test#world-standing-scorecard"),
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    BrandBar().padding(.bottom, 4)
                    Text("THE TESTS")
                        .font(.system(.largeTitle, design: .serif, weight: .bold))
                    Text("Five explicit standards. The evidence does not change when the standard does.")
                        .font(.title3)
                        .foregroundStyle(Color.tdsInkSoft)
                        .lineSpacing(4)

                    ForEach(tests) { test in
                        Link(destination: TDSLinks.page(test.path)) {
                            HStack(alignment: .top, spacing: 16) {
                                VStack(alignment: .leading, spacing: 9) {
                                    Text(test.title)
                                        .font(.system(.title2, design: .serif, weight: .bold))
                                    Text(test.premise)
                                        .font(.body)
                                        .lineSpacing(3)
                                    Text("\(applicableCount(for: test.id)) applicable case files")
                                        .font(.caption.weight(.bold))
                                        .textCase(.uppercase)
                                        .tracking(0.5)
                                }
                                Spacer(minLength: 4)
                                Image(systemName: "arrow.up.right")
                                    .font(.body.weight(.bold))
                            }
                            .foregroundStyle(Color.tdsInk)
                            .frame(maxWidth: .infinity, minHeight: 120, alignment: .leading)
                            .padding(20)
                            .background(TestTone.color(for: test.id).opacity(0.10))
                            .overlay(alignment: .leading) { Rectangle().fill(TestTone.color(for: test.id)).frame(width: 5) }
                        }
                    }
                }
                .padding(20)
            }
            .background(Color.tdsPaper.ignoresSafeArea())
            .navigationTitle("Tests")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private func applicableCount(for id: String) -> Int {
        archive.cases.filter { item in
            item.tests.contains { $0.id == id && $0.score.score != nil }
        }.count
    }
}

private struct TestSummary: Identifiable {
    let id: String
    let title: String
    let premise: String
    let path: String
}
