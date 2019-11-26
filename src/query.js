const query = function(transaction, date, readFile) {
  const filename = "./beverageRecords.json";
  const contents = readFile(filename, "utf8");
  const records = JSON.parse(contents);
  const userTransactions = records[transaction["--empId"]];
  if (userTransactions == undefined) return { error: "User doesn't exists" };
  const userData = {
    transactionRecords: userTransactions,
    "--empId": transaction["--empId"]
  };
  return userData;
};

exports.query = query;
