const mysql = require("mysql2");
class db {
    #db;
    constructor(){
        this.#db = mysql.createPool({
            host: "db",
            user: "giga_user",
            password: "maslo",
            database: "crypto_shop_db",
            port: "3306",
          });
    }
    SELECT(query){
        this.#db.query(query, (err, result)=>{
            if(err){
                this.error(err);
            }
            else{
                return result;
            }
        });
    }
    INSERT(query){
        this.#db.query(query, (err, result)=>{
            if(err){
                this.error(err);
            }
        });
    }
    CREATE(query){
        this.#db.query(query, (err, result)=>{
            if(err){
                this.error(err);
            }
        });
    }
    error(err){
        console.log(err);
    }
}
module.exports = db;