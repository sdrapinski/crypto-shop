const express = require("express");
const app = express();
const port = process.env.port || 3001;

const routes = require('./routes.js');
routes(app);

const createData = require('./scripts/createData.js');
const data = new createData();
data.createInitialData();

app.listen(port, () => {
  console.log("it works");
});
