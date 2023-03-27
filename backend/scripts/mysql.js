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
    { email: "szymon@example.com", password: "password1", name: "testowe1" },
    { email: "maciej@example.com", password: "password2", name: "testowe2" },
    { email: "kuba@example.com", password: "password3", name: "testowe3" },
    { email: "olek@example.com", password: "password3", name: "testowe4" },
  ];

  const areUsersAlreadyExist = "SELECT COUNT(*) AS count FROM users";
  db.query(areUsersAlreadyExist, (err, result) => {
    ////////////////////////////////////
    //dodawanie userow jezeli ich nie ma
    ///////////////////////////////////
    if (result[0].count === 0) {
      const insertUsersSql =
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";

      users.forEach((user) => {
        const checkUserSql =
          "SELECT COUNT(*) AS count FROM users WHERE email = ?";
        db.query(checkUserSql, [user.email], (err, result) => {
          if (result[0].count === 0) {
            db.query(
              insertUsersSql,
              [user.email, user.password, user.name],
              (err, result) => {
                console.log(`User ${user.name} added`);
              }
            );
          } else {
            console.log(`User ${user.name} already exist in db`);
          }
        });
      });
    } else {
      console.log("Users already exists");
    }
  });
};

module.exports = { createInitialData };
