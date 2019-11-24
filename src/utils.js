const saveRecord = require('./saveRecord').saveRecord;
const query = require('./query').query;

const formatArgs = function(args) {
  const userArgs = args.slice(2);
  return userArgs;
};

const getOperation = function(args) {
   const availableOptions = {
     "--save": saveRecord,
     "--query": query 
   }
   const operationName = args[0];
   const operation = availableOptions[operationName];
   return operation;
};

const parseTransaction = function(args) {
   const transactionObjects = {
     "--save": {
     beverage: args[2],
     empId: +args[4],
     qty: +args[6]
    },
     "--query": {
       empId: +args[2]
     } 
   }

   const operation = args[0];
   const transactionDetails = transactionObjects[operation];

   return transactionDetails;
};

exports.formatArgs = formatArgs;
exports.getOperation = getOperation;
exports.parseTransaction = parseTransaction;