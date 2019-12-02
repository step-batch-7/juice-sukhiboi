const chai = require("chai");
const assert = chai.assert;
const {
  getOperation,
  getOptions,
  optionParser
} = require("./../src/optionLib");
const { query } = require("./../src/query");
const { saveRecord } = require("./../src/saveRecord");

describe("#getOperation()", function() {
  it("should return the saveRecord function when save command is given", function() {
    const userArgs = "--save --beverage Orange --empId 11111 --qty 1".split(
      " "
    );
    const actual = getOperation(userArgs);
    const expected = saveRecord;
    assert.deepStrictEqual(actual, expected);
  });
  it("should return the query function when query command given", function() {
    const userArgs = "--query --empId 11111".split(" ");
    const actual = getOperation(userArgs);
    const expected = query;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#getOptions()", () => {
  it("should return save transaction prototype when save command is given", () => {
    const expected = {
      beverage: undefined,
      empId: undefined,
      qty: undefined
    };
    const operation = "--save";
    const actual = getOptions(operation);
    assert.deepStrictEqual(actual, expected);
  });
  it("should return query transaction prototype wrong query command is given", () => {
    const expected = {
      beverage: undefined,
      empId: undefined,
      date: undefined
    };
    const operation = "--query";
    const actual = getOptions(operation);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#optionParser()", () => {
  it("should updtae the transaction details", () => {
    const oldTransactionDetails = {
      beverage: undefined,
      empId: undefined,
      qty: undefined
    };
    const args = "--beverage Orange --empId 11111 --qty 2".split(" ");
    const actual = optionParser(oldTransactionDetails, args);
    const expected = {
      beverage: "Orange",
      empId: "11111",
      qty: "2"
    };
    assert.deepStrictEqual(actual, expected);
  });
});
