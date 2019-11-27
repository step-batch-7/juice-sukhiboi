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
      "--empId": "11111"
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
      "--empId": ""
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
  it("should return error when error is given as an argument", () => {
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
