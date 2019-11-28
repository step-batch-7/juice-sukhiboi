const getFilteredRecords = function(filterRecords) {
  if (filterRecords == undefined) {
    return { error: "Employee doesn't exists" };
  }
  return filterRecords;
};

const filterWithDate = function(date, records) {
  const userRecords = records.filter(record => {
    const recordDate = record["--date"].split("T")[0];
    if (recordDate == date) {
      return record;
    }
  });
  return getFilteredRecords(userRecords);
};

const filterWithEmpId = function(empId, records) {
  const userRecords = records[empId];
  if (userRecords == undefined) return { error: "Employee doesn't exists" };
  const userData = [
    {
      transactionRecords: userRecords,
      "--empId": empId
    }
  ];
  return userData;
};

const filterWithEmpIdAndDate = function(empId, date, records) {
  const givenDate = date.split("T")[0];
  const userRecords = records[empId];
  if (userRecords == undefined) return { error: "Employee doesn't exists" };
  const filteredRecord = [
    {
      transactionRecords: filterWithDate(givenDate, userRecords),
      "--empId": empId
    }
  ];
  return filteredRecord;
};

const filterRecords = function(records, transactions) {
  const empId = transactions["--empId"];
  const date = transactions["--date"];

  if (empId != undefined && date != undefined) {
    return filterWithEmpIdAndDate(empId, date, records);
  }

  if (empId != undefined) {
    return filterWithEmpId(empId, records);
  }

  if (date != undefined) {
    const empIds = Object.keys(records);
    const filteredRecords = empIds.map(function(id) {
      const userData = {
        transactionRecords: filterWithDate(date, records[id]),
        "--empId": id
      };
      return userData;
    });
    if (filteredRecords.length == 0) return { error: "No records found" };
    return filteredRecords;
  }
  const filteredRecord = { error: "Invalid Options" };
  return filteredRecord;
};

const getRecords = function(filename, readFile) {
  const contents = readFile(filename, "utf8");
  const records = JSON.parse(contents);
  return records;
};

const query = function(transaction, date, readFile) {
  if (transaction.error != undefined) return transaction;
  const filename = "./beverageRecords.json";
  const records = getRecords(filename, readFile);
  const userTransactions = filterRecords(records, transaction);
  if (userTransactions.error != undefined) return userTransactions;
  return userTransactions;
};

exports.getFilteredRecords = getFilteredRecords;
exports.filterWithDate = filterWithDate;
exports.filterWithEmpId = filterWithEmpId;
exports.filterWithEmpIdAndDate = filterWithEmpIdAndDate;
exports.filterRecords = filterRecords;
exports.getRecords = getRecords;
exports.query = query;
