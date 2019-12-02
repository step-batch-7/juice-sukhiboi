const { saveRecord } = require("./saveRecord");
const { query } = require("./query");

const getOperation = function(args) {
  const availableOptions = {
    "--save": saveRecord,
    "--query": query
  };
  const operationName = args[0];
  let operation = availableOptions[operationName];
  return operation;
};

const getOptions = function(operation) {
  const transactionObjects = {
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
  return transactionObjects[operation];
};

const optionParser = function(transactionDetails, args) {
  let transaction = transactionDetails;
  for (let idx = 0; idx < args.length; idx += 2) {
    if (args[idx] in transaction) {
      transaction[args[idx]] = args[idx + 1];
    }
  }
  return transaction;
};

module.exports = {
  getOperation,
  getOptions,
  optionParser
};
