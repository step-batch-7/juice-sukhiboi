const assert = require("assert");

const { filterRecords, getRecords, query } = require("./../src/query");

describe("#filterRecords()", () => {
  it("should filter records when only employee id is given", () => {
    const records = [
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z",
        "--empId": "25"
      },
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z",
        "--empId": "26"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z",
        "--empId": "26"
      }
    ];
    const transaction = { "--empId": "26" };
    const actual = filterRecords(records, transaction);
    const expected = [
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z",
        "--empId": "26"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z",
        "--empId": "26"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should filter records when employee id and a particular date is given", () => {
    const records = [
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-10-26T10:25:09.374Z",
        "--empId": "28"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z",
        "--empId": "25"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z",
        "--empId": "25"
      }
    ];
    const transaction = { "--empId": "28", "--date": "2019-10-26" };
    const actual = filterRecords(records, transaction);
    const expected = [
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-10-26T10:25:09.374Z",
        "--empId": "28"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should filter records when a particular date is given", () => {
    const records = [
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-29T10:25:06.121Z",
        "--empId": "25"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z",
        "--empId": "26"
      }
    ];
    const transaction = { "--empId": undefined, "--date": "2019-11-26" };
    const actual = filterRecords(records, transaction);
    const expected = [
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z",
        "--empId": "26"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should give error message when user doesn't exists", () => {
    const records = [];
    const transaction = { "--empId": "12334", "--date": "2019-11-26" };
    const actual = filterRecords(records, transaction);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it("should give error message when records of specific date doesn't exists", () => {
    const records = [];
    const transaction = { "--empId": undefined, "--date": "2019-11-26" };
    const actual = filterRecords(records, transaction);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it("should error message when no options are given", () => {
    const records = [
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z",
        "--empId": "25"
      },
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z",
        "--empId": "26"
      }
    ];
    const transaction = { "--empId": undefined };
    const actual = filterRecords(records, transaction);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#getRecords()", () => {
  it("should give all the records from the file given", () => {
    const filename = "./beverageRecords.json";
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
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = getRecords(filename, config);
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

describe("#query()", () => {
  it("should return error when employee option is not given", () => {
    const transaction = { "--empId": undefined };
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const date = new Date();
    const existsSync = function(filename) {
      assert.equal(filename, "./beverageRecords.json");
      return true;
    };
    const config = {
      date: date,
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = query(transaction, config);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when employee id doesn't exists", () => {
    const transaction = {"--empId": 11111};
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const existsSync = function(filename) {
      assert.equal(filename, "./beverageRecords.json");
      return true;
    };
    const date = new Date();
    const config = {
      date: date,
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = query(transaction, config);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transaction of the given employee", () => {
    const transaction = {"--empId": 21};
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const existsSync = function(filename) {
      assert.equal(filename, "./beverageRecords.json");
      return true;
    };
    const date = new Date();
    const config = {
      date: date,
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = query(transaction, config);
    const expected = [
      {
        "--beverage": "Orange",
        "--qty": "5",
        "--date": "2019-11-25T06:16:09.419Z",
        "--empId": "21"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when given Options are invalid", () => {
    const transaction = { "--empd": "23234" };
    const date = new Date();
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const existsSync = function(filename) {
      assert.equal(filename, "./beverageRecords.json");
      return true;
    };
    const config = {
      date: date,
      readFile: readFile,
      writeFile: undefined,
      exists: existsSync
    };
    const actual = query(transaction, config);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});
