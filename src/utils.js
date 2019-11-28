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

const getTransactionPrototype = function(operation) {
  const transactionPrototypes = {
    "--save": {
      "--beverage": undefined,
      "--empId": undefined,
      "--qty": undefined
    },
    "--query": {
      "--empId": undefined,
      "--date": undefined
    }
  };

  const prototype = transactionPrototypes[operation];
  const errorObj = { error: "Invalid Command" };
  if (prototype == undefined) {
    return errorObj;
  }
  return prototype;
};

const updateTransactionDetails = function(transactionDetails, args) {
  let transaction = transactionDetails;
  for (let idx = 1; idx < args.length; idx += 2) {
    if (args[idx] in transaction) {
      transaction[args[idx]] = args[idx + 1];
    }
  }
  return transaction;
};

const parseTransaction = function(args) {
  const operation = args[0];
  const transactionDetails = getTransactionPrototype(operation);
  if (transactionDetails.error != undefined) return transactionDetails;
  const transaction = updateTransactionDetails(transactionDetails, args);
  const result = validateTransaction(transaction, args);
  if (result) return transactionDetails;
  return { error: "Invalid Options" };
};

exports.formatArgs = formatArgs;
exports.getOperation = getOperation;
exports.getTransactionPrototype = getTransactionPrototype;
exports.updateTransactionDetails = updateTransactionDetails;
exports.parseTransaction = parseTransaction;
exports.errorMessage = errorMessage;
exports.validateTransaction = validateTransaction;
