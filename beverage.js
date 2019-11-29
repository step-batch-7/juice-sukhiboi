const fs = require("fs");
const utils = require("./src/utils");
const getOperationResult = require("./src/operationResut").getOperationResult;

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
  const result = getOperationResult(processedResult, userArgs);
  console.log(result);
};

main(process.argv);
