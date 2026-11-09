# Feature Specification: Calorie and Nutrition Tracker

**Feature Branch**: `not created`

**Created**: 2026-11-09

**Status**: Draft

**Input**: Build a simple calorie and nutrition tracker for one user with no login. Add meals with a name, calories, protein, and date; view, edit, and delete meals for a selected day; show daily calorie and protein totals; set daily calorie and protein targets; show consumed versus target, remaining, and under/met/exceeded status; and retain data after reload. Login, multiple users, a food database, external APIs, and a mobile app are out of scope. The business-rules field contained a placeholder rather than mentor answers.

## Clarifications

### Session 2026-11-09

- Q: Should calorie and protein targets be a single setting that applies to every day, or should the user be able to set different targets for each date? → A: Targets are set separately for each date.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Record and manage meals (Priority: P1)

As the sole user, I want to record meals and manage the entries for a selected day so that my daily food intake is accurate.

**Why this priority**: Meal records are the source data for the tracker; without them the user cannot calculate or review nutrition totals.

**Independent Test**: Add a meal for a date, find it in that day's list, edit it, and delete it.

**Acceptance Scenarios**:

1. **Given** a valid meal entry and its date, **When** I save it, **Then** it appears in the list for that date (AC-001).
2. **Given** a selected date with a saved meal, **When** I edit or delete that meal, **Then** the list reflects the change (AC-003, AC-004).

### User Story 2 - Review daily intake (Priority: P1)

As the sole user, I want to select a day and see all its meals and nutrition totals so that I can understand what I consumed on that day.

**Why this priority**: Viewing entries and totals provides the core tracking value after meals are recorded.

**Independent Test**: Create multiple meals for one date and another date, select each date, and compare the displayed meals and totals with the entries.

**Acceptance Scenarios**:

1. **Given** saved meals on multiple dates, **When** I select a date, **Then** I see only meals for that date and the totals for those meals (AC-002, AC-005).
2. **Given** no meals on a selected date, **When** I view that date, **Then** I see an empty state and zero daily totals (AC-006).

### User Story 3 - Set targets and understand progress (Priority: P2)

As the sole user, I want to set daily calorie and protein targets and compare my intake with them so that I can see whether I am under, at, or over my goals.

**Why this priority**: Targets add context to the daily totals and let the user assess progress.

**Independent Test**: Set both targets, record intake below, at, and above each target, and verify the displayed consumed amounts, remaining amounts, and statuses.

**Acceptance Scenarios**:

1. **Given** targets are set, **When** I view a day, **Then** I see consumed amounts, targets, remaining amounts, and a status for calories and protein (AC-007).
2. **Given** no target has been set for a nutrient, **When** I view progress for that nutrient, **Then** the tracker treats and displays its target as zero, with zero consumption marked `met` and positive consumption marked `exceeded` (AC-007).

### User Story 4 - Keep tracker data between visits (Priority: P1)

As the sole user, I want saved meals and targets to remain available after reloading the page so that I do not have to re-enter my records.

**Why this priority**: Data that disappears on reload would make ongoing tracking unreliable.

**Independent Test**: Save meals and targets, reload the page in the same browser, and verify that the saved information remains available.

**Acceptance Scenarios**:

1. **Given** I have saved meals and targets, **When** I reload the page in the same browser, **Then** those meals and targets are still available (AC-008).

### Edge Cases

- A meal list is empty for the selected date: show an empty state and totals of zero.
- A user enters an empty, negative, or non-numeric calorie, protein, or target value: reject it, explain how to correct it, and do not save invalid data.
- Calorie and protein amounts or targets have more than two decimal places: reject the value with a correction message.
- A target has not been set: treat that nutrient's target as zero for progress display and status.
- A selected date has meals whose totals equal a target exactly: show a `met` status for that nutrient.
- A nutrient total exceeds its target: show an `exceeded` status and zero remaining, as assumed below.
- Two meals have the same name and date: treat them as separate entries.
- A date or meal name is missing or invalid: do not save the meal and tell the user what needs correction.
- Stored data is unavailable or cannot be read after a reload: report that saved information could not be loaded rather than showing it as successfully restored.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The tracker MUST let the user add a meal with a non-empty name, calorie amount, protein amount, and calendar date. (AC-001, AC-009)
- **FR-002**: The tracker MUST let the user select a date and show only the meals recorded for that date. (AC-002)
- **FR-003**: The tracker MUST let the user edit a meal recorded for the selected date. (AC-003)
- **FR-004**: The tracker MUST let the user delete a meal recorded for the selected date. (AC-004)
- **FR-005**: The tracker MUST show the sum of calories and the sum of protein for all meals recorded for the selected date. (AC-005)
- **FR-006**: The tracker MUST let the user set separate daily calorie and protein targets for each date and show that date's saved targets when reviewing it. (AC-007, AC-008)
- **FR-007**: For each nutrient, the tracker MUST show the amount consumed, the target, the amount remaining, and whether intake is under, met, or exceeded. (AC-007)
- **FR-008**: The tracker MUST retain saved meals and targets after a page reload in the same browser. (AC-008)
- **FR-009**: The tracker MUST reject empty, negative, and non-numeric nutrition amounts, and MUST provide a clear correction message. Zero is allowed. There is no upper limit for calorie or protein amounts or targets.
- **FR-010**: The tracker MUST accept calorie and protein amounts and targets with up to two decimal places, and reject values with greater precision.
- **FR-011**: When no target is set for a nutrient, the tracker MUST treat its target as zero for progress display and status.
- **FR-012**: The tracker MUST provide a way to use it without login or account creation, and MUST NOT provide multi-user support, a food database, external API integrations, or a mobile app as part of this feature.

