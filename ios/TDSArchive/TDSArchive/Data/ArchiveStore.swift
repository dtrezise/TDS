import Foundation

enum ArchiveStore {
    static func load(bundle: Bundle = .main) -> ArchivePayload {
        guard let url = bundle.url(forResource: "archive", withExtension: "json") else {
            fatalError("The bundled archive.json resource is missing.")
        }

        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder().decode(ArchivePayload.self, from: data)
        } catch {
            fatalError("The bundled archive could not be decoded: \(error.localizedDescription)")
        }
    }
}
