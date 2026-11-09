# Research: Calorie and Nutrition Tracker

## Decisions

### Browser-native static application

- **Decision**: Implement with native HTML, CSS, and browser JavaScript modules; do not add a framework, runtime package, build step, backend, or external service.
- **Rationale**: This follows the user's explicit stack and keeps the application small and directly runnable as a static site.
- **Alternatives considered**: A framework or server-rendered application; both add dependencies and conflict with the requested scope.

### Browser localStorage persistence

- **Decision**: Persist meal records and date-specific targets in localStorage. Treat absent keys as a first-run empty state; surface read, parse, and write failures to the user rather than claiming data was loaded or saved.
- **Rationale**: localStorage is the only persistence mechanism permitted by the project constitution and preserves data across reloads in the same browser profile.
- **Alternatives considered**: A backend, database, or file export; these are outside the approved scope.

### Separate modules and browser-based tests

- **Decision**: Keep UI, calculations, validation, and storage in the user-requested files. Add a minimal browser test page with hand-written assertions for calculator and validator functions; do not install a test framework.
- **Rationale**: The division satisfies the modularity principle while keeping test setup aligned with the no-framework requirement.
- **Alternatives considered**: A package-managed test runner or framework; both introduce unnecessary dependencies. Manual-only testing would not provide repeatable focused checks for calculation and validation behavior.

### Date-specific daily targets and zero for unset targets

- **Decision**: Associate targets with calendar dates. When a nutrient has no target on a date, treat its target as zero for displayed progress and status.
- **Rationale**: These are explicit product decisions recorded in the feature specification.
- **Alternatives considered**: A single target shared across dates or treating an unset target as unavailable; both conflict with the clarified feature behavior.

## Research Tasks

No unresolved technical questions, external integrations, or dependencies remain. No external research is required for this plan.
