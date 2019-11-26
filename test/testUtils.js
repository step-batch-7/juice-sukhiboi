const assert = require("assert");
const utils = require("./../src/utils");

const formatArgs = utils.formatArgs;
const getOperation = utils.getOperation;
const parseTransaction = utils.parseTransaction;
const getOperationResult = utils.getOperationResult;
const errorMessage = utils.errorMessage;
const queryRecordResult = utils.queryRecordResult;
const saveRecordResult = utils.saveRecordResult;

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
  });
  it("should return the query function if --query given", function() {
    const userArgs = "--query --empId 11111".split(" ");
    const actual = getOperation(userArgs);
    const expected = query;
    assert.deepStrictEqual(actual, expected);
  });
  it("should return errorMessage if wrong command is given", () => {
    const args = "--command --empId 12345";
    const actual = getOperation(args);
    const expected = utils.errorMessage;
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
      "--beverage": "Orange",
      "--empId": "11111",
      "--qty": "1"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return an object with empId if --query is given", function() {
    const userArgs = "--query --empId 11111".split(" ");
    const actual = parseTransaction(userArgs);
    const expected = {
      "--empId": "11111"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error Object if wrong command is given", () => {
    const args = "--command --empId 12345";
    const actual = parseTransaction(args);
    const expected = {
      error: "Invalid Command"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#getOperationResult()", () => {
  it("should return the result of transaction process", () => {
    const date = new Date();
    const args = "--save --beverage Orange --empId 21 --qty 5".split(" ");
    const transactionResult = {
      transaction: { "--beverage": "Orange", "--qty": "5", "--date": date },
      "--empId": "21"
    };
    const actual = getOperationResult(transactionResult, args);
    const expected =
      "\nTransaction Recorded: \nEmployeeId, Beverage, Quantity, Date\n21, Orange, 5, " +
      date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error if error Object is given as argument", () => {
    const errorObject = {
      error: "Invalid Command"
    };
    const actual = getOperationResult(errorObject);
    const expected = "Invalid Command";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#saveRecordResult()", () => {
  const date = new Date();
  it("should return result of a save command", () => {
    const operationResult = {
      transaction: { "--beverage": "Orange", "--qty": "1", "--date": date },
      "--empId": 21
    };
    const actual = saveRecordResult(operationResult);
    const expected =
      "\nTransaction Recorded: \nEmployeeId, Beverage, Quantity, Date\n21, Orange, 1, " +
      date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#queryRecordResult()", () => {
  const date = new Date();
  it("should return result of a query command", () => {
    const operationResult = {
      transactionRecords: [
        { "--beverage": "Orange", "--qty": "1", "--date": date.toJSON() },
        { "--beverage": "Orange", "--qty": "1", "--date": date.toJSON() }
      ],
      "--empId": 21
    };
    const actual = queryRecordResult(operationResult);
    const expected =
      "\n" +
      "EmployeeId, Beverage, Quantity, Date\n" +
      "21, Orange, 1, " +
      date.toJSON() +
      "\n" +
      "21, Orange, 1, " +
      date.toJSON() +
      "\n" +
      "\n" +
      "Total: 2 Juices";
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
