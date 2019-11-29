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

const updateRecord = function(record, filename, readFile, writeFile) {
  const contents = readFile(filename, "utf8");
  const recordData = updateTransactions(contents, record);
  writeFile(filename, recordData);
  return record;
};

const saveRecord = function(transaction, date, readFile, writeFile) {
  if (transaction.error != undefined) return transaction;
  const filename = "./beverageRecords.json";
  const record = createTransactionRecord(transaction, date);
  const latestRecord = updateRecord(record, filename, readFile, writeFile);
  return latestRecord;
};

exports.saveRecord = saveRecord;
exports.updateRecord = updateRecord;
exports.updateTransactions = updateTransactions;
exports.createTransactionRecord = createTransactionRecord;
