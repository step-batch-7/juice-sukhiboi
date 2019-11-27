const saveRecord = require("./saveRecord").saveRecord;
const query = require("./query").query;
const validateTransaction = require("./validateTransaction")
  .validateTransaction;

const formatArgs = function(args) {
  const userArgs = args.slice(2);
  return userArgs;
};

const errorMessage = function(object) {
  return object;
};

const getOperation = function(args) {
  const availableOptions = {
    "--save": saveRecord,
    "--query": query
  };
  const operationName = args[0];
  let operation = availableOptions[operationName];
  if (operation == undefined) {
    operation = errorMessage;
  }
  return operation;
};

const parseTransaction = function(args) {
  const transactionObjects = {
    "--save": {
      "--beverage": "",
      "--empId": "",
      "--qty": ""
    },
    "--query": {
      "--empId": ""
    }
  };

  const operation = args[0];
  const transactionDetails = transactionObjects[operation];
  if (transactionDetails == undefined) {
    return {
      error: "Invalid Command"
    };
  }
  const options = args.slice(1);
  for (let idx = 0; idx < options.length; idx += 2) {
    transactionDetails[options[idx]] = options[idx + 1];
  }
  const result = validateTransaction(transactionDetails);
  if (result) return transactionDetails;
  return { error: "Invalid Options" };
};

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
  const records = operationResult.transactionRecords.map(record => {
    recordDetails = `${operationResult["--empId"]}, ${record["--beverage"]}, ${record["--qty"]}, ${record["--date"]}`;
    return recordDetails;
  });
  const totalBeverages = operationResult.transactionRecords.reduce(
    (context, record) => {
      context = context + +record["--qty"];
      return context;
    },
    0
  );
  const result = `${headings}${records.join(
    "\n"
  )}\n\nTotal: ${totalBeverages} Juices`;
  return result;
};

const getOperationResult = function(operationResult, userArgs) {
  if (operationResult.error != undefined) return operationResult.error;
  const results = {
    "--save": saveRecordResult,
    "--query": queryRecordResult
  };
  const operation = userArgs[0];
  const resultOperation = results[operation];
  const result = resultOperation(operationResult);
  return result;
};

exports.formatArgs = formatArgs;
exports.getOperation = getOperation;
exports.parseTransaction = parseTransaction;
exports.getOperationResult = getOperationResult;
exports.errorMessage = errorMessage;
exports.saveRecordResult = saveRecordResult;
exports.queryRecordResult = queryRecordResult;
exports.validateTransaction = validateTransaction;
