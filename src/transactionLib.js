const { getOperation, getOptions, optionParser } = require("./optionLib");
const { validateTransaction } = require("./validateTransaction");
const { joinBeverageCount, joinHeader } = require("./operationResut");

const parseTransaction = function(args) {
  const operation = args[0];
  const userArgs = args.slice(1);
  const transactionDetails = getOptions(operation);
  const transaction = optionParser(transactionDetails, userArgs);
  return transaction;
};

const executeTransaction = function(args, config) {
  const userArgs = args.slice(2);
  const validTransaction = validateTransaction(userArgs);
  if (!validTransaction) return "\nerror";
  const operation = getOperation(userArgs);
  const transaction = parseTransaction(userArgs);
  const result = operation(transaction, config);
  let message = "";
  if (userArgs[0] == "--save") {
    const transactionSavedMsg = "\nTransaction Recorded:";
    const toJson = true;
    let message = transactionSavedMsg + joinHeader(result, toJson);
    return message;
  }
  message = joinHeader(result) + joinBeverageCount(result);
  return message;
};

module.exports = {
  parseTransaction,
  executeTransaction
};
