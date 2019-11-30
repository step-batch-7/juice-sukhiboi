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
  let contents;
  try {
    contents = readFile(filename, "utf8");
  } catch (e) {
    contents = "[]";
  }
  const recordData = updateTransactions(contents, record);
  writeFile(filename, recordData);
  return record;
};

const saveRecord = function(transaction, config) {
  if (transaction.error != undefined) return transaction;
  const filename = "./beverageRecords.json";
  const record = createTransactionRecord(transaction, config.date);
  const latestRecord = updateRecord(
    record,
    filename,
    config.readFile,
    config.writeFile
  );
  return latestRecord;
};

module.exports = {
  saveRecord,
  updateRecord,
  updateTransactions,
  createTransactionRecord
};
