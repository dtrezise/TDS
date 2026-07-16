import Foundation

struct ArchivePayload: Decodable {
    let schemaVersion: Int
    let lastReviewed: String
    let generatedFrom: String
    let categories: [String]
    let cases: [CaseFile]
}

struct CaseFile: Decodable, Identifiable, Hashable {
    let id: String
    let title: String
    let date: String
    let sortDate: String
    let category: String
    let status: String
    let summary: String
    let significance: String
    let subjects: [String]
    let tags: [String]
    let sources: [EvidenceSource]
    let faithAnalysis: String?
    let faithLens: [FaithLens]?
    let featured: Bool?
    let tests: [TestLens]

    var isFeatured: Bool { featured == true }
}

struct EvidenceSource: Decodable, Hashable, Identifiable {
    let label: String
    let publisher: String
    let url: URL
    let kind: String

    var id: URL { url }
}

struct FaithLens: Decodable, Hashable {
    let teaching: String
    let reference: String
    let url: URL
}

struct TestLens: Decodable, Hashable, Identifiable {
    let id: String
    let label: String
    let href: String
    let finding: String
    let analysis: String
    let score: TestScore
}

struct TestScore: Decodable, Hashable {
    let testId: String
    let label: String
    let href: String
    let score: Int?
    let earnedPoints: Int
    let possiblePoints: Int
    let verdict: String
    let finding: String
    let breakdown: [CriterionScore]
}

struct CriterionScore: Decodable, Hashable, Identifiable {
    let id: String
    let label: String
    let points: Int?
    let maxPoints: Int
    let rationale: String
}
