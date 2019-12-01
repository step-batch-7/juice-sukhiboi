const chai = require("chai");
const assert = chai.assert;
const { joinHeader, joinBeverageCount } = require("./../src/operationResut");

describe("#joinHearder()", () => {
  it("should append the header at the begining for save command", () => {
    const date = new Date();
    const result = [
      {
        "--empId": "11111",
        "--beverage": "Orange",
        "--qty": "3",
        "--date": date
      }
    ];
    const toJson = true;
    const actual = joinHeader(result, toJson);
    const expected =
      "\nEmployeeId,Beverage,Quantity,Date\n11111,Orange,3," + date.toJSON();
    assert.strictEqual(actual, expected);
  });
  it("should append the header at the begining for query command", () => {
    const result = [
      {
        "--empId": "11111",
        "--beverage": "Orange",
        "--qty": "3",
        "--date": "2019-12-01T17:34:30.323Z"
      },
      {
        "--empId": "11111",
        "--beverage": "Orange",
        "--qty": "7",
        "--date": "2019-12-01T17:34:30.323Z"
      }
    ];
    const actual = joinHeader(result);
    const expected =
      "\nEmployeeId,Beverage,Quantity,Date\n" +
      "11111,Orange,3,2019-12-01T17:34:30.323Z\n" +
      "11111,Orange,7,2019-12-01T17:34:30.323Z";
    assert.strictEqual(actual, expected);
  });
});

describe("#joinBeverageCount()", () => {
  it("should evaluate beverage count based on result for less than 2 jucice", () => {
    const result = [
      {
        "--empId": "11111",
        "--beverage": "Orange",
        "--qty": "1",
        "--date": "2019-12-01T17:34:30.323Z"
      },
    ];
    const actual = joinBeverageCount(result);
    const expected = "\nTotal: 1 Juice";
    assert.strictEqual(actual, expected);
  });
  it("should evaluate beverage count based on result for more than 1 jucices", () => {
    const result = [
      {
        "--empId": "11111",
        "--beverage": "Orange",
        "--qty": "1",
        "--date": "2019-12-01T17:34:30.323Z"
      },
      {
        "--empId": "11111",
        "--beverage": "Orange",
        "--qty": "4",
        "--date": "2019-12-01T17:34:30.323Z"
      }
    ];
    const actual = joinBeverageCount(result);
    const expected = "\nTotal: 5 Juices";
    assert.strictEqual(actual, expected);
  });
});