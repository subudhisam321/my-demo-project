import { calculateDailyTotals, calculateProgress, getMealsForDate } from "../calculator.js";

export async function runCalculatorTests(test, equal) {
  const meals = [
    { id: "a", name: "Breakfast", date: "2026-11-09", calories: 100.1, protein: 10.1 },
    { id: "b", name: "Lunch", date: "2026-11-09", calories: 200.2, protein: 20.2 },
    { id: "c", name: "Snack", date: "2026-11-10", calories: 50, protein: 3 }
  ];

  await test("filters meals to the selected date", () => {
    equal(getMealsForDate(meals, "2026-11-09").length, 2);
  });

  await test("sums selected-day calories and protein to two decimal places", () => {
    const totals = calculateDailyTotals(meals, "2026-11-09");
    equal(totals.calories, 300.3);
    equal(totals.protein, 30.3);
  });

  await test("returns zero totals for an empty day", () => {
    const totals = calculateDailyTotals(meals, "2026-11-11");
    equal(totals.calories, 0);
    equal(totals.protein, 0);
  });

  await test("calculates under, met, and exceeded progress with non-negative remaining", () => {
    equal(calculateProgress(8, 10).status, "under");
    equal(calculateProgress(10, 10).status, "met");
    const exceeded = calculateProgress(12, 10);
    equal(exceeded.status, "exceeded");
    equal(exceeded.remaining, 0);
  });

  await test("treats an unset target as zero", () => {
    equal(calculateProgress(0, null).status, "met");
    equal(calculateProgress(1, undefined).status, "exceeded");
    equal(calculateProgress(1, null).remaining, 0);
  });
}
