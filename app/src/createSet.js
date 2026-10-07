// This file generates the form to create a new Study Set.

import { renderCardSetsPage } from "./cardSetsPage.js";
import { showError } from "./errors.js";
import { saveSets } from "./storage.js";
import {
  createLabel,
  createInput,
  createSubmitButton,
} from "./utilityRenderFunctions.js";

/**
 * Build the "Create Set" form.
 * @param {Array} setCards  Existing sets array (mutated on submit).
 */
const createSetForm = (setCards) => {
  const form = document.createElement("form");
  form.setAttribute("data-cy", "set_form");
  form.className = "panel notVisible";

  // Title field
  const label = createLabel("Name of the set", "titleInput");
  const input = createInput("titleInput");
  input.setAttribute("data-cy", "create-set-name");

  // Submit
  const submitButton = createSubmitButton("Create set");
  submitButton.setAttribute("data-cy", "create-set-submit");

  // Inline error placeholder (hidden by default)
  const errorEl = document.createElement("p");
  errorEl.setAttribute("data-cy", "error-message");
  errorEl.classList.add("notVisible");

  form.addEventListener("submit", (e) => submitSet(e, setCards));

  form.append(label, input, submitButton, errorEl);
  return form;
};

/**
 * Handle submit: validate, create set, show toast, re-render sets page.
 */
const submitSet = (e, setCards) => {
  e.preventDefault();

  const title = e.target.titleInput.value;

  // Validation
  if (!title || !title.trim()) {
    showError("TITLE CANNOT BE EMPTY");

    let err = e.target.querySelector('[data-cy="error-message"]');
    if (!err) {
      err = document.createElement("p");
      err.setAttribute("data-cy", "error-message");
      e.target.append(err);
    }
    err.textContent = "TITLE CANNOT BE EMPTY";
    err.classList.remove("notVisible");
    return;
  }

  // Create new set
  const id = setCards.length ? setCards[setCards.length - 1].id + 1 : 1;
  setCards.push({ id, title: title.trim(), cards: [] });
  saveSets(setCards);

  // Success toast (attach to body so it survives re-render)
  const toast = document.createElement("div");
  toast.setAttribute("data-cy", "toast-success");
  toast.textContent = "Set created";
  toast.className = "toast";
  document.body.appendChild(toast);

  // Auto-remove toast after a short delay
  setTimeout(() => toast.remove(), 1500);

  // Re-render sets page
  renderCardSetsPage();
};

export { createSetForm };
