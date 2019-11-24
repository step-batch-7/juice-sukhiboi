const assert = require('assert');
const saveRecord = require('./../src/saveRecord').saveRecord;

describe("#saveRecord()", () => {
  it("should return the given transaction object", () => {
    const transaction = {
      beverage: "Oranges",
      empId: 11111,
      qty: 2
    };
    const actual = saveRecord(transaction);
    const expected = {
      beverage: "Oranges",
      empId: 11111,
      qty: 2
    };
    assert.deepStrictEqual(actual, expected);
  });
});