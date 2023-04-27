const mysql = require("mysql2");
class db {
  #db;
  constructor() {
    this.#db = mysql.createPool({
      host: "db",
      user: "giga_user",
      password: "maslo",
      database: "crypto_shop_db",
      port: "3306",
    });
  }
  async SELECT(query) {
    return this.#db
      .promise()
      .query(query)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((err) => {
        this.error(err);
      });
  }
  INSERT(query) {
    this.#db.query(query, (err, result) => {
      if (err) {
        this.error(err);
      }
    });
  }
  CREATE(query) {
    this.#db.query(query, (err, result) => {
      if (err) {
        this.error(err);
      }
    });
  }
  DELETE(query) {
    this.#db.query(query, (err, result) => {
      if (err) {
        this.error(err);
        reject(err); // Reject the promise with the error
      } else {
        // Check if the query was successful and the expected number of rows were deleted
        if (result && result.affectedRows > 0) {
          console.log("Deletion successful"); // Or call a success handler function
          resolve(result); // Resolve the promise with the result
        } else {
          console.log("No rows were deleted"); // Or call a no-rows-deleted handler function
          resolve(result); // Resolve the promise with the result
        }
      }
    });
  }
  error(err) {
    console.log(err);
  }
}
module.exports = db;
