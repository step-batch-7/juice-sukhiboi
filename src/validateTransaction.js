const invalidateTransactionObject = function(transaction, args) {
  const optionValues = Object.values(transaction);

  if (args[0] == "--query") {
    const result = optionValues.some(function(option) {
      return option != undefined;
    });
    return !result;
  }

  const result = optionValues.some(function(option) {
    return option == undefined;
  });
  return result;
};

const isValidBeverage = function(beverage) {
  return true;
};

const isValidQty = function(qty) {
  if (qty == undefined) return true;
  return Number(qty) > 0;
};

const isValidEmpId = function(empId) {
  if (empId == undefined) return true;
  return Number(empId) > 0;
};

const isValidDate = function(date) {
  if (date == undefined) return true;
  return date && new Date(date) != "Invalid Date";
};

const validateTransaction = function(transaction, args) {
  if (invalidateTransactionObject(transaction, args)) return false;

  const beverage = transaction["--beverage"];
  const qty = transaction["--qty"];
  const empId = transaction["--empId"];
  const date = transaction["--date"];

  const validBeverage = isValidBeverage(beverage);
  const validQty = isValidQty(qty);
  const validEmpId = isValidEmpId(empId);
  const validDate = isValidDate(date);

  const result = validBeverage && validQty && validEmpId && validDate;
  return result;
};

module.exports = {
  isValidBeverage,
  isValidQty,
  isValidEmpId,
  isValidDate,
  validateTransaction
};
