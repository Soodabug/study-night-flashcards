// Keeps the study sets in the browser, so they are still there after a reload.

const STORAGE_KEY = "study-night-card-sets";

// Returns the saved sets, or the defaults when nothing usable is saved.
// `storage` can be swapped out in tests.
export function loadSets(defaults, storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.every(isSet)) return saved;
  } catch {
    // Storage blocked or the saved text is broken: start from the defaults.
  }
  return defaults;
}

// Returns true when the sets were saved.
export function saveSets(sets, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(sets));
    return true;
  } catch {
    // Storage full or blocked: the app keeps working for this visit.
    return false;
  }
}

function isSet(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.title === "string" &&
    Array.isArray(value.cards)
  );
}
