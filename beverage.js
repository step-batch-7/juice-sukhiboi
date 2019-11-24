const formatArgs = require('./src/utils').formatArgs;
const getOperation = require("./src/utils").getOperation;
const parseTransaction = require('./src/utils').parseTransaction;

const main = function(args) {
   const userArgs = formatArgs(args);
   const operation = getOperation(userArgs);
   const transaction = parseTransaction(userArgs); 
   const output = operation(transaction);
   console.log(output);
};

main(process.argv);