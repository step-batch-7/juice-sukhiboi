const createFilter = function(key, value) {
  return function(records) {
    const filteredRecords = records.filter(record => {
      if (key == "--date") {
        let recordDate = record[key].split("T")[0];
        if (recordDate == value) return record;
      }
      if (record[key] == value) return record;
    });
    return filteredRecords;
  };
};

const getValidKeys = function(transaction) {
  const keys = Object.keys(transaction);
  const validKeys = [];
  for (key of keys) {
    if (transaction[key] != undefined) {
      validKeys.push(key);
    }
  }
  return validKeys;
};

const filterRecords = function(records, transaction) {
  const keys = getValidKeys(transaction);
  if (keys.length == 0) return [];

  const filters = keys.map(key => createFilter(key, transaction[key]));

  let filteredRecords = records;
  for (filter of filters) {
    filteredRecords = filter(filteredRecords);
  }
  return filteredRecords;
};

const getRecords = function(filename, readFile) {
  const contents = readFile(filename, "utf8");
  const recordsAsJSON = JSON.parse(contents);
  return recordsAsJSON;
};

const query = function(transaction, config) {
  if (transaction.error != undefined) return transaction;
  const filename = "./beverageRecords.json";
  const records = getRecords(filename, config.readFile);
  const userTransactions = filterRecords(records, transaction);
  if (userTransactions.error != undefined) return userTransactions;
  return userTransactions;
};

module.exports = {
  filterRecords,
  getRecords,
  query
};
