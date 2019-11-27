const assert = require("assert");
const queryFile = require("./../src/query");

const getFilteredRecords = queryFile.getFilteredRecords;
const filterWithDate = queryFile.filterWithDate;
const filterWithEmpId = queryFile.filterWithEmpId;
const filterWithEmpIdAndDate = queryFile.filterWithEmpIdAndDate;
const filterRecords = queryFile.filterRecords;
const getRecords = queryFile.getRecords;
const query = queryFile.query;

describe("#getFilteredRecords()", () => {
  it("should should give the filtered records when they exists", () => {
    const records = [
      {
        "--beverage": "Orange",
        "--date": "2019-11-28T19:34:42.970Z",
        "--qty": "2"
      }
    ];
    const actual = getFilteredRecords(records);
    const expected = [
      {
        "--beverage": "Orange",
        "--date": "2019-11-28T19:34:42.970Z",
        "--qty": "2"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("should should give error when filtered records doesn't exists", () => {
    const records = undefined;
    const actual = getFilteredRecords(records);
    const expected = {
      error: "Employee doesn't exists"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#filterWithDate()", () => {
  it("should give all the records of a particular date based on records", () => {
    const date = "2019-11-28";
    const records = [
      {
        "--beverage": "Orange",
        "--qty": "2",
        "--date": "2019-11-28T19:34:42.970Z"
      },
      {
        "--beverage": "Orange",
        "--qty": "2",
        "--date": "2019-11-27T19:34:42.970Z"
      }
    ];
    const actual = filterWithDate(date, records);
    const expected = [
      {
        "--beverage": "Orange",
        "--date": "2019-11-28T19:34:42.970Z",
        "--qty": "2"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#filterWithEmpId()", () => {
  it("should give all the records of a particular employee", () => {
    const empId = "11111";
    const records = {
      "11111": [
        {
          "--beverage": "Orange",
          "--qty": "2",
          "--date": "2019-11-28T19:34:42.970Z"
        }
      ],
      "222": [
        {
          "--beverage": "Orange",
          "--qty": "2",
          "--date": "2019-11-27T19:34:42.970Z"
        }
      ]
    };
    const actual = filterWithEmpId(empId, records);
    const expected = [
      {
        "--beverage": "Orange",
        "--date": "2019-11-28T19:34:42.970Z",
        "--qty": "2"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#filterWithEmpIdAndDate()", () => {
  it("should give filtered records based on employee id and date given", () => {
    const empId = "11111";
    const date = "2019-11-27";
    const records = {
      "11111": [
        {
          "--beverage": "Orange",
          "--qty": "2",
          "--date": "2019-11-28T19:34:42.970Z"
        },
        {
          "--beverage": "Orange",
          "--qty": "2",
          "--date": "2019-11-27T19:34:42.970Z"
        }
      ],
      "222": [
        {
          "--beverage": "Orange",
          "--qty": "2",
          "--date": "2019-11-27T19:34:42.970Z"
        }
      ]
    };
    const actual = filterWithEmpIdAndDate(empId, date, records);
    const expected = [
      {
        "--beverage": "Orange",
        "--date": "2019-11-27T19:34:42.970Z",
        "--qty": "2"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

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
    const transaction = { "--empId": undefined, "--date": "2019-11-26" };
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
    const transaction = { "--empId": undefined };
    const actual = filterRecords(records, transaction);
    const expected = { error: "Invalid Options" };
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
