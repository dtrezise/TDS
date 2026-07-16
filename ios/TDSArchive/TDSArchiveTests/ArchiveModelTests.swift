import XCTest
@testable import TDSArchive

final class ArchiveModelTests: XCTestCase {
    func testDecodesMinimumArchivePayload() throws {
        let json = """
        {
          "schemaVersion": 1,
          "lastReviewed": "July 15, 2026",
          "generatedFrom": "test fixture",
          "categories": [],
          "cases": []
        }
        """

        let payload = try JSONDecoder().decode(ArchivePayload.self, from: Data(json.utf8))
        XCTAssertEqual(payload.schemaVersion, 1)
        XCTAssertTrue(payload.cases.isEmpty)
    }
}
