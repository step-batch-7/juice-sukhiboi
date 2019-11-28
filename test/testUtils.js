const assert = require("assert");
const utils = require("./../src/utils");
const chalk = require("chalk");

const formatArgs = utils.formatArgs;
const getOperation = utils.getOperation;
const getTransactionPrototype = utils.getTransactionPrototype;
const updateTransactionDetails = utils.updateTransactionDetails;
const parseTransaction = utils.parseTransaction;
const errorMessage = utils.errorMessage;

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
  it("should return error message when wrong command is given", () => {
    const args = "--command --empId 12345";
    const actual = getOperation(args);
    const expected = utils.errorMessage;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#getTransactionPrototype()", () => {
  it("should return save transaction prototype when save command is given", () => {
    const expected = {
      "--beverage": undefined,
      "--empId": undefined,
      "--qty": undefined
    };
    const operation = "--save";
    const actual = getTransactionPrototype(operation);
    assert.deepStrictEqual(actual, expected)
  });
  it("should return query transaction prototype wrong query command is given", () => {
    const expected = {
      "--empId": undefined,
      "--date": undefined
    };
    const operation = "--query";
    const actual = getTransactionPrototype(operation);
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when wrong command is given", () => {
    const expected = { error: "Invalid Command" };
    const operation = "--command";
    const actual = getTransactionPrototype(operation);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#updateTransactionDetails()", () => {
  it("should updtae the transaction details", () => {
    const oldTransactionDetails = {
      "--beverage": undefined,
      "--empId": undefined,
      "--qty": undefined
    };
    const args = "--save --beverage Orange --empId 11111 --qty 2".split(" ");
    const actual = updateTransactionDetails(oldTransactionDetails, args);
    const expected = {
      "--beverage": "Orange",
      "--empId": "11111",
      "--qty": "2"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#parseTransaction()", function() {
  it("should return all the required transaction details when save command is given", function() {
    const userArgs = "--save --beverage Orange --empId 11111 --qty 1".split(
      " "
    );
    const actual = parseTransaction(userArgs);
    const expected = {
      "--beverage": "Orange",
      "--empId": "11111",
      "--qty": "1"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return empId when query command is given with employee id", function() {
    const userArgs = "--query --empId 11111".split(" ");
    const actual = parseTransaction(userArgs);
    const expected = {
      "--empId": "11111",
      "--date": undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return empId and date when query command is given with date and employee id", function() {
    const userArgs = "--query --empId 11111 --date 2019-11-12".split(" ");
    const actual = parseTransaction(userArgs);
    const expected = {
      "--empId": "11111",
      "--date": "2019-11-12"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return date when query command is given with date", function() {
    const userArgs = "--query --date 2019-11-12".split(" ");
    const actual = parseTransaction(userArgs);
    const expected = {
      "--date": "2019-11-12",
      "--empId": undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when user options are invalid", () => {
    const args = "--query --empId 12345q".split(" ");
    const actual = parseTransaction(args);
    const expected = {
      error: "Invalid Options"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when wrong command is given", () => {
    const args = "--command --empId 12345";
    const actual = parseTransaction(args);
    const expected = {
      error: "Invalid Command"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#errorMessage()", () => {
  it("should return the object that is given as argument", () => {
    const error = {
      error: "Invalid Command"
    };
    const actual = errorMessage(error);
    const expected = error;
    assert.deepStrictEqual(actual, expected);
  });
});
