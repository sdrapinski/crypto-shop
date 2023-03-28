const mysql = require("mysql2");
const Users = require("./users.js");
const user = new Users();
const db = require("./db.js");

class createData{
  #db;
  constructor(){
    this.#db = new db();
  }
  createInitialData(){
    user.createUsersTable();
    const users = [
      { email: 'szymon@example.com', password: 'password1', name: 'testowe1' },
      { email: 'maciej@example.com', password: 'password2', name: 'testowe2' },
      { email: 'kuba@example.com', password: 'password3', name: 'testowe3' },
      { email: 'olek@example.com', password: 'password3', name: 'testowe4' },
    ];
    const areUsersAlreadyExist = "SELECT COUNT(*) AS count FROM users";
    const result = this.#db.SELECT(areUsersAlreadyExist);
    if (result[0].count === 0) {
      users.forEach((user) => {
        const insertUsersSql =`INSERT INTO users (email, password, name) VALUES (${user.email}, ${user.password}, ${user.name})`;
        this.#db.INSERT(insertUsersSql);
      });
    } else {
      console.log("Users already exists");
    }
  };
  }

module.exports = createData;