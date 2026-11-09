# Quickstart: Calorie and Nutrition Tracker

## Prerequisites

- A current desktop browser with JavaScript modules and localStorage enabled.
- Python 3 for the example static file server (or another static HTTP server).
- No application packages, framework, backend, or build step.

## Run locally

From the repository root, start a static file server:

```powershell
py -m http.server 8000
```

Open `http://localhost:8000/` in the browser. The static server only serves files; the application has no backend. To stop it, press `Ctrl+C` in the terminal.

## Run focused tests

Open `http://localhost:8000/tests/`. The page runs dependency-free browser tests for `calculator.js` and `validator.js`, and reports passing or failing assertions.

Expected results:

- Daily totals include only meals for the selected date.
- Remaining values never go below zero; status is `under`, `met`, or `exceeded` at the correct boundaries.
- Empty, negative, non-numeric, and more-than-two-decimal nutrition values are rejected; zero and valid values with up to two decimals are accepted.

## Verify the user flows

1. **Empty storage (AC-006, AC-007)**: In a fresh browser profile, open the app. Expect the current local date, an empty meal state, zero totals, and zero-target progress.
2. **Add and view meals (AC-001, AC-002, AC-005)**: Add two valid meals for one date and a meal for another. Select each date; expect only that date's meals and the sums of their calorie and protein values.
3. **Edit and delete (AC-003, AC-004)**: Edit a meal and save, then delete a meal. Expect the list and totals to reflect each change.
4. **Date-specific targets and progress (AC-007)**: Set targets for one date and compare consumed values below, equal to, and above each target. Expect `under`, `met`, and `exceeded`, with remaining no lower than zero. Select another date and verify its targets are independent; with an unset target, zero consumption is `met` and positive consumption is `exceeded`.
5. **Invalid input (AC-009)**: Try a blank name/date, blank, negative, or non-numeric nutrition value, and a value with more than two decimal places. Expect a clear correction message and no invalid record saved. Confirm valid entries remain available in the form where practical.
6. **Persistence (AC-008)**: Save meals and targets, reload the page, and select their dates. Expect all saved records and targets to remain available.
7. **Storage failure (FR-008 and edge cases)**: When browser storage is unavailable or contains unreadable data, expect a clear error rather than a false success or a claim that the saved data is empty.

For requirement definitions, see [spec.md](spec.md); for persisted fields and progress rules, see [data-model.md](data-model.md).
