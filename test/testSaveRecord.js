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
        '{"11111":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };

    const writeFile = function(filename, record) {
      const expectedFilename = "./beverageRecords.json";
      const expectedRecord =
        '{"11111":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"},{"--beverage":"Orange","--qty":"2","--date":"' +
        date.toJSON() +
        '"}]}';
      assert.equal(filename, expectedFilename);
      assert.equal(record, expectedRecord);
      return true;
    };

    const actual = saveRecord(transaction, date, readFile, writeFile);

    const expected = {
      transaction: { "--beverage": "Orange", "--qty": "2", "--date": date },
      "--empId": "11111"
    };

    assert.deepStrictEqual(actual, expected);
  });
});

describe("#updateRecord()", () => {
  it("should update the transaction list by inserting current transaction", () => {
    const date = new Date();

    const record = {
      transaction: { "--beverage": "Orange", "--qty": "2", "--date": date },
      "--empId": "11111"
    };

    const filename = "./beverageRecords.json";

    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '{"11111":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };

    const writeFile = function(filename, record) {
      const expectedFilename = "./beverageRecords.json";
      const expectedRecord =
        '{"11111":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"},{"--beverage":"Orange","--qty":"2","--date":"' +
        date.toJSON() +
        '"}]}';
      assert.equal(filename, expectedFilename);
      assert.equal(record, expectedRecord);
      return true;
    };

    const actual = updateRecord(record, filename, readFile, writeFile);
    const expected = {
      transaction: { "--beverage": "Orange", "--date": date, "--qty": "2" },
      "--empId": "11111"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#updateTransactions()", () => {
  const date = new Date();
  it("should update the transaction with the given transaction if employee doesn't exists", () => {
    const contents =
      '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z"},{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T12:56:55.886Z"}]}';
    const record = {
      transaction: { "--beverage": "Orange", "--qty": "2", "--date": date },
      "--empId": "11111"
    };
    const actual = updateTransactions(contents, record);
    const expected =
      '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z"},{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T12:56:55.886Z"}],"11111":[{"--beverage":"Orange","--qty":"2","--date":"' +
      date.toJSON() +
      '"}]}';
    assert.deepStrictEqual(actual, expected);
  });
  it("should update the transaction with the given transaction if employee exists", () => {
    const contents =
      '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z"},{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T12:56:55.886Z"}]}';
    const record = {
      transaction: {
        "--beverage": "Orange",
        "--qty": "2",
        "--date": date
      },
      "--empId": "21"
    };
    const actual = updateTransactions(contents, record);
    const expected =
      '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T11:09:06.504Z"},{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T12:56:55.886Z"},{"--beverage":"Orange","--qty":"2","--date":"' +
      date.toJSON() +
      '"}]}';
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#createTransactionRecord()", () => {
  it("should create a transaction record", () => {
    const transaction =
      "{ \"--beverage\": 'Orange', \"--empId\": '21131', \"--qty\": '5' }";
    const date = new Date();
    const actual = createTransactionRecord(transaction, date);
    const expected = {
      transaction: {
        "--beverage": transaction["--beverage"],
        "--qty": transaction["--qty"],
        "--date": date
      },
      "--empId": transaction["--empId"]
    };
    assert.deepStrictEqual(actual, expected);
  });
});
