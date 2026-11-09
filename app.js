import { calculateDailyTotals, calculateProgress, getMealsForDate } from "./calculator.js";
import { validateCalendarDate, validateMeal, validateTarget } from "./validator.js";
import { loadMeals, loadTargets, saveMeals, saveTargets } from "./storage.js";

const elements = {
  appStatus: document.querySelector("#app-status"),
  selectedDate: document.querySelector("#selected-date"),
  mealForm: document.querySelector("#meal-form"),
  mealId: document.querySelector("#meal-id"),
  mealName: document.querySelector("#meal-name"),
  mealCalories: document.querySelector("#meal-calories"),
  mealProtein: document.querySelector("#meal-protein"),
  mealFormHeading: document.querySelector("#meal-form-heading"),
  mealSubmit: document.querySelector("#meal-submit"),
  cancelEdit: document.querySelector("#cancel-edit"),
  mealList: document.querySelector("#meal-list"),
  mealCount: document.querySelector("#meal-count"),
  emptyState: document.querySelector("#empty-state"),
  targetForm: document.querySelector("#target-form"),
  targetCalories: document.querySelector("#target-calories"),
  targetProtein: document.querySelector("#target-protein"),
  totalCalories: document.querySelector("#total-calories"),
  totalProtein: document.querySelector("#total-protein"),
  calorieTarget: document.querySelector("#calorie-target-display"),
  proteinTarget: document.querySelector("#protein-target-display"),
  calorieRemaining: document.querySelector("#calorie-remaining"),
  proteinRemaining: document.querySelector("#protein-remaining"),
  calorieStatus: document.querySelector("#calorie-status"),
  proteinStatus: document.querySelector("#protein-status")
};

const state = {
  meals: [],
  targets: {},
  selectedDate: todayAsLocalDate()
};

function todayAsLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);
}

function showMessage(message, type = "error") {
  elements.appStatus.textContent = message;
  elements.appStatus.className = message ? `message message-${type}` : "message";
  elements.appStatus.setAttribute("role", type === "error" ? "alert" : "status");
}

function setFormAvailability(available) {
  for (const form of [elements.mealForm, elements.targetForm]) {
    for (const control of form.querySelectorAll("input, button")) {
      control.disabled = !available;
    }
  }
  elements.selectedDate.disabled = !available;
}

function selectedTarget() {
  return state.targets[state.selectedDate] ?? { calories: null, protein: null };
}

function updateStatus(element, status) {
  element.textContent = status;
  element.className = `status-pill status-${status}`;
}

function render() {
  elements.selectedDate.value = state.selectedDate;
  const target = selectedTarget();
  elements.targetCalories.value = target.calories ?? "";
  elements.targetProtein.value = target.protein ?? "";

  const meals = getMealsForDate(state.meals, state.selectedDate);
  elements.mealList.replaceChildren();
  elements.emptyState.hidden = meals.length > 0;
  elements.mealCount.textContent = `${meals.length} ${meals.length === 1 ? "meal" : "meals"}`;

  for (const meal of meals) {
    const item = document.createElement("li");
    item.className = "meal-item";

    const details = document.createElement("div");
    const name = document.createElement("h4");
    name.textContent = meal.name;
    const nutrition = document.createElement("p");
    nutrition.textContent = `${formatNumber(meal.calories)} kcal · ${formatNumber(meal.protein)} g protein`;
    details.append(name, nutrition);

    const actions = document.createElement("div");
    actions.className = "meal-actions";
    actions.append(
      createMealAction("edit", "Edit", meal),
      createMealAction("delete", "Delete", meal)
    );
    item.append(details, actions);
    elements.mealList.append(item);
  }

  const totals = calculateDailyTotals(state.meals, state.selectedDate);
  const calorieProgress = calculateProgress(totals.calories, target.calories);
  const proteinProgress = calculateProgress(totals.protein, target.protein);

  elements.totalCalories.textContent = formatNumber(totals.calories);
  elements.totalProtein.textContent = formatNumber(totals.protein);
  elements.calorieTarget.textContent = formatNumber(calorieProgress.target);
  elements.proteinTarget.textContent = formatNumber(proteinProgress.target);
  elements.calorieRemaining.textContent = formatNumber(calorieProgress.remaining);
  elements.proteinRemaining.textContent = formatNumber(proteinProgress.remaining);
  updateStatus(elements.calorieStatus, calorieProgress.status);
  updateStatus(elements.proteinStatus, proteinProgress.status);
}

