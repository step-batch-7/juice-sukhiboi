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

const updateRecord = function(record, config) {
  let contents = '[]';
  if(config.exists(config.filename)){
    contents = config.readFile(config.filename, "utf8");
  }
  const recordData = updateTransactions(contents, record);
  config.writeFile(config.filename, recordData);
  return record;
};

const saveRecord = function(transaction, config) {
  if (transaction.error != undefined) return transaction;
  const record = createTransactionRecord(transaction, config.date);
  const latestRecord = updateRecord(record, config);
  return [latestRecord];
};

module.exports = {
  saveRecord,
  updateRecord,
  updateTransactions,
  createTransactionRecord
};
