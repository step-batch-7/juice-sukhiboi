const fs = require("fs");
const { executeTransaction } = require("./src/utils");

const main = function(args) {
  const config = {
    date: new Date(),
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync
  };
  const result = executeTransaction(args, config);
  console.log(result);
};

main(process.argv);