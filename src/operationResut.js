const chalk = require("chalk");

const saveRecordResult = function(operationResult) {
  const successMessage = "\nTransaction Recorded: \n";
  const headings = "EmployeeId, Beverage, Quantity, Date\n";
  const transactionData = `${operationResult["--empId"]}, ${
    operationResult["--beverage"]
  }, ${operationResult["--qty"]}, ${operationResult["--date"].toJSON()}`;
  const result = successMessage + headings + transactionData;
  return result;
};

const queryRecordResult = function(operationResult) {
  const headings = "\nEmployeeId, Beverage, Quantity, Date\n";
  const transactions = operationResult.map(record => {
    const row = `${record["--empId"]},${record["--beverage"]},${record["--qty"]},${record["--date"]}`;
    return row;
  });
  const totalBeverages = operationResult.reduce((context, record) => {
    context = context + +record["--qty"];
    return context;
  }, 0);
  let footer = `\n\nTotal: ${totalBeverages} Juices`;
  if (totalBeverages < 2) footer = `\n\nTotal: ${totalBeverages} Juice`;
  const result = headings + transactions.join("\n") + footer;
  return result;
};

const getOperationResult = function(operationResult, userArgs) {
  if (operationResult.error != undefined)
    return chalk.bold.red(`\n${operationResult.error}`);
  const results = {
    "--save": saveRecordResult,
    "--query": queryRecordResult
  };
  const operation = userArgs[0];
  const resultOperation = results[operation];
  const result = resultOperation(operationResult);
  return result;
};

module.exports = {
  getOperationResult,
  saveRecordResult,
  queryRecordResult
};
