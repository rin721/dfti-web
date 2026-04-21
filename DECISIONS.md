# Decisions: DFTI

## D001: Framework Selection
- **Decision**: Use React 18 + Vite (SPA) instead of Next.js.
- **Reason**: Aligns with the current runtime environment provided by AI Studio Build while maintaining high performance and ease of deployment.

## D002: Data Strategy
- **Decision**: Use local JSON files instead of a heavy database.
- **Reason**: Prototype speed, ease of versioning, and allows easy "add character" instructions for users.

## D003: UI Style
- **Decision**: "Tactical Dark" (Inter + JetBrains Mono).
- **Reason**: Matches *Delta Force* aesthetic while providing a crisp, technical feel for a "Type Indicator".

## D004: Screenshot Export Strategy
- **Decision**: Use `html2canvas` for client-side rendering of result cards.
- **Reason**: Allows for high-fidelity "screenshot-worthy" sharing without needing a complex backend rendering service or headless browser.

## D005: Result Persistence
- **Decision**: Use `localStorage` with a 10-entry rotating buffer.
- **Reason**: Simplifies persistence without requiring a database, providing immediate value for users to review past archetypes on the same device.
