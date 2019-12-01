const chai = require("chai");
const assert = chai.assert;
const chalk = require("chalk");
const {
  getOperationResult,
  queryRecordResult,
  saveRecordResult
} = require("./../src/operationResut");

describe("#getOperationResult()", () => {
  it("should return the result of transaction process", () => {
    const date = new Date();
    const args = "--save --beverage Orange --empId 21 --qty 5".split(" ");
    const transactionResult = {
      "--beverage": "Orange",
      "--qty": "5",
      "--date": date,
      "--empId": "21"
    };
    const actual = getOperationResult(transactionResult, args);
    const expected =
      "\nTransaction Recorded: \nEmployeeId, Beverage, Quantity, Date\n21, Orange, 5, " +
      date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error when error is given as an argument", () => {
    const errorObject = {
      error: "Invalid Command"
    };
    const actual = getOperationResult(errorObject);
    const expected = chalk.bold.red(`\nInvalid Command`);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#saveRecordResult()", () => {
  const date = new Date();
  it("should return result of a save command", () => {
    const operationResult = {
      "--beverage": "Orange",
      "--qty": "1",
      "--date": date,
      "--empId": 21
    };
    const actual = saveRecordResult(operationResult);
    const expected =
      "\nTransaction Recorded: \nEmployeeId, Beverage, Quantity, Date\n21, Orange, 1, " + date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#queryRecordResult()", () => {
  const date = new Date();
  it("should give result of a query command when the number of records is greater than 1", () => {
    const operationResult = [
      {
        "--beverage": "Orange",
        "--qty": "1",
        "--date": date.toJSON(),
        "--empId": "21"
      },
      {
        "--beverage": "Orange",
        "--qty": "1",
        "--date": date.toJSON(),
        "--empId": "21"
      }
    ];
    const actual = queryRecordResult(operationResult);
    const expected =
      "\n" +
      "EmployeeId, Beverage, Quantity, Date\n" + "21,Orange,1," + date.toJSON() + "\n" +
      "21,Orange,1," + date.toJSON() + "\n" +
      "Total: 2 Juices";
    assert.deepStrictEqual(actual, expected);
  });
  it("should giev result of a query command when the number of records is less than 2", () => {
     const operationResult = [
       {
         "--beverage": "Orange",
         "--qty": "1",
         "--date": date.toJSON(),
         "--empId": "21"
       }
     ];
     const actual = queryRecordResult(operationResult);
     const expected =
       "\n" + 
       "EmployeeId, Beverage, Quantity, Date\n" + "21,Orange,1," + date.toJSON() + "\n" +
       "Total: 1 Juice";
     assert.deepStrictEqual(actual, expected);
  })
});
