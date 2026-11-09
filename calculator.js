export function getMealsForDate(meals, date) {
  return meals.filter((meal) => meal.date === date);
}

function roundToHundredths(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateDailyTotals(meals, date) {
  const dailyMeals = getMealsForDate(meals, date);
  const calories = dailyMeals.reduce((total, meal) => total + meal.calories, 0);
  const protein = dailyMeals.reduce((total, meal) => total + meal.protein, 0);

  return {
    calories: roundToHundredths(calories),
    protein: roundToHundredths(protein)
  };
}

export function calculateProgress(consumed, target) {
  const effectiveTarget = target ?? 0;
  if (!Number.isFinite(consumed) || consumed < 0 ||
      !Number.isFinite(effectiveTarget) || effectiveTarget < 0) {
    throw new TypeError("Progress values must be finite, non-negative numbers.");
  }

  const remaining = roundToHundredths(Math.max(effectiveTarget - consumed, 0));
  const status = consumed < effectiveTarget
    ? "under"
    : consumed === effectiveTarget
      ? "met"
      : "exceeded";

  return { consumed, target: effectiveTarget, remaining, status };
}
