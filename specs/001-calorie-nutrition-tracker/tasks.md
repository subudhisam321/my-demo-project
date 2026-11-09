# Tasks: Calorie and Nutrition Tracker

**Input**: Design documents from `specs/001-calorie-nutrition-tracker/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Organization**: Tasks are grouped by user story and ordered by priority. Browser tests are included for the calculator and validator as required by the plan and project constitution.

## Phase 1: Setup

**Purpose**: Create the static page and dependency-free browser test shell.

- [X] T001 Create the page shell with module entry point and semantic app regions in `index.html` (FR-001–FR-008, AC-001–AC-008)
- [X] T002 [P] Add base layout, form, list, status, and responsive styles in `style.css` (FR-001–FR-012)
- [X] T003 [P] Create a browser test runner page that reports assertion results in `tests/index.html` (AC-001–AC-009)

## Phase 2: Foundational

**Purpose**: Provide validation and persistence modules used by all user stories.

- [X] T004 [P] Implement meal and target validation in `validator.js`: names must contain at least one non-whitespace character; dates must be valid `YYYY-MM-DD` calendar dates; nutrition values must be finite, non-negative, and have at most two decimal places, with no upper limit (FR-001, FR-006, FR-009, FR-010; AC-009)
- [X] T005 [P] Implement localStorage load/save operations for meal collections and per-date targets in `storage.js`; treat missing keys as empty data and report read, parse, and write failures to callers (FR-008; AC-008)

**Checkpoint**: Shared validation and persistence modules are ready for story implementation.

## Phase 3: User Story 1 - Record and manage meals (Priority: P1) 🎯 MVP

**Goal**: Add meals and edit or delete a meal for the selected date, rejecting invalid input.

**Independent Test**: Add a valid meal for a date, verify it appears, edit it and verify the updated values, then delete it. Try invalid required fields and nutrition values and verify no invalid meal is saved and a correction message appears.

### Tests for User Story 1

- [X] T006 [P] [US1] Add browser assertions for valid zero/decimal values and rejected blank, negative, non-numeric, and over-precision values in `tests/validator.test.js` (FR-009, FR-010; AC-009)

### Implementation for User Story 1

- [X] T007 [P] [US1] Add meal name, calories, protein, and date form controls plus a meal-list container in `index.html` (FR-001, FR-003, FR-004; AC-001, AC-003, AC-004)
- [X] T008 [US1] Implement meal creation, editing, deletion, validation feedback, and list rendering in `app.js`; use unique meal IDs and preserve valid form values when validation fails (FR-001, FR-003, FR-004, FR-009, FR-010; AC-001, AC-003, AC-004, AC-009)
- [X] T009 [US1] Connect meal create/edit/delete operations in `app.js` to `storage.js` so successful changes are persisted and failures are surfaced without false success (FR-008; AC-001, AC-003, AC-004, AC-008)

**Checkpoint**: AC-001, AC-003, AC-004, and AC-009 can be verified independently.

## Phase 4: User Story 2 - Review daily intake (Priority: P1)

**Goal**: Select a date and see only its meals, totals, or empty state.

**Independent Test**: Add meals on two dates, select each date, and verify only that date's entries and the correct calorie and protein sums appear; select an empty date and verify zero totals.

### Tests for User Story 2

- [X] T010 [P] [US2] Add browser assertions for per-date meal filtering, calorie/protein sums, and empty-day totals in `tests/calculator.test.js` (FR-002, FR-005; AC-002, AC-005, AC-006)

### Implementation for User Story 2

- [X] T011 [US2] Implement `getMealsForDate(meals, date)` and `calculateDailyTotals(meals, date)` in `calculator.js`, returning zero totals when no meals match (FR-005; AC-005, AC-006)
- [X] T012 [US2] Add a selected-date control, daily calorie/protein totals, and an empty-state region in `index.html` (FR-002, FR-005; AC-002, AC-005, AC-006)
- [X] T013 [US2] Connect date selection and selected-day list/total rendering in `app.js` using `calculator.js` (FR-002, FR-005; AC-002, AC-005, AC-006)

**Checkpoint**: AC-002, AC-005, and AC-006 can be verified independently.

## Phase 5: User Story 4 - Keep tracker data between visits (Priority: P1)

**Goal**: Restore meals and date-specific targets after reload, and report unavailable or unreadable storage.

**Independent Test**: Save meals and per-date targets, reload the page in the same browser, and verify the records remain available for their dates. Verify a storage read or write failure is reported rather than shown as success or empty data.

### Implementation for User Story 4

- [X] T014 [P] [US4] Add date-specific calorie and protein target controls to `index.html`; these controls allow target persistence to be independently verified (FR-006, FR-008; AC-008)
- [X] T015 [US4] Load persisted meals and per-date targets during app startup and persist target changes through `storage.js` in `app.js`; show explicit read/parse/write errors and do not claim failed writes succeeded (FR-006, FR-008; AC-008)

**Checkpoint**: AC-008 can be verified after target controls are available; missing storage remains a first-run empty state, while storage failures are reported.

## Phase 6: User Story 3 - Set targets and understand progress (Priority: P2)

**Goal**: Show consumed amounts, per-date targets, remaining amounts, and under/met/exceeded status.

**Independent Test**: For a selected date, verify progress below, equal to, and above its targets; verify remaining is never negative and an unset target behaves as zero. Change targets on a second date and confirm they are independent.

### Tests for User Story 3

- [X] T016 [US3] Add browser assertions for progress remaining/status boundaries and unset targets in `tests/calculator.test.js` (FR-007, FR-011; AC-007)

### Implementation for User Story 3

- [X] T017 [US3] Implement `calculateProgress(consumed, target)` in `calculator.js`, treating an unset target as zero and returning a non-negative remaining amount plus `under`, `met`, or `exceeded` status (FR-007, FR-011; AC-007)
- [X] T018 [US3] Add consumed, target, remaining, and status display regions for calories and protein in `index.html` (FR-007, FR-011; AC-007)
- [X] T019 [US3] Render selected-date progress and update it after meal or target changes in `app.js` (FR-007, FR-011; AC-007)

**Checkpoint**: AC-007 can be verified independently with the selected-date meals and targets.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Document use, run acceptance scenarios, and check requirement traceability.

- [X] T020 [P] Document local startup, tracker use, localStorage scope, and test instructions in `README.md` (FR-008, FR-012; AC-008)
- [X] T021 [P] Align the manual acceptance steps with the implemented UI and error messages in `specs/001-calorie-nutrition-tracker/quickstart.md` (AC-001–AC-009)
- [X] T022 Run the browser tests and verify all scenarios in `specs/001-calorie-nutrition-tracker/quickstart.md`; confirm every `AC-001` through `AC-009` has a passing test result and verify FR-012 exclusions are absent from the app (AC-001–AC-009, FR-012)

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; create the page shell, styles, and browser test runner.
- **Foundational (Phase 2)**: Depends on Setup; validation and persistence must be available before story implementation.
- **User Story 1 (Phase 3)**: Depends on Foundational; delivers meal entry and management.
- **User Story 2 (Phase 4)**: Depends on US1's meal list and app state; adds date filtering and totals.
- **User Story 4 (Phase 5)**: Depends on US1 meal operations and Foundational storage; adds target controls and reload/error handling before progress presentation.
- **User Story 3 (Phase 6)**: Depends on US2 totals and US4 date-specific target controls; adds progress calculations and UI.
- **Polish (Phase 7)**: Depends on all desired stories being integrated.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependency on another story.
- **US2 (P1)**: Uses the meals and shared app state from US1.
- **US4 (P1)**: Uses US1 meal operations and storage; introduces per-date target entry and reload behavior.
- **US3 (P2)**: Uses daily totals from US2 and date-specific targets from US4.

### Parallel Opportunities

- Setup tasks T002 and T003 can run alongside T001 because they touch separate files.
- Foundational tasks T004 and T005 can run in parallel because validation and persistence are separate modules.
- In US1, T006 and T007 can run in parallel after the test runner and foundational modules exist; app integration follows them.
- In US2, T010, T011, and T012 can be developed in parallel after US1, as they touch separate files; T013 integrates them.
- In US4, T014 can be completed independently before T015 integrates the controls with storage.
- In US3, T017 and T018 can be developed in parallel after US2 and US4; T016 tests the shared `calculator.test.js` file after T010 and can proceed alongside T017; T019 integrates them.
- In Polish, T020 and T021 can run in parallel; T022 validates the completed implementation and documentation.

## Parallel Examples

### User Story 1

```text
Task: T006 Add validator assertions in tests/validator.test.js
Task: T007 Add meal form controls and list container in index.html
```

### User Story 2

```text
Task: T010 Add daily filtering and totals assertions in tests/calculator.test.js
Task: T011 [US2] Implement daily calculation functions in calculator.js
Task: T012 [US2] Add date selector, totals, and empty state in index.html
```

### User Story 3

```text
Task: T016 Add progress assertions in tests/calculator.test.js
Task: T017 [US3] Implement progress calculations in calculator.js
Task: T018 [US3] Add progress display regions in index.html
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundational tasks.
2. Complete US1 meal entry, edit/delete, validation, and persistence.
3. Verify the US1 independent test before continuing.

### Incremental Delivery

1. Add US2 date selection and accurate daily totals.
2. Add US4 reload persistence for meals and date-specific targets, including explicit storage errors.
3. Add US3 target progress and status presentation.
4. Run all browser tests and the acceptance scenarios in `quickstart.md`.

Each story adds a verifiable increment while keeping the agreed local-only scope.