function createMealAction(action, label, meal) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = action === "delete" ? "button-secondary" : "";
  button.dataset.action = action;
  button.dataset.mealId = meal.id;
  button.textContent = label;
  button.setAttribute("aria-label", `${label} ${meal.name}`);
  return button;
}

function resetMealForm() {
  elements.mealForm.reset();
  elements.mealId.value = "";
  elements.mealFormHeading.textContent = "Add a meal";
  elements.mealSubmit.textContent = "Add meal";
  elements.cancelEdit.hidden = true;
}

function beginEditing(mealId) {
  const meal = state.meals.find((entry) => entry.id === mealId);
  if (!meal) {
    showMessage("That meal could not be found. Refresh the day and try again.");
    return;
  }

  state.selectedDate = meal.date;
  elements.selectedDate.value = meal.date;
  elements.mealId.value = meal.id;
  elements.mealName.value = meal.name;
  elements.mealCalories.value = String(meal.calories);
  elements.mealProtein.value = String(meal.protein);
  elements.mealFormHeading.textContent = "Edit a meal";
  elements.mealSubmit.textContent = "Save changes";
  elements.cancelEdit.hidden = false;
  render();
  elements.mealName.focus();
}

function createMealId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

elements.selectedDate.value = state.selectedDate;

elements.selectedDate.addEventListener("change", () => {
  if (!validateCalendarDate(elements.selectedDate.value)) {
    elements.selectedDate.value = state.selectedDate;
    showMessage("Choose a valid calendar date.");
    return;
  }
  state.selectedDate = elements.selectedDate.value;
  render();
  showMessage("");
});

elements.mealForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = validateMeal({
    id: elements.mealId.value || undefined,
    name: elements.mealName.value,
    calories: elements.mealCalories.value,
    protein: elements.mealProtein.value,
    date: elements.selectedDate.value
  });

  if (!result.valid) {
    showMessage(Object.values(result.errors).join(" "));
    return;
  }

  const meal = result.value;
  const isEditing = Boolean(elements.mealId.value);
  const nextMeals = isEditing
    ? state.meals.map((entry) => entry.id === meal.id ? meal : entry)
    : [...state.meals, { ...meal, id: createMealId() }];

  try {
    saveMeals(nextMeals);
    state.meals = nextMeals;
    state.selectedDate = meal.date;
    resetMealForm();
    render();
    showMessage(isEditing ? "Meal updated." : "Meal added.", "success");
  } catch (error) {
    showMessage(error.message);
  }
});

elements.cancelEdit.addEventListener("click", () => {
  resetMealForm();
  render();
  showMessage("");
});

elements.mealList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !elements.mealList.contains(button)) {
    return;
  }

  if (button.dataset.action === "edit") {
    beginEditing(button.dataset.mealId);
    return;
  }

  if (button.dataset.action === "delete") {
    const nextMeals = state.meals.filter((meal) => meal.id !== button.dataset.mealId);
    try {
      saveMeals(nextMeals);
      state.meals = nextMeals;
      if (elements.mealId.value === button.dataset.mealId) {
        resetMealForm();
      }
      render();
      showMessage("Meal deleted.", "success");
    } catch (error) {
      showMessage(error.message);
    }
  }
});

elements.targetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = validateTarget({
    date: state.selectedDate,
    calories: elements.targetCalories.value,
    protein: elements.targetProtein.value
  });

  if (!result.valid) {
    showMessage(Object.values(result.errors).join(" "));
    return;
  }

  const nextTargets = {
    ...state.targets,
    [result.value.date]: {
      calories: result.value.calories,
      protein: result.value.protein
    }
  };

  try {
    saveTargets(nextTargets);
    state.targets = nextTargets;
    render();
    showMessage("Daily targets saved.", "success");
  } catch (error) {
    showMessage(error.message);
  }
});

for (const form of [elements.mealForm, elements.targetForm]) {
  form.addEventListener("input", () => {
    if (elements.appStatus.classList.contains("message-error")) {
      showMessage("");
    }
  });
}

try {
  state.meals = loadMeals();
  state.targets = loadTargets();
  setFormAvailability(true);
  render();
} catch (error) {
  setFormAvailability(false);
  showMessage(`${error.message} Reload the page after resolving the storage issue.`);
}
