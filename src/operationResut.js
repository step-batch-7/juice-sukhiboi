const joinBeverageCount = function(result) {
  const totalBeverages = result.reduce((context, record) => {
    context = context + +record.qty;
    return context;
  }, 0);
  let message = "";
  message = `\nTotal: ${totalBeverages} Juices`;
  if (totalBeverages < 2) message = `\nTotal: ${totalBeverages} Juice`;
  return message;
};

const joinHeader = function(result, toJson) {
  const header = "EmployeeId,Beverage,Quantity,Date\n";
  const records = result.map(transaction => {
    const empId = transaction.empId;
    const beverage = transaction.beverage;
    const qty = transaction.qty;
    let date = transaction.date;
    if (toJson) date = date.toJSON();
    return `${empId},${beverage},${qty},${date}`;
  });
  const message = header + [...records].join("\n");
  return message;
};

module.exports = {
  joinBeverageCount,
  joinHeader
};
