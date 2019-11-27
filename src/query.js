const filterRecords = function(records, transactions) {
  const empId = transactions["--empId"];
  const date = transactions["--date"];

  if (empId != "" && date != "" && date != undefined) {
    const givenDate = date.split("T")[0];
    const userRecords = records[empId];
    if (userRecords == undefined) return { error: "Employee doesn't exists" };
    const filteredRecord = userRecords.filter(record => {
      const recordDate = record["--date"].split("T")[0];
      if (recordDate == givenDate) {
        return record;
      }
    });
    return filteredRecord;
  }

  if (empId != "") {
    const userRecords = records[empId];
    return userRecords;
  }

  const filteredRecord = { error: "Invalid Options" };
  return filteredRecord;
};

const query = function(transaction, date, readFile) {
  if (transaction.error != undefined) return transaction;
  const filename = "./beverageRecords.json";
  const contents = readFile(filename, "utf8");
  const records = JSON.parse(contents);
  const userTransactions = filterRecords(records, transaction);
  if (userTransactions == undefined)
    return { error: "Employee doesn't exists" };
  if (userTransactions.error != undefined) return userTransactions;
  const userData = {
    transactionRecords: userTransactions,
    "--empId": transaction["--empId"]
  };
  return userData;
};

exports.filterRecords = filterRecords;
exports.query = query;
