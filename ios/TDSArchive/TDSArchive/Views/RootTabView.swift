import SwiftUI

struct RootTabView: View {
    let archive: ArchivePayload

    var body: some View {
        TabView {
            EvidenceListView(archive: archive)
                .tabItem { Label("Evidence", systemImage: "doc.text.magnifyingglass") }

            VoicesView()
                .tabItem { Label("Voices", systemImage: "person.3") }

            TestsView(archive: archive)
                .tabItem { Label("Tests", systemImage: "checkmark.seal") }

            MethodsView(archive: archive)
                .tabItem { Label("Methods", systemImage: "checklist") }
        }
    }
}

struct BrandBar: View {
    var body: some View {
        HStack(spacing: 10) {
            Text("TDS")
                .font(.system(.title3, design: .serif, weight: .black))
                .foregroundStyle(.white)
                .padding(.horizontal, 10)
                .padding(.vertical, 8)
                .background(Color.tdsRed)

            Text("TRUMP DERANGEMENT SYNDROME")
                .font(.caption.weight(.heavy))
                .tracking(0.45)
                .foregroundStyle(Color.tdsInk)

            Spacer(minLength: 0)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("TDS, Trump Derangement Syndrome")
    }
}

struct ArchiveHero: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            BrandBar()

            Divider().overlay(Color.tdsRed)

            Text("THE EVIDENCE\nARCHIVE")
                .font(.system(size: 34, weight: .black, design: .serif))
                .tracking(-1.2)
                .foregroundStyle(Color.tdsInk)
                .lineLimit(2)
                .minimumScaleFactor(0.72)

            Text("THE DERANGEMENT IS DENYING THE RECORD.")
                .font(.caption.weight(.black))
                .tracking(0.7)
                .foregroundStyle(Color.tdsRed)

            Text("Accountability is not derangement. Refusing the record is.")
                .font(.title3.weight(.semibold))
                .foregroundStyle(Color.tdsInkSoft)
                .padding(.top, 4)
        }
        .padding(20)
        .background(
            LinearGradient(
                colors: [.tdsPaperBright, .tdsPaper],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .overlay(alignment: .topTrailing) {
            Rectangle()
                .fill(Color.tdsBlue)
                .frame(width: 82, height: 8)
                .padding(.top, 20)
        }
        .overlay(Rectangle().stroke(Color.tdsInk, lineWidth: 1))
    }
}
