const chai = require("chai");
const assert = chai.assert;
const { updateTransactions, loadTransactions } = require("./../src/utils");

describe("#updateTransactions()", () => {
  it("should update the transaction list by inserting current transaction", () => {
    const date = new Date();
    const record = {
      "--beverage": "Orange",
      "--qty": "2",
      "--date": date,
      "--empId": "11111"
    };
    const filename = "./beverageRecords.json";
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"11111"}]';
      return contents;
    };
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
    const actual = updateTransactions(record, config);
    const expected = {
      "--beverage": "Orange",
      "--date": date,
      "--qty": "2",
      "--empId": "11111"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should create a new file with inserting the current record when data strore file doesn't exists", () => {
    const date = new Date();
    const record = {
      "--beverage": "Orange",
      "--qty": "2",
      "--date": date,
      "--empId": "11111"
    };
    const filename = "./beverageRecords.json";
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      return new Error("File doesn't exists");
    };
    const writeFile = function(filename, record) {
      const expectedFilename = "./beverageRecords.json";
      const expectedRecord =
        '[{"--beverage":"Orange","--qty":"2","--date":"' +
        date.toJSON() +
        '","--empId":"11111"}]';
      assert.equal(filename, expectedFilename);
      assert.equal(record, expectedRecord);
      return true;
    };
    const existsSync = function(filename) {
      assert.strictEqual(filename, "./beverageRecords.json");
      return false;
    };
    const config = {
      filename: "./beverageRecords.json",
      date: date,
      readFile: readFile,
      writeFile: writeFile,
      exists: existsSync
    };
    const actual = updateTransactions(record, config);
    const expected = {
      "--beverage": "Orange",
      "--date": date,
      "--qty": "2",
      "--empId": "11111"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#loadTransactions()", () => {
  it("should give all the records from the file given", () => {
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"11111"}]';
      return contents;
    };
    const existsSync = function(filename) {
      assert.equal(filename, "./beverageRecords.json");
      return true;
    };
    const config = {
      filename: "./beverageRecords.json",
      date: new Date(),
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = loadTransactions(config);
    const expected = [
      {
        "--beverage": "Orange",
        "--qty": "5",
        "--date": "2019-11-25T06:16:09.419Z",
        "--empId": "11111"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
