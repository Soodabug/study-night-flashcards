import { expect } from "chai";
import { loadSets, saveSets } from "../app/src/storage.js";

// A stand-in for the browser's localStorage.
function fakeStorage(initial = {}) {
  const items = { ...initial };
  return {
    getItem: (key) => (key in items ? items[key] : null),
    setItem: (key, value) => {
      items[key] = String(value);
    },
  };
}

const defaults = [{ id: 1, title: "Sample", cards: [] }];

describe("storage", () => {
  it("returns the defaults when nothing is saved", () => {
    expect(loadSets(defaults, fakeStorage())).to.equal(defaults);
  });

  it("returns what was saved before", () => {
    const storage = fakeStorage();
    const sets = [
      { id: 1, title: "Mine", cards: [{ term: "a", description: "b" }] },
    ];

    expect(saveSets(sets, storage)).to.equal(true);
    expect(loadSets(defaults, storage)).to.deep.equal(sets);
  });

  it("falls back to the defaults when the saved text is broken", () => {
    const storage = fakeStorage({ "study-night-card-sets": "{not json" });
    expect(loadSets(defaults, storage)).to.equal(defaults);
  });

  it("falls back to the defaults when the saved data has the wrong shape", () => {
    const storage = fakeStorage({
      "study-night-card-sets": JSON.stringify([{ name: "no title, no cards" }]),
    });
    expect(loadSets(defaults, storage)).to.equal(defaults);
  });

  it("does not crash when storage is blocked", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };

    expect(loadSets(defaults, blocked)).to.equal(defaults);
    expect(saveSets(defaults, blocked)).to.equal(false);
  });
});
