const assert = require("assert");

const {
  validateTransaction,
  isValidBeverage,
  isValidQty,
  isValidDate,
  isValidEmpId
} = require("./../src/validateTransaction");;

describe("#isValidBeverage()", () => {
  it("should validate beverage", () => {
    const beverage = "Orange";
    const actual = isValidBeverage(beverage);
    const expected = true;
    assert.strictEqual(actual, expected);
  });
});

describe("#isValidQty()", () => {
  it("should validate Quantity when it contains character other than numbers", () => {
    const qty = "11111p";
    const expected = false;
    const actual = isValidQty(qty);
    assert.strictEqual(actual, expected);
  });
  it("should validate quantity when it only contains numbers", () => {
    const qty = "11111";
    const expected = true;
    const actual = isValidQty(qty);
    assert.strictEqual(actual, expected);
  });
});

describe("#isValidEmpId()", () => {
  it("should validate Employee Id when it contains characters other than numbers", () => {
    const qty = "11111p";
    const expected = false;
    const actual = isValidEmpId(qty);
    assert.strictEqual(actual, expected);
  });
  it("should validate Employee Id when it only contains numbers", () => {
    const qty = "22222";
    const expected = true;
    const actual = isValidEmpId(qty);
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
});

describe("#validateTransaction()", () => {
  it("should validate the save command for correct options", () => {
    const args = "--save --beverage Orange --empId 11111 --qty 1".split(" ");
    const transaction = {
      "--beverage": "Orange",
      "--empId": "11111",
      "--qty": "1"
    };
    const actual = validateTransaction(transaction, args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the save command for incorrect options given", () => {
    const args = "--save --beverage Orange --empId 11111q --quantity 1".split(
      " "
    );
    const transaction = {
      "--beverage": "Orange",
      "--empId": "11111q",
      "--qty": undefined
    };
    const actual = validateTransaction(transaction, args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
  it("should validate the query command for correct employee id", () => {
    const args = "--query --empId 11111".split(" ");
    const transaction = {
      "--empId": "11111"
    };
    const actual = validateTransaction(transaction, args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for incorrect employee id", () => {
    const args = "--query --empId 11111q".split(" ");
    const transaction = {
      "--empId": "11111q"
    };
    const actual = validateTransaction(transaction, args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
  it("should validate the query command for correct date", () => {
    const args = "--query --date 2019-11-12".split(" ");
    const transaction = {
      "--date": "2019-11-12"
    };
    const actual = validateTransaction(transaction, args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for incorrect date", () => {
    const args1 = "--query --date 201k".split(" ");
    const transaction1 = { "--date": "201k" };
    const actual1 = validateTransaction(transaction1, args1);

    const args2 = "--query --date 2019-13-01".split(" ");
    const transaction2 = { "--date": "2019-13-01" };
    const actual2 = validateTransaction(transaction2, args2);

    const args3 = "--query --date 2019-12-32".split(" ");
    const transaction3 = { "--date": "2019-12-32" };
    const actual3 = validateTransaction(transaction3, args3);

    const args4 = "--query --date 234k-12-32".split(" ");
    const transaction4 = { "--date": "234k-12-32" };
    const actual4 = validateTransaction(transaction4, args4);

    const expected = false;
    assert.deepStrictEqual(actual1, expected);
    assert.deepStrictEqual(actual2, expected);
    assert.deepStrictEqual(actual3, expected);
    assert.deepStrictEqual(actual4, expected);
  });
  it("should validate the query command for correct date and employee id", () => {
    const args = "--query --empId 11111 --date 2019-11-12".split(" ");
    const transaction = {
      "--empId": "11111",
      "--date": "2019-11-12"
    };
    const actual = validateTransaction(transaction, args);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for incorrect date and employee id", () => {
    const args = "--query --empId 11111 --date 2019-12-32".split(" ");
    const transaction = {
      "--error": "11111",
      "--date": "2019-12-32"
    };
    const actual = validateTransaction(transaction, args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
  it("should invalidate the query command for no options given", () => {
    const args = "--query".split(" ");
    const transaction = {
      "--error": undefined,
      "--date": undefined
    };
    const actual = validateTransaction(transaction, args);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});
