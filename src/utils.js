const { saveRecord } = require("./saveRecord");
const { query } = require("./query");
const { validateTransaction } = require("./validateTransaction");
const { joinHeader, joinBeverageCount } = require("./operationResut");

const formatArgs = function(args) {
  const userArgs = args.slice(2);
  return userArgs;
};

const getOperation = function(args) {
  const availableOptions = {
    "--save": saveRecord,
    "--query": query
  };
  const operationName = args[0];
  let operation = availableOptions[operationName];
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
      "--beverage": undefined,
      "--empId": undefined,
      "--date": undefined
    }
  };
  return transactionPrototypes[operation];
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
  const transaction = updateTransactionDetails(transactionDetails, args);
  return transaction;
};

const executeTransaction = function(args, config) {
  const userArgs = formatArgs(args);
  const validTransaction = validateTransaction(userArgs);
  if(!validTransaction) return "\nerror";
  const operation = getOperation(userArgs);
  const transaction = parseTransaction(userArgs);
  const result = operation(transaction, config);
  let message = "";
  if(userArgs[0] == "--save"){
    const transactionSavedMsg = "\nTransaction Recorded:";
    const toJson = true;
    let message = transactionSavedMsg + joinHeader(result, toJson);
    return message
  }
  message = joinHeader(result) + joinBeverageCount(result);
  return message;
};

module.exports = {
  formatArgs,
  getOperation,
  getTransactionPrototype,
  updateTransactionDetails,
  parseTransaction,
  validateTransaction,
  executeTransaction
};
