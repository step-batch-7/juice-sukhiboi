const assert = require("assert");
const query = require("./../src/query").query;

describe("#query()", () => {
  it("should return error if employee doesn't exists", () => {
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
      error: "User doesn't exists"
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
});
