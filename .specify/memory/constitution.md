<!--
Sync Impact Report
Version change: uninitialized -> 1.0.0 (first complete constitution)
Modified principles: None; this is the initial adoption.
Added principles: I. Clean Code; II. Modular Design; III. User Experience;
	IV. Input Validation; V. Acceptance-Criterion Testing; VI. Traceability;
	VII. Simplicity; VIII. Security; IX. Documentation; X. Human Review.
Added sections: Project Constraints; Development Workflow.
Removed sections: None.
Follow-up TODO: Confirm the original ratification date.
-->
# Calorie and Nutrition Tracker Constitution

## Core Principles

### I. Clean Code
**Principle:** Names MUST clearly describe their purpose, functions MUST stay small and focused, and unused code MUST be removed.
**Why it matters:** Readable code is easier to verify, maintain, and safely change.
**Application:** Name nutrition values and operations explicitly, keep each function focused on one task, and remove dead code during review.

### II. Modular Design
**Principle:** User interface, nutrition calculations, and persistence MUST be kept in separate files or clearly isolated modules.
**Why it matters:** Separation limits unintended coupling and makes each responsibility easier to test and change.
**Application:** Keep HTML and UI behavior separate from calorie or nutrient calculations, and isolate localStorage reads and writes from both.

### III. User Experience
**Principle:** The page MUST be simple to use, readable, and provide clear feedback for user actions and errors.
**Why it matters:** Clear presentation helps users record and understand nutrition information without guessing what the application did.
**Application:** Use readable labels and values, straightforward entry flows, and concise success, empty-state, and error messages.

### IV. Input Validation
**Principle:** The application MUST reject empty, negative, and non-numeric values wherever a non-negative numeric nutrition value is required, and MUST explain the error in friendly language.
**Why it matters:** Invalid values can make totals misleading and undermine trust in saved records.
**Application:** Validate entries before calculation or storage, preserve valid user input when practical, and identify how to correct rejected values.

### V. Acceptance-Criterion Testing
**Principle:** Every acceptance criterion MUST have at least one test with a stated expected result; a criterion is not complete until its test passes.
**Why it matters:** Expected results make feature behavior observable and reduce regressions.
**Application:** Define tests for nutrition calculations, validation, user feedback, and localStorage behavior from their acceptance criteria.

### VI. Traceability
**Principle:** Requirements, acceptance criteria, and tasks MUST have unique IDs using the `FR-`, `AC-`, and `T-` prefixes respectively, with references maintained between related items.
**Why it matters:** Traceable work makes it possible to see what is required, how it is verified, and whether it is implemented.
**Application:** Link each `AC-` to its relevant `FR-`, and each implementation `T-` to the requirement or acceptance criteria it addresses.

### VII. Simplicity
**Principle:** The application MUST implement only agreed features and MUST NOT add login, a backend, or external API integrations without an approved constitution amendment.
**Why it matters:** A narrow scope keeps the application understandable and respects its local-only design.
**Application:** Deliver the agreed tracker experience using browser-side code and localStorage; defer unapproved feature ideas.

### VIII. Security
**Principle:** Secrets, credentials, and tokens MUST NOT be committed to the repository.
**Why it matters:** Repository contents can be shared or retained, exposing credentials beyond their intended use.
**Application:** Keep the application free of embedded secrets and inspect staged changes for accidental credentials before committing.

### IX. Documentation
**Principle:** The README MUST explain setup, use, and project constraints, and Git commits MUST describe the intent of their changes.
**Why it matters:** Useful documentation and commit history help users operate the project and maintainers understand its evolution.
**Application:** Document the browser-based HTML, CSS, and JavaScript setup, localStorage behavior, and agreed feature scope; make commits focused and meaningfully titled.

### X. Human Review
**Principle:** AI-generated output MUST be reviewed and approved by the project owner before it is used.
**Why it matters:** Human review checks correctness, fit, and unintended changes that automated generation may miss.
**Application:** Review AI-generated code, tests, and documentation before accepting, committing, or relying on them.

## Project Constraints
The application MUST use HTML, CSS, and JavaScript, with localStorage as its only persistence mechanism. It MUST NOT require a login, backend, or external API. Any change to these constraints requires an approved constitution amendment before implementation.

## Development Workflow
Each feature MUST identify its `FR-` requirements, `AC-` acceptance criteria, and `T-` tasks, and preserve their traceability. Tests MUST state expected results for every acceptance criterion. Before a change is accepted, review its user-facing messages, validation behavior, tests, README impact, and staged files for unintended scope or secrets. AI-generated output requires project-owner review before use.

## Governance
This constitution governs project decisions and implementation. An amendment requires a proposed change, project-owner review and approval, an updated version and amendment date, and a summary of its impact. Work MUST be checked against the constitution during planning and review; conflicts MUST be resolved before the affected work is accepted.

Constitution versions follow semantic versioning: MAJOR for incompatible changes to principles or governance, MINOR for new principles or materially expanded requirements, and PATCH for clarifications and non-semantic wording changes.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2026-11-09
