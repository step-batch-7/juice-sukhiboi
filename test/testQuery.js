const assert = require("assert");
const queryFile = require("./../src/query");

const filterRecords = queryFile.filterRecords;
const getRecords = queryFile.getRecords;
const query = queryFile.query;

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
        '{"11111":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };

    const actual = getRecords(filename, readFile);
    const expected = {
      "11111": [
        {
          "--beverage": "Orange",
          "--qty": "5",
          "--date": "2019-11-25T06:16:09.419Z"
        }
      ]
    };
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
    const actual = query(transaction, date, readFile);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when employee id doesn't exists", () => {
    const transaction = {
      "--empId": 11111
    };
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const date = new Date();
    const actual = query(transaction, date, readFile);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transaction of the given employee", () => {
    const transaction = {
      "--empId": 21
    };
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const date = new Date();
    const actual = query(transaction, date, readFile);
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
    const transaction = { error: "Invalid Options" };
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z","--empId":"21"}]';
      return contents;
    };
    const date = new Date();
    const actual = query(transaction, date, readFile);
    const expected = {
      error: "Invalid Options"
    };
    assert.deepStrictEqual(actual, expected);
  });
});
