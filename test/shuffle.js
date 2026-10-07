import { expect } from "chai";
import { shuffle } from "../app/src/shuffle.js";

describe("shuffle()", () => {
  it("keeps same items & length but usually changes order", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6];
    const result = shuffle(arr);

    expect(result).to.have.lengthOf(arr.length);
    expect([...result].sort()).to.deep.equal([...arr].sort());

    let sameOrder = 0;
    for (let i = 0; i < 10; i++) {
      const r = shuffle(arr);
      if (r.every((v, i2) => v === arr[i2])) sameOrder++;
    }
    expect(sameOrder).to.be.below(3);
  });

  it("does not change the array it was given", () => {
    const arr = [1, 2, 3, 4, 5];
    shuffle(arr);
    expect(arr).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it("handles an empty array", () => {
    expect(shuffle([])).to.deep.equal([]);
  });
});
