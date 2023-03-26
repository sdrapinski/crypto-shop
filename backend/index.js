const express = require("express");
const app = express();
const mysql = require("mysql2");
const user = require("./user");

const db = mysql.createPool({
  host: "db",
  user: "giga_user",
  password: "maslo",
  database: "crypto_shop_db",
  port: "3306",
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
  user.getUsers((data) => {
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  user.addUser("test@test.com", "password", "Test User");
  res.send("User added");
});

user.createUsersTable();


const createInitialData = () => {
  const users = [
    { email: 'szymon@example.com', password: 'password1', name: 'testowe1' },
    { email: 'maciej@example.com', password: 'password2', name: 'testowe2' },
    { email: 'kuba@example.com', password: 'password3', name: 'testowe3' },
    { email: 'olek@example.com', password: 'password3', name: 'testowe4' },
  ];

  const insertUsersSql =
  'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';

  /*
users.forEach((user) => {
  db.query(insertUsersSql, [user.email, user.password, user.name], (err, result) => {
    if (err) throw err;
    console.log(`Uzytkownik ${user.name} zostal dodany do bazy`);
  });
});
};
*/

users.forEach((user) => {
  const checkUserSql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  db.query(checkUserSql, [user.email], (err, result) => {
  if (err) throw err;
  if (result[0].count === 0) {
  db.query(insertUsersSql, [user.email, user.password, user.name], (err, result) => {
  if (err) throw err;
  console.log(`Uzytkownik ${user.name} zostal dodany do bazy`);
  });
  } else {
  console.log(`Uzytkownik ${user.name} juz istnieje w bazie`);
  }
  });
  });
};

// Wywołanie funkcji createInitialData
createInitialData();

app.listen("3001", () => {
  console.log("it works");
});
