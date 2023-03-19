const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "db",
  user: "giga_user",
  password: "maslo",
  database: "crypto_shop_db",
});

app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow

  res.setHeader("Access-Control-Allow-Headers", [
    "Content-Type",
    "authorization",
  ]);

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/login", (req, res) => {
  db.query(
    "INSERT INTO `test` (`Id`, `email`, `password`, `name`) VALUES ('', 'dsss', 'sssd', 'sdss')",
    (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    }
  );
});

app.listen("3001", () => {
  console.log("it works");
});
