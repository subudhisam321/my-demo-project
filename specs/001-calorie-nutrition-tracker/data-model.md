# Data Model: Calorie and Nutrition Tracker

## Meal

One meal entry recorded for a calendar date.

| Field | Type | Rules |
|---|---|---|
| `id` | String | Unique identifier for editing and deleting an entry, including when names and dates match. |
| `name` | String | Required; must contain at least one non-whitespace character. |
| `calories` | Number | Required; finite, non-negative, and no more than two decimal places. No application-defined upper limit. |
| `protein` | Number | Required; finite, non-negative, and no more than two decimal places. No application-defined upper limit. |
| `date` | String | Required calendar date in `YYYY-MM-DD` form, interpreted as a local calendar day. |

Meal names and dates need not be unique. Deleting a meal does not delete its date's target.

## Daily Target

The target values associated with a particular calendar date.

| Field | Type | Rules |
|---|---|---|
| `date` | String | Calendar date in `YYYY-MM-DD` form; one target record per date. |
| `calories` | Number or unset | If set, finite, non-negative, and no more than two decimal places; no application-defined upper limit. |
| `protein` | Number or unset | If set, finite, non-negative, and no more than two decimal places; no application-defined upper limit. |

Either nutrient target may be unset independently. For progress calculations, an unset nutrient target is zero. Saving or changing targets for one date does not change targets for other dates.

Targets are persisted as a collection keyed by the `YYYY-MM-DD` date; each value contains `calories` and `protein`, with `null` representing an unset nutrient target.

## Daily Progress (derived)

Calculated for a selected date; not an independently persisted entity.

| Value | Definition |
|---|---|
| `totalCalories` | Sum of calories for meals whose date matches the selected date. |
| `totalProtein` | Sum of protein for meals whose date matches the selected date. |
| `remaining` | `max(target - consumed, 0)` for each nutrient; unset target is zero. |
| `status` | `under` when consumed is less than target, `met` when equal, and `exceeded` when greater. With an unset (zero) target, zero consumption is `met`; positive consumption is `exceeded`. |

## Persistence and Empty State

- Store the meal collection and per-date targets under distinct localStorage keys.
- Missing keys represent a fresh installation: no meals and no saved targets. Show an empty state and zero meal totals; treat unset targets as zero for progress.
- A read or parse failure is not an empty state. Report the failure to the user and do not claim that saved records were restored.
- Failed writes must be reported; do not show an unsaved change as successfully persisted.
