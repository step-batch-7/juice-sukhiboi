const { loadTransactions, getDefinedKeys } = require("./utils");

const createFilter = function(key, value) {
  return function(records) {
    const filteredRecords = records.filter(record => {
      if (key == "date") {
        let recordDate = record[key].split("T")[0];
        if (recordDate == value) return record;
      }
      if (record[key] == value) return record;
    });
    return filteredRecords;
  };
};

const filterRecords = function(records, transaction) {
  const keys = getDefinedKeys(transaction);
  if (keys.length == 0) return [];
  const filters = keys.map(key => createFilter(key, transaction[key]));
  let filteredRecords = records;
  for (filter of filters) {
    filteredRecords = filter(filteredRecords);
  }
  return filteredRecords;
};

const query = function(transaction, config) {
  if (transaction.error != undefined) return transaction;
  const records = loadTransactions(config);
  const userTransactions = filterRecords(records, transaction);
  if (userTransactions.error != undefined) return userTransactions;
  return userTransactions;
};

module.exports = {
  query,
  filterRecords,
  createFilter
};
