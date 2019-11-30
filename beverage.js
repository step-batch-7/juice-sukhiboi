const executeTransaction = require("./src/utils").executeTransaction; 
const fs = require('fs');

const main = function(args) {
   const config = {
     date: new Date(),
     readFile: fs.readFileSync,
     writeFile: fs.writeFileSync
   }
   const result = executeTransaction(args, config);
   console.log(result);
};

main(process.argv);