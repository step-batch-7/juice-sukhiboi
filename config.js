const fs = require("fs");
const envDate = new Date(process.env.date);

module.exports.config = {
  filename: process.env.filename || "./beverageRecords.json",
  date: envDate.valueOf() ? envDate : new Date(),
  readFile: fs.readFileSync,
  writeFile: fs.writeFileSync,
  exists: fs.existsSync,
};