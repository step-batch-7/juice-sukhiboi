const assert = require("assert");
const utils = require("./../src/utils");

const formatArgs = utils.formatArgs;
const getOperation = utils.getOperation;
const parseTransaction = utils.parseTransaction;
const getOperationResult = utils.getOperationResult;

const saveRecord = require("./../src/saveRecord").saveRecord;
const query = require("./../src/query").query;

describe("#formatArgs()", () => {
  it("should return user arguments", () => {
    const arguments = "node beverages.js --query --empId 111111".split(" ");
    const actual = formatArgs(arguments);
    const expected = "--query --empId 111111".split(" ");
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#getOperation()", function() {
  it("should return the saveRecord function if --save given", function() {
    const userArgs = "--save --beverage Orange --empId 11111 --qty 1".split(
      " "
    );
    const actual = getOperation(userArgs);
    const expected = saveRecord;
    assert.deepStrictEqual(actual, expected);
  }),
    it("should return the query function if --query given", function() {
      const userArgs = "--query --empId 11111".split(" ");
      const actual = getOperation(userArgs);
      const expected = query;
      assert.deepStrictEqual(actual, expected);
    });
});

describe("#parseTransaction()", function() {
  it("should return an object with all the required transaction details if --save is given", function() {
    const userArgs = "--save --beverage Orange --empId 11111 --qty 1".split(
      " "
    );
    const actual = parseTransaction(userArgs);
    const expected = {
      beverage: "Orange",
      empId: "11111",
      qty: "1"
    };
    assert.deepStrictEqual(actual, expected);
  }),
    it("should return an object with empId if --query is given", function() {
      const userArgs = "--query --empId 11111".split(" ");
      const actual = parseTransaction(userArgs);
      const expected = {
        empId: "11111"
      };
      assert.deepStrictEqual(actual, expected);
    });
});

describe("#getOperationResult()", () => {
  it("should return the result of transaction process", () => {
    const date = new Date();
    const transactionResult = {
      transaction: { beverage: "Orange", qty: "5", date: date },
      empId: "21"
    };
    const actual = getOperationResult(transactionResult);
    const expected =
      "\nTransaction Recorded: \nEmployeeId, Beverage, Quantity, Date\n21, Orange, 5, " +
      date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
});