const { updateTransactions } = require("./utils");

const createTransactionRecord = function(transaction, date) {
  const record = {
    beverage: transaction.beverage,
    qty: transaction.qty,
    date: date,
    empId: transaction.empId
  };
  return record;
};

const saveRecord = function(transaction, config) {
  if (transaction.error != undefined) return transaction;
  const record = createTransactionRecord(transaction, config.date);
  const latestRecord = updateTransactions(record, config);
  return [latestRecord];
};

module.exports = { saveRecord, createTransactionRecord };
