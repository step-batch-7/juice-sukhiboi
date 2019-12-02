const isValidBeverage = function(beverage) {
  if (beverage == undefined) return beverage;
  return beverage !== "" && beverage !== undefined;
};

const isPositiveInt = function(value) {
  if (value == undefined) return value;
  return Number(value) > 0;
};

const isValidDate = function(date) {
  if (date == undefined) return date;
  return new Date(date) != "Invalid Date";
};

const formatTransaction = function(args, options) {
  let transactionDetails = {};
  options.map(option => {
    transactionDetails[option] = undefined;
  });
  for (let idx = 0; idx < args.length; idx += 2) {
    if (args[idx] in transactionDetails) {
      transactionDetails[args[idx]] = args[idx + 1];
    }
  }
  return transactionDetails;
};

const saveValidator = function(transactionDetails, validations) {
  const validBeverage = validations[0](transactionDetails["--beverage"]);
  const validEmpId = validations[1](transactionDetails["--empId"]);
  const validQty = validations[2](transactionDetails["--qty"]);
  return validBeverage && validEmpId && validQty;
};

const queryValidator = function(transactionDetails, validations) {
  const validBeverage = validations[0](transactionDetails["--beverage"]);
  const validEmpId = validations[1](transactionDetails["--empId"]);
  const validDate = validations[2](transactionDetails["--date"]);

  const options = [validBeverage, validEmpId, validDate];
  const validOptions = options.filter(option => option != undefined);
  const isValid = validOptions.reduce((context, option) => {
    context = context && option;
    return context;
  }, true);
  return isValid;
};

const validateTransaction = function(args) {
  const userArgs = args.slice(1);
  if (userArgs.length % 2 !== 0 || userArgs.length < 1) {
    return false
  };
  const option = args[0];
  const validOptions = {
    "--save": {
      options: ["--beverage", "--empId", "--qty"],
      validation: [isValidBeverage, isPositiveInt, isPositiveInt],
      validator: saveValidator
    },
    "--query": {
      options: ["--beverage", "--empId", "--date"],
      validation: [isValidBeverage, isPositiveInt, isValidDate],
      validator: queryValidator
    }
  };
  const command = validOptions[option];
  if(command == undefined) return false;
  const transactionDetails = formatTransaction(userArgs, command.options);
  const isValid = command.validator(transactionDetails, command.validation);
  return isValid;
};

module.exports = {
  isValidBeverage,
  isPositiveInt,
  isValidDate,
  formatTransaction,
  validateTransaction
};
