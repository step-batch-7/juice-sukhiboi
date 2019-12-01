const fs = require("fs");
const { executeTransaction } = require("./src/utils");

const main = function(args) {
  const envDate = new Date(process.env.date);
  const config = {
    filename: process.env.filename || "./beverageRecords.json",
    date: envDate.valueOf() ? envDate : new Date(),
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    exists: fs.existsSync
  };
  const result = executeTransaction(args, config);
  console.log(result);
};

main(process.argv);
