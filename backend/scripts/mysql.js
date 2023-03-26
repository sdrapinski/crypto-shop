const mysql = require("mysql2");
const user = require("./users.js");

const db = mysql.createPool({
  host: "db",
  user: "giga_user",
  password: "maslo",
  database: "crypto_shop_db",
  port: "3306",
});

const createInitialData = () => {
  user.createUsersTable();
  const users = [
    { email: 'szymon@example.com', password: 'password1', name: 'testowe1' },
    { email: 'maciej@example.com', password: 'password2', name: 'testowe2' },
    { email: 'kuba@example.com', password: 'password3', name: 'testowe3' },
    { email: 'olek@example.com', password: 'password3', name: 'testowe4' },
  ];

  const insertUsersSql =
  'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';

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

module.exports = {createInitialData};