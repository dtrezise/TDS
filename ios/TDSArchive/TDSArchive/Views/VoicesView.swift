import SwiftUI

struct VoicesView: View {
    private let sections = [
        VoiceSection(title: "Rooftops", eyebrow: "Faithful resistance", description: "Christian leaders, pastors, historians, writers, and movements resisting Christian nationalism and offering faithful alternatives.", path: "rooftops", color: Color.tdsBlue),
        VoiceSection(title: "Blind Eyes", eyebrow: "Documented alignment", description: "A sourced record of leaders and institutions that have excused, sanctified, or materially advanced Trump-aligned Christian nationalism.", path: "blind-eyes", color: Color(red: 154 / 255, green: 96 / 255, blue: 29 / 255)),
        VoiceSection(title: "Anti Christ", eyebrow: "Conduct against teaching", description: "A category-by-category comparison of documented conduct with commandments, the Beatitudes, the fruit of the Spirit, and Jesus's teaching.", path: "anti-christ", color: Color.tdsRed),
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    BrandBar().padding(.bottom, 4)
                    Text("VOICES")
                        .font(.system(.largeTitle, design: .serif, weight: .bold))
                    Text("Hear the resistance. Examine the complicity. Test the conduct.")
                        .font(.title3)
                        .foregroundStyle(Color.tdsInkSoft)
                        .lineSpacing(4)

                    ForEach(sections) { section in
                        Link(destination: TDSLinks.page(section.path)) {
                            VStack(alignment: .leading, spacing: 12) {
                                Text(section.eyebrow.uppercased())
                                    .font(.caption2.weight(.heavy))
                                    .tracking(0.7)
                                Text(section.title)
                                    .font(.system(.title, design: .serif, weight: .bold))
                                Text(section.description)
                                    .font(.body)
                                    .lineSpacing(3)
                                Label("Open collection", systemImage: "arrow.up.right")
                                    .font(.caption.weight(.bold))
                                    .frame(minHeight: 44)
                            }
                            .foregroundStyle(Color.tdsInk)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(20)
                            .background(Color.tdsPaperBright)
                            .overlay(alignment: .top) { Rectangle().fill(section.color).frame(height: 5) }
                            .overlay(Rectangle().stroke(Color.tdsInk.opacity(0.2)))
                        }
                    }
                }
                .padding(20)
            }
            .background(Color.tdsPaper.ignoresSafeArea())
            .navigationTitle("Voices")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

private struct VoiceSection: Identifiable {
    let title: String
    let eyebrow: String
    let description: String
    let path: String
    let color: Color

    var id: String { path }
}
