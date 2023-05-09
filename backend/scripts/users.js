const DB = require("./db.js");
class Users {
  #db;
  constructor() {
    this.#db = new DB();
  }

  addUser(email, password, name) {
    const query = `
    INSERT INTO users (email, password, name) 
    VALUES (${email}, ${password}, ${name})
  `;
    return this.#db.INSERT(query);
  }

  findUser(user) {
    const query = `select * from users where user_email="${user.email}" and user_password="${user.password}" limit 1`;
    return this.#db.SELECT(query);
  }

  getUsers(callback) {
    const query = "SELECT * FROM users";
    const result = this.#db.SELECT(query) != null ? this.#db.SELECT(query) : [];
    callback(result);
  }
}

module.exports = Users;
