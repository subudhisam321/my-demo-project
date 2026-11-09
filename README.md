# Calorie and Nutrition Tracker

A single-user meal and nutrition tracker built with browser-native HTML, CSS, and JavaScript. Meals and date-specific calorie and protein targets are saved in the current browser's localStorage; there is no login, backend, or external service.

## Run

Serve this directory with any static HTTP server, then open its root page. For example, with Python 3 installed:

```powershell
py -m http.server 8000
```

Open `http://localhost:8000/`. Data stays in that browser profile and is not synchronized to other devices. Clearing browser site data removes saved meals and targets.

## Use

Select a date, enter a meal name and nutrition values, then choose **Add meal**. Use **Edit** or **Delete** beside a meal to change the selected day's entries. Set calorie and protein targets for the selected date; a blank target is treated as zero. Values must be non-negative and have at most two decimal places.

## Validate

Open `http://localhost:8000/tests/` to run the dependency-free browser tests for nutrition calculations and input validation. Manual end-to-end scenarios are in [specs/001-calorie-nutrition-tracker/quickstart.md](specs/001-calorie-nutrition-tracker/quickstart.md).
