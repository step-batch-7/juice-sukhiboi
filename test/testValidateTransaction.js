const assert = require("assert");

const {
  isValidBeverage,
  isPositiveInt,
  isValidDate,
  formatTransaction,
  validateTransaction
} = require("../src/validateTransaction");;

describe("#isValidBeverage()", () => {
  it("should validate beverage", () => {
    const beverage = "Orange";
    const actual = isValidBeverage(beverage);
    const expected = true;
    assert.strictEqual(actual, expected);
  });
  it("should validate when undefined is given as argument", () => {
    const beverage = undefined;
    const actual = isValidBeverage(beverage);
    const expected = undefined;
    assert.strictEqual(actual, expected);
  });
});

describe("#isPositiveInt()", () => {
  it("should validate a positive Integer", () => {
    const value = 3;
    const actual = isPositiveInt(value);
    const expected = true;
    assert.strictEqual(actual, expected);
  });
  it("should invalidate a negitive Integer", () => {
    const value = -3;
    const actual = isPositiveInt(value);
    const expected = false;
    assert.strictEqual(actual, expected);
  });
  it("should validate when undefined is given as argument", () => {
    const value = undefined;
    const actual = isPositiveInt(value);
    const expected = undefined;
    assert.strictEqual(actual, expected);
  });
});

describe("#isValidDate()", () => {
  it("should validate when correct date is given", () => {
    const date = "2019-12-12";
    const expected = true;
    const actual = isValidDate(date);
    assert.strictEqual(actual, expected);
  });
  it("should validate when date have wrong date", () => {
    const date = "2019-12-32";
    const expected = false;
    const actual = isValidDate(date);
    assert.strictEqual(actual, expected);
  });
  it("should validate when date have wrong month", () => {
    const date = "2019-33-31";
    const expected = false;
    const actual = isValidDate(date);
    assert.strictEqual(actual, expected);
  });
  it("should validate when date have wrong year", () => {
    const date = "301a-3-31";
    const expected = false;
    const actual = isValidDate(date);
    assert.strictEqual(actual, expected);
  });
  it("should validate when undefined is given as argument", () => {
    const date = undefined;
    const expected = undefined;
    const actual = isValidDate(date);
    assert.strictEqual(actual, expected);
  });
});

describe("#formatTransaction()", () => {
  it("should parse traction to a object with given keys", () => {
    const options = ["--beverage", "--empId", "--qty"]
    const args = ["--beverage", "Orange", "--empId", "123", "--qty", "7"];
    const actual = formatTransaction(args, options);
    const expected = {
      "--beverage": "Orange",
      "--empId": "123",
      "--qty": "7"
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe("#validateTransaction()", () => {
  it("should validate the save command for correct options", () => {
    const args = "--save --beverage Orange --empId 11111 --qty 1".split(" ");
    const actual = validateTransaction(args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the save command for incorrect options given", () => {
    const args = "--save --beverage Orange --empId 11111q --quantity 1".split(" ");
    const actual = validateTransaction(args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
  it("should validate the query command for correct employee id", () => {
    const args = "--query --empId 11111".split(" ");
    const actual = validateTransaction(args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for incorrect employee id", () => {
    const args = "--query --empId 11111q".split(" ");
    const actual = validateTransaction(args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
  it("should validate the query command for correct date", () => {
    const args = "--query --date 2019-11-12".split(" ");
    const actual = validateTransaction(args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for incorrect date", () => {
    const args1 = "--query --date 201k".split(" ");
    const actual1 = validateTransaction(args1);
    const args2 = "--query --date 2019-13-01".split(" ");
    const actual2 = validateTransaction(args2);
    const args3 = "--query --date 2019-12-32".split(" ");
    const actual3 = validateTransaction(args3);
    const args4 = "--query --date 234k-12-32".split(" ");
    const actual4 = validateTransaction(args4);
    const expected = false;
    assert.deepStrictEqual(actual1, expected);
    assert.deepStrictEqual(actual2, expected);
    assert.deepStrictEqual(actual3, expected);
    assert.deepStrictEqual(actual4, expected);
  });
  it("should validate the query command for correct date and employee id", () => {
    const args = "--query --empId 11111 --date 2019-11-12".split(" ");
    const actual = validateTransaction(args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for incorrect date and employee id", () => {
    const args = "--query --empId 11111 --date 2019-12-32".split(" ");
    const actual = validateTransaction(args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for no options given", () => {
    const args = "--query".split(" ");
    const actual = validateTransaction(args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});
