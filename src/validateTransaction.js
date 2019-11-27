const isValidBeverage = function(beverage) {
  if (beverage == undefined) return true;
  return typeof beverage == "string";
};

const isValidQty = function(qty) {
  if (qty == undefined) return true;
  const actualQty = Math.floor(qty);
  const result = Number.isInteger(actualQty) && actualQty > 0;
  return result;
};

const isValidEmpId = function(empId) {
  if (empId == undefined || empId == "") return true;
  const actualEmpId = Math.floor(empId);
  const result = Number.isInteger(actualEmpId) && actualEmpId > 0;
  return result;
};

const isValidDate = function(date) {
  if (date == undefined) return true;
  const actualDate = date.split("-");
  if (actualDate.length != 3) return false;
  if (actualDate[0] < 1) return false;
  if (actualDate[1] > 12 || actualDate[1] < 1) return false;
  if (actualDate[2] > 31 || actualDate[2] < 1) return false;
  return true;
};

const validateTransaction = function(transaction) {
  const beverage = transaction["--beverage"];
  const qty = transaction["--qty"];
  const empId = transaction["--empId"];
  const date = transaction["--date"];
  const validationResultBeverage = isValidBeverage(beverage);
  const validationResultQty = isValidQty(qty);
  const validationResultEmpId = isValidEmpId(empId);
  const validationResultDate = isValidDate(date);
  const result =
    validationResultBeverage &&
    validationResultQty &&
    validationResultEmpId &&
    validationResultDate;
  return result;
};

exports.isValidBeverage = isValidBeverage;
exports.isValidQty = isValidQty;
exports.isValidEmpId = isValidEmpId;
exports.isValidDate = isValidDate;
exports.validateTransaction = validateTransaction;
