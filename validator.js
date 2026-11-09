const DECIMAL_VALUE_PATTERN = /^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/;

export function validateCalendarDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validateNutritionValue(value, optional = false) {
  const text = value === null || value === undefined ? "" : String(value).trim();
  if (text === "") {
    return optional
      ? { valid: true, value: null }
      : { valid: false, error: "Enter a non-negative number with up to 2 decimal places." };
  }

  if (!DECIMAL_VALUE_PATTERN.test(text)) {
    return { valid: false, error: "Enter a non-negative number with up to 2 decimal places." };
  }

  const number = Number(text);
  if (!Number.isFinite(number) || number < 0) {
    return { valid: false, error: "Enter a finite, non-negative number." };
  }

  return { valid: true, value: number };
}

export function validateMeal(meal) {
  const errors = {};
  const name = typeof meal.name === "string" ? meal.name.trim() : "";
  const date = typeof meal.date === "string" ? meal.date.trim() : "";
  const calories = validateNutritionValue(meal.calories);
  const protein = validateNutritionValue(meal.protein);

  if (!name) {
    errors.name = "Enter a meal name.";
  }
  if (!validateCalendarDate(date)) {
    errors.date = "Choose a valid date.";
  }
  if (!calories.valid) {
    errors.calories = calories.error;
  }
  if (!protein.valid) {
    errors.protein = protein.error;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors, value: null };
  }

  return {
    valid: true,
    errors: {},
    value: {
      ...(meal.id ? { id: String(meal.id) } : {}),
      name,
      calories: calories.value,
      protein: protein.value,
      date
    }
  };
}

export function validateTarget(target) {
  const errors = {};
  const date = typeof target.date === "string" ? target.date.trim() : "";
  const calories = validateNutritionValue(target.calories, true);
  const protein = validateNutritionValue(target.protein, true);

  if (!validateCalendarDate(date)) {
    errors.date = "Choose a valid date before saving targets.";
  }
  if (!calories.valid) {
    errors.calories = calories.error;
  }
  if (!protein.valid) {
    errors.protein = protein.error;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors, value: null };
  }

  return {
    valid: true,
    errors: {},
    value: { date, calories: calories.value, protein: protein.value }
  };
}
