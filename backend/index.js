const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "CryptoShopDataBase",
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen("3000", () => {
  console.log("it works");
});
