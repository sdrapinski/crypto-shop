const express = require("express");
const app = express();
const port = process.env.port || 3001;

const routes = require('./routes.js');
routes(app);

const mysql = require('./scripts/mysql.js');
mysql.createInitialData();

app.listen(port, () => {
  console.log("it works");
});
