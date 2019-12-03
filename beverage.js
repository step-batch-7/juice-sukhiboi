const { executeTransaction } = require("./src/transactionLib");
const { config } = require("./config");

const main = function(args) {
  const result = executeTransaction(args, config);
  console.log(result);
};

main(process.argv);
