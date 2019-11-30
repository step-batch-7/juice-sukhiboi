const createTransactionRecord = function(transaction, date) {
  const record = {
    "--beverage": transaction["--beverage"],
    "--qty": transaction["--qty"],
    "--date": date,
    "--empId": transaction["--empId"]
  };
  return record;
};

const updateTransactions = function(content, record) {
  let records = JSON.parse(content);
  records.push(record);
  const updatedRecords = JSON.stringify(records);
  return updatedRecords;
};

const updateRecord = function(record, filename, config) {
  let contents = '[]';
  if(config.exists(filename)){
    contents = config.readFile(filename, "utf8");
  }
  const recordData = updateTransactions(contents, record);
  config.writeFile(filename, recordData);
  return record;
};

const saveRecord = function(transaction, config) {
  if (transaction.error != undefined) return transaction;
  const filename = "./beverageRecords.json";
  const record = createTransactionRecord(transaction, config.date);
  const latestRecord = updateRecord(record, filename, config);
  return latestRecord;
};

module.exports = {
  saveRecord,
  updateRecord,
  updateTransactions,
  createTransactionRecord
};
