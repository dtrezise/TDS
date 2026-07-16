import SwiftUI

@main
struct TDSArchiveApp: App {
    private let archive = ArchiveStore.load()

    var body: some Scene {
        WindowGroup {
            RootTabView(archive: archive)
                .tint(.tdsRed)
        }
    }
}
