const assert = require("assert");
const saveRecordFile = require("./../src/saveRecord");

const saveRecord = saveRecordFile.saveRecord;
const updateRecord = saveRecordFile.updateRecord;
const updateTransactions = saveRecordFile.updateTransactions;
const createTransactionRecord = saveRecordFile.createTransactionRecord;

describe("#saveRecord()", () => {
  it("should return the given transaction object", () => {
    const transaction = {
      "--beverage": "Orange",
      "--empId": "11111",
      "--qty": "2"
    };

    const date = new Date();

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

    const actual = saveRecord(transaction, date, readFile, writeFile);

    const expected = {
      "--beverage": "Orange",
      "--qty": "2",
      "--date": date,
      "--empId": "11111"
    };

    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when transaction has error", () => {
    const transaction = {
      error: "Invalid Options"
    };

    const date = new Date();

    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '{"11111p":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };

    const writeFile = function(filename, record) {
      const expectedFilename = "./beverageRecords.json";
      const expectedRecord =
        '{"11111p":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"},{"--beverage":"Orange","--qty":"2","--date":"' +
        date.toJSON() +
        '"}]}';
      assert.equal(filename, expectedFilename);
      assert.equal(record, expectedRecord);
      return true;
    };

    const actual = saveRecord(transaction, date, readFile, writeFile);

    const expected = {
      error: "Invalid Options"
    };

    assert.deepStrictEqual(actual, expected);
  });
});

describe("#updateRecord()", () => {
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

    const actual = updateRecord(record, filename, readFile, writeFile);
    const expected = {
      "--beverage": "Orange",
      "--date": date,
      "--qty": "2",
      "--empId": "11111"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#updateTransactions()", () => {
  const date = new Date();
  it("should update the transactions with the given transaction when employee doesn't exists", () => {
    const contents =
      '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z","--empId":"11111"}]';
    const record = {
      "--beverage": "Orange",
      "--qty": "2",
      "--date": date,
      "--empId": "11111"
    };
    const actual = updateTransactions(contents, record);
    const expected =
      '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z","--empId":"11111"},{"--beverage":"Orange","--qty":"2","--date":"' +
      date.toJSON() +
      '","--empId":"11111"}]';
    assert.deepStrictEqual(actual, expected);
  });
  it("should update the transactions with the given transaction when employee exists", () => {
    const contents =
      '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z","--empId":"21"}]';
    const record = {
      "--beverage": "Orange",
      "--qty": "2",
      "--date": date,
      "--empId": "21"
    };
    const actual = updateTransactions(contents, record);
    const expected =
      '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z","--empId":"21"},{"--beverage":"Orange","--qty":"2","--date":"' +
      date.toJSON() +
      '","--empId":"21"}]';
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#createTransactionRecord()", () => {
  it("should create a transaction record", () => {
    const transaction = {
      "--beverage": "Orange",
      "--empId": "21",
      "--qty": "5"
    };
    const date = new Date();
    const actual = createTransactionRecord(transaction, date);
    const expected = {
      "--beverage": "Orange",
      "--qty": "5",
      "--date": date,
      "--empId": "21"
    };
    assert.deepStrictEqual(actual, expected);
  });
});
