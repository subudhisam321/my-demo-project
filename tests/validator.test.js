import { validateCalendarDate, validateMeal, validateTarget } from "../validator.js";

export async function runValidatorTests(test, equal) {
  await test("accepts a meal with zero and two-decimal nutrition values", () => {
    const result = validateMeal({
      name: "Breakfast",
      calories: "0",
      protein: "12.34",
      date: "2026-11-09"
    });
    equal(result.valid, true);
    equal(result.value.calories, 0);
    equal(result.value.protein, 12.34);
  });

  await test("rejects a blank meal name", () => {
    equal(validateMeal({
      name: "   ",
      calories: "100",
      protein: "5",
      date: "2026-11-09"
    }).valid, false);
  });

  await test("rejects negative, non-numeric, and over-precision nutrition values", () => {
    for (const value of ["-1", "abc", "1.234"]) {
      equal(validateMeal({
        name: "Lunch",
        calories: value,
        protein: "5",
        date: "2026-11-09"
      }).valid, false);
    }
  });

  await test("rejects empty nutrition values and accepts large finite values without a cap", () => {
    equal(validateMeal({
      name: "Lunch",
      calories: "",
      protein: "5",
      date: "2026-11-09"
    }).valid, false);
    equal(validateMeal({
      name: "Lunch",
      calories: `${"1"}${"0".repeat(100)}`,
      protein: "5",
      date: "2026-11-09"
    }).valid, true);
  });

  await test("accepts valid calendar dates and rejects impossible dates", () => {
    equal(validateCalendarDate("2024-02-29"), true);
    equal(validateCalendarDate("2025-02-29"), false);
    equal(validateCalendarDate("2026-13-01"), false);
  });

  await test("allows each target nutrient to remain unset", () => {
    const result = validateTarget({
      date: "2026-11-09",
      calories: "",
      protein: "0"
    });
    equal(result.valid, true);
    equal(result.value.calories, null);
    equal(result.value.protein, 0);
  });

  await test("rejects invalid target values", () => {
    equal(validateTarget({
      date: "2026-11-09",
      calories: "-10",
      protein: ""
    }).valid, false);
  });
}
