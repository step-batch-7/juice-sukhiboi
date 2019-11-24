const assert = require('assert');
const query = require('./../src/query').query;

describe("#query()", () => {
  it("should return the given transaction object", () => {
    const transaction = {
      empId: 11111
    };
    const actual = query(transaction);
    const expected = {
      empId: 11111
    };
    assert.deepStrictEqual(actual, expected);
  });
});