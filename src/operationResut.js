const chalk = require("chalk");

const saveRecordResult = function(operationResult) {
  const successMessage = "\nTransaction Recorded: \n";
  const headings = "EmployeeId, Beverage, Quantity, Date\n";
  const transactionData = `${operationResult["--empId"]}, ${
    operationResult.transaction["--beverage"]
  }, ${operationResult.transaction["--qty"]}, ${operationResult.transaction[
    "--date"
  ].toJSON()}`;
  const result = successMessage + headings + transactionData;
  return result;
};

const queryRecordResult = function(operationResult) {
  const headings = "\nEmployeeId, Beverage, Quantity, Date\n";
  const records = operationResult.reduce(function(context, userData) {
    const userRecords = userData.transactionRecords.reduce(function(
      context,
      record
    ) {
      recordDetails = `${userData["--empId"]}, ${record["--beverage"]}, ${record["--qty"]}, ${record["--date"]}`;
      context.push(recordDetails);
      return context;
    },
    []);
    return context.concat(userRecords);
  }, []);

  const totalBeverages = records.reduce((context, record) => {
    context = context + +record.split(",")[2];
    return context;
  }, 0);

  const result = `${headings}${records.join(
    "\n"
  )}\n\nTotal: ${totalBeverages} Juices`;
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

exports.getOperationResult = getOperationResult;
exports.saveRecordResult = saveRecordResult;
exports.queryRecordResult = queryRecordResult;