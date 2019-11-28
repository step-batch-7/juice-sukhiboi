const fs = require("fs");
const utils = require("./src/utils");
const operationResult = require('./src/operationResut');

const main = function(args) {
  const userArgs = utils.formatArgs(args);
  const date = new Date();
  const operation = utils.getOperation(userArgs);
  const transaction = utils.parseTransaction(userArgs);
  const processedResult = operation(
    transaction,
    date,
    fs.readFileSync,
    fs.writeFileSync
  );
  const result = operationResult.getOperationResult(processedResult, userArgs);
  console.log(result);
};

main(process.argv);
