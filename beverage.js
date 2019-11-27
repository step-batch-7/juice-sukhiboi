const fs = require("fs");
const utils = require("./src/utils");

const main = function(args) {
  const userArgs = utils.formatArgs(args);
  const date = new Date();
  const operation = utils.getOperation(userArgs);
  const transaction = utils.parseTransaction(userArgs);
  const result = operation(
    transaction,
    date,
    fs.readFileSync,
    fs.writeFileSync
  );
  const operationResult = utils.getOperationResult(result, userArgs);
  console.log(operationResult);
};

main(process.argv);
