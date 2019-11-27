const assert = require("assert");
const query = require("./../src/query").query;
const filterRecords = require("./../src/query").filterRecords;

describe("#filterRecords()", () => {
  it("should filter records when only employee id is given", () => {
    const records = {
      "25": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        }
      ],
      "26": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-11-26T10:25:09.374Z"
        }
      ]
    };
    const transaction = { "--empId": "26" };
    const actual = filterRecords(records, transaction);
    const expected = [
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should filter records when employee id and a particular date is given", () => {
    const records = {
      "25": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        }
      ],
      "26": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-11-26T10:25:09.374Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-02-26T10:25:09.374Z"
        }
      ]
    };
    const transaction = { "--empId": "26", "--date": "2019-11-26" };
    const actual = filterRecords(records, transaction);
    const expected = [
      {
        "--beverage": "orange",
        "--qty": "1",
        "--date": "2019-11-26T10:25:06.121Z"
      },
      {
        "--beverage": "orange",
        "--qty": "5",
        "--date": "2019-11-26T10:25:09.374Z"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should filter records when a particular date is given", () => {
    const records = {
      "25": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        }
      ],
      "26": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-11-26T10:25:09.374Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-02-26T10:25:09.374Z"
        }
      ]
    };
    const transaction = { "--empId": "", "--date": "2019-11-26" };
    const actual = filterRecords(records, transaction);
    const expected = { error: "Invalid Options" };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give error message when user doesn't exists", () => {
    const records = {};
    const transaction = { "--empId": "12334", "--date": "2019-11-26" };
    const actual = filterRecords(records, transaction);
    const expected = { error: "Employee doesn't exists" };
    assert.deepStrictEqual(actual, expected);
  });
  it("should error message when no options are given", () => {
    const records = {
      "25": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        }
      ],
      "26": [
        {
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-26T10:25:06.121Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-11-26T10:25:09.374Z"
        },
        {
          "--beverage": "orange",
          "--qty": "5",
          "--date": "2019-02-26T10:25:09.374Z"
        }
      ]
    };
    const transaction = { "--empId": "" };
    const actual = filterRecords(records, transaction);
    const expected = { error: "Invalid Options" };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#query()", () => {
  it("should return error when employee option is not given", () => {
    const transaction = { "--empId": "" };
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };
    const date = new Date();
    const actual = query(transaction, date, readFile);
    const expected = {
      error: "Invalid Options"
    };
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
        '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };
    const date = new Date();
    const actual = query(transaction, date, readFile);
    const expected = {
      error: "Employee doesn't exists"
    };
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
        '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
      return contents;
    };
    const date = new Date();
    const actual = query(transaction, date, readFile);
    const expected = {
      transactionRecords: [
        {
          "--beverage": "Orange",
          "--qty": "5",
          "--date": "2019-11-25T06:16:09.419Z"
        }
      ],
      "--empId": 21
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when given Options are invalid", () => {
    const transaction = { error: "Invalid Options" };
    const readFile = function(filename, encoding) {
      assert.equal(filename, "./beverageRecords.json");
      assert.equal(encoding, "utf8");
      const contents =
        '{"21":[{"--beverage":"Orange","--qty":"5","--date":"2019-11-25T06:16:09.419Z"}]}';
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
