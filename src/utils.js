const updateTransactions = function(record, config) {
  let contents = "[]";
  if (config.exists(config.filename)) {
    contents = config.readFile(config.filename, "utf8");
    if (contents == "") {
      contents = "[]";
    }
  }
  const recordData = JSON.parse(contents);
  recordData.push(record);
  const updatedRecordData = JSON.stringify(recordData);
  config.writeFile(config.filename, updatedRecordData);
  return record;
};

const loadTransactions = function(config) {
  let contents = "[]";
  if (config.exists(config.filename)) {
    contents = config.readFile(config.filename, "utf8");
  }
  const recordsAsJSON = JSON.parse(contents);
  return recordsAsJSON;
};

const getDefinedKeys = function(transaction) {
  const keys = Object.keys(transaction);
  const validKeys = [];
  for (key of keys) {
    if (transaction[key] != undefined) {
      validKeys.push(key);
    }
  }
  return validKeys;
};

module.exports = {
  updateTransactions,
  loadTransactions,
  getDefinedKeys
};
