const chai = require("chai");
const assert = chai.assert;
const {
  formatArgs,
  getOperation,
  getTransactionPrototype,
  updateTransactionDetails,
  parseTransaction,
  errorMessage,
  executeTransaction
} = require("./../src/utils");

const { saveRecord } = require("./../src/saveRecord");
const { query } = require("./../src/query");

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
    const expected = errorMessage;
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
    assert.deepStrictEqual(actual, expected);
  });
  it("should return query transaction prototype wrong query command is given", () => {
    const expected = {
      "--beverage": undefined,
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
      "--date": undefined,
      "--beverage": undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return empId and date when query command is given with date and employee id", function() {
    const userArgs = "--query --empId 11111 --date 2019-11-12".split(" ");
    const actual = parseTransaction(userArgs);
    const expected = {
      "--empId": "11111",
      "--date": "2019-11-12",
      "--beverage": undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return date when query command is given with date", function() {
    const userArgs = "--query --date 2019-11-12".split(" ");
    const actual = parseTransaction(userArgs);
    const expected = {
      "--date": "2019-11-12",
      "--empId": undefined,
      "--beverage": undefined
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

describe("#executeTransaction()", () => {
  it("should execute save command on given args with given configs ", () => {
    const args = "node beverage.js --save --beverage Orange --empId 11111 --qty 2".split(
      " "
    );
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"11111"}]';
      return contents;
    };
    const date = new Date();
    const writeFile = function(filename, record) {
      const expectedFilename = "./beverageRecords.json";
      const expectedRecord =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"11111"},{"--beverage":"Orange","--qty":"2","--date":"' +
        date.toJSON() +
        '","--empId":"11111"}]';
      assert.equal(filename, expectedFilename);
      assert.equal(record, expectedRecord);
      return true;
    };
    const existsSync = function(filename) {
      assert.strictEqual(filename, "./beverageRecords.json");
      return true;
    };
    const config = {
      filename: "./beverageRecords.json",
      date: date,
      readFile: readFile,
      writeFile: writeFile,
      exists: existsSync
    };
    const actual = executeTransaction(args, config);
    const expected =
      "\nTransaction Recorded:\nEmployeeId,Beverage,Quantity,Date\n11111,Orange,2," +
      config.date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
  it("should execute query command on given args with given configs ", () => {
    const args = "node beverage.js --query --empId 11111".split(" ");
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"11111"}]';
      return contents;
    };
    const existsSync = function(filename) {
      assert.strictEqual(filename, "./beverageRecords.json");
      return true;
    };
    const date = new Date();
    const config = {
      filename: "./beverageRecords.json",
      date: date,
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = executeTransaction(args, config);
    const expected =
      "\nEmployeeId,Beverage,Quantity,Date\n11111,Orange,5,2019-11-25T06:16:09.419Z\nTotal: 5 Juices";
    assert.deepStrictEqual(actual, expected);
  });
  it("should given error if wrong option given for save command", () => {
    const args = "node,beverage.js,--save,--empId 234r".split(",");
    const config = {
      filename: undefined,
      date: undefined,
      readFile: undefined,
      writeFile: undefined,
      exists: undefined
    };
    const actual = executeTransaction(args, config);
    const expected = "\nInvalid Options";
    assert.strictEqual(actual, expected);
  });
  it("should given error if wrong option given for query command", () => {
    const args = "node,beverage.js,--query,--empId 234r".split(",");
    const config = {
      filename: undefined,
      date: undefined,
      readFile: undefined,
      writeFile: undefined,
      exists: undefined
    };
    const actual = executeTransaction(args, config);
    const expected = "\nInvalid Options";
    assert.strictEqual(actual, expected);
  });
});
