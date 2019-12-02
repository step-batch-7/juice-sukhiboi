# Anna Juice Ltd. ![node](https://img.shields.io/node/v/v)
### An app to mantain the records of beverage 

## Installation
---
Use [git](https://git-scm.com/) to install this app and [npm](https://www.npmjs.com/) to install dependencies

```bash
git clone https://github.com/step-batch-7/juice-sukhiboi.git
cd juice-sukhiboi
npm install
```

## Usage
---
### You have to use this app with [node](https://nodejs.org/en). This app allow you to

#### Save a beverage transaction
```bash
node beverage.js --save --beverage Banana --empId 25344 --qty 1
```

#### execute a query on the transactions
```bash
node beverage.js --query --empId 25344
```

#

### Your given commands to this app should be one of the listed formats

 ```bash 
node beverage.js --save --beverage <Beverage Name> --empId <Employee ID> --qty <Quantity>
```
 ```bash
node beverage.js --query --empId <Employee ID>
```
 ```bash
node beverage.js --query --date <Date>
```
 ```bash
node beverage.js --query --empId <Employee ID> --date <Date>
```
 ```bash
node beverage.js --query --beverage <Beverage Name>
```
 ```bash
node beverage.js --query --beverage <Beverage Name> --empId <Employee ID> --date <Date>
``` 

#

### Data types of options

Option        | Data Type
--------------|-----------------
Beverage Name | String
Employee Id   | Positive Integer
Quantity      | Positive Integer
Date          | YYYY-MM-DD

#

### Transaction Storage Path
By default, the app is configured to create a file beverageRecords.json for storing transactions. 

But incase you want to change that path you can set the environment variable ```filename``` to you file path. 

```bash
export filename=<your-file-path>
```
