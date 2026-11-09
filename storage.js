const MEALS_KEY = "calorie-tracker.meals";
const TARGETS_KEY = "calorie-tracker.targets";

function isValidStoredDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isValidNutritionNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function getLocalStorage() {
  try {
    return window.localStorage;
  } catch {
    throw new Error("Browser storage is unavailable. Saved tracker data cannot be accessed.");
  }
}

function loadJson(key, label, defaultValue, isValid) {
  let serialized;
  try {
    serialized = getLocalStorage().getItem(key);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Browser storage is unavailable.")) {
      throw error;
    }
    throw new Error(`Saved ${label} could not be read from browser storage.`);
  }

  if (serialized === null) {
    return defaultValue;
  }

  let parsed;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new Error(`Saved ${label} could not be read because its stored data is invalid.`);
  }

  if (!isValid(parsed)) {
    throw new Error(`Saved ${label} could not be read because its stored data has an invalid format.`);
  }
  return parsed;
}

function isValidMealCollection(value) {
  return Array.isArray(value) && value.every((meal) =>
    meal !== null &&
    typeof meal === "object" &&
    typeof meal.id === "string" &&
    meal.id.length > 0 &&
    typeof meal.name === "string" &&
    meal.name.trim().length > 0 &&
    isValidNutritionNumber(meal.calories) &&
    isValidNutritionNumber(meal.protein) &&
    isValidStoredDate(meal.date)
  );
}

function isValidTargetCollection(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.entries(value).every(([date, target]) =>
      isValidStoredDate(date) &&
      target !== null &&
      typeof target === "object" &&
      (target.calories === null || isValidNutritionNumber(target.calories)) &&
      (target.protein === null || isValidNutritionNumber(target.protein))
    );
}

function saveJson(key, label, value) {
  try {
    getLocalStorage().setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Browser storage is unavailable.")) {
      throw error;
    }
    throw new Error(`${label} could not be saved. Browser storage may be unavailable or full.`);
  }
}

export function loadMeals() {
  return loadJson(MEALS_KEY, "meals", [], isValidMealCollection);
}

export function saveMeals(meals) {
  if (!isValidMealCollection(meals)) {
    throw new TypeError("Meals must be a valid collection before they can be saved.");
  }
  saveJson(MEALS_KEY, "meals", meals);
}

export function loadTargets() {
  return loadJson(TARGETS_KEY, "targets", {}, isValidTargetCollection);
}

export function saveTargets(targets) {
  if (!isValidTargetCollection(targets)) {
    throw new TypeError("Daily targets must be valid before they can be saved.");
  }
  saveJson(TARGETS_KEY, "daily targets", targets);
}