### Acceptance Criteria

- **AC-001** *(FR-001)*: **Given** the user enters a valid meal name, calorie amount, protein amount, and date, **When** the user saves the meal, **Then** the meal is recorded and appears in that date's meal list.
- **AC-002** *(FR-002)*: **Given** meals exist for more than one date, **When** the user selects a date, **Then** only meals recorded for the selected date are shown.
- **AC-003** *(FR-003)*: **Given** a meal is listed for the selected date, **When** the user edits and saves its details, **Then** the updated details appear in that date's list and the daily totals reflect the update.
- **AC-004** *(FR-004)*: **Given** a meal is listed for the selected date, **When** the user deletes it, **Then** it no longer appears and the daily totals reflect its removal.
- **AC-005** *(FR-005)*: **Given** a selected date has multiple meals, **When** the user views daily totals, **Then** the calorie total equals the sum of those meals' calories and the protein total equals the sum of those meals' protein.
- **AC-006** *(FR-002, FR-005)*: **Given** no meals are recorded for the selected date, **When** the user views that date, **Then** the tracker shows an empty state and calorie and protein totals of zero.
- **AC-007** *(FR-006, FR-007, FR-011)*: **Given** the user views a date, **When** the tracker shows calorie and protein progress, **Then** it shows consumed amounts, that date's targets, remaining amounts, and `under`, `met`, or `exceeded` status for each nutrient. For a set target, intake below it is `under`, equal to it is `met`, and above it is `exceeded`. If a target is unset for that date, the tracker treats and displays it as zero; zero consumption is `met`, positive consumption is `exceeded`, and remaining is zero.
- **AC-008** *(FR-006, FR-008)*: **Given** the user has saved meals and targets, **When** the page is reloaded in the same browser, **Then** the saved meals and targets remain available.
- **AC-009** *(FR-001, FR-009, FR-010)*: **Given** a required meal field is missing or invalid, or a nutrition amount is empty, negative, non-numeric, or has more than two decimal places, **When** the user tries to save it, **Then** the tracker does not save the invalid meal, explains the correction, and preserves valid entered information where practical. Non-negative amounts with up to two decimal places are accepted without an upper limit.

### Key Entities

- **Meal**: A single food-intake record with a name, calorie amount, protein amount, and calendar date. Multiple meals may have the same name and date.
- **Daily target**: The calorie and protein goal values associated with a specific date and used to assess that day's intake.
- **Daily progress**: The selected day's calorie and protein totals compared with their respective targets, including remaining amounts and status; an unset target is treated and displayed as zero.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can record a meal, including its date and nutrition amounts, in under one minute during a usability test.
- **SC-002**: In all defined test examples, the displayed daily calorie and protein totals equal the sums of the meals for the selected date.
- **SC-003**: In all defined reload tests, every saved meal and target remains available after reloading in the same browser.
- **SC-004**: In 9 out of 10 usability tests where both targets are set, users can identify the consumed amount, remaining amount, and status for each nutrient within 10 seconds.

## Assumptions

- The tracker is for one person and does not require login or support separate user profiles.
- Saved information is expected to remain available in the same browser after a reload; cross-device synchronization and recovery after browser data is cleared are not required.
- A newly opened tracker initially shows the current local calendar date.
- Daily calorie and protein targets are set independently for each date.
- A zero calorie amount, protein amount, or target is valid; negative, empty, and non-numeric nutrition amounts are invalid, consistent with the project constitution.
- For a set target, remaining is never shown as a negative amount: it is zero when consumption meets or exceeds the target. Status communicates whether the target was met or exceeded.
- A meal name must contain at least one non-whitespace character, and the date must be a valid calendar date. No additional meal-name format restrictions are specified.
- Meal records and targets are kept only for the sole user's local tracker; login, multiple users, food databases, external APIs, and mobile apps are excluded.
