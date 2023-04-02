console.log("Tworzenie bazy danych ...");
const createData = require("./createData.js");
const database = new createData();
database.createDataBase();