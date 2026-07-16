import SwiftUI

extension Color {
    static let tdsInk = Color(red: 16 / 255, green: 21 / 255, blue: 28 / 255)
    static let tdsInkSoft = Color(red: 38 / 255, green: 48 / 255, blue: 59 / 255)
    static let tdsPaper = Color(red: 245 / 255, green: 240 / 255, blue: 231 / 255)
    static let tdsPaperBright = Color(red: 1, green: 253 / 255, blue: 248 / 255)
    static let tdsRed = Color(red: 181 / 255, green: 43 / 255, blue: 36 / 255)
    static let tdsGold = Color(red: 188 / 255, green: 141 / 255, blue: 63 / 255)
    static let tdsBlue = Color(red: 25 / 255, green: 49 / 255, blue: 72 / 255)
}

enum TDSLinks {
    static let site = URL(string: "https://dtrezise.github.io/TDS/")!

    static func evidence(_ id: String) -> URL {
        URL(string: "https://dtrezise.github.io/TDS/#\(id)")!
    }

    static func page(_ path: String) -> URL {
        let parts = path.split(separator: "#", maxSplits: 1).map(String.init)
        let trimmedPath = parts[0].trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        var components = URLComponents(string: "https://dtrezise.github.io/TDS/\(trimmedPath)/")!
        components.fragment = parts.count > 1 ? parts[1] : nil
        return components.url!
    }
}

enum TestTone {
    static func color(for id: String) -> Color {
        switch id {
        case "christianity": .tdsBlue
        case "patriotic": Color(red: 154 / 255, green: 96 / 255, blue: 29 / 255)
        case "america-first": Color(red: 47 / 255, green: 102 / 255, blue: 85 / 255)
        case "deal": Color(red: 107 / 255, green: 74 / 255, blue: 115 / 255)
        case "world-standing": Color(red: 31 / 255, green: 104 / 255, blue: 117 / 255)
        default: .tdsInk
        }
    }
}
