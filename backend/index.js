const express = require("express");
const app = express();


const routes = require("./routes/routes");
routes(app);

// const createData = require('./scripts/createData.js');
// const data = new createData();
// data.createDataBase();

app.listen(3001, () => {
  console.log("it works!!!");

});
