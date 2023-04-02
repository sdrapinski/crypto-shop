const DB = require('./db.js');
class Users{
  #db;
  constructor(){
    this.#db = new DB();
  };

  /*
definiuje funkcję "addUser", która dodaje nowego użytkownika do tabeli "users" w bazie danych. 
Funkcja wykonuje zapytanie do bazy danych za pomocą metody "query" z obiektu "db" i przekazuje argumenty "email", "password" i "name". 
Funkcja wywołuje funkcję zwrotną, która wyświetla informację o dodaniu użytkownika.
*/
addUser(email, password, name){
  const query = `
    INSERT INTO users (email, password, name) 
    VALUES (${email}, ${password}, ${name})
  `;
  this.#db.INSERT(query);
};
/*
definiuje funkcję "getUsers", która pobiera listę użytkowników z tabeli "users" w bazie danych. 
Funkcja wykonuje zapytanie do bazy danych za pomocą metody "query" z obiektu "db" i przekazuje funkcję zwrotną jako argument, która zostanie wywołana z wynikiem zapytania.
*/
getUsers(callback){
  const query = "SELECT * FROM users";
  const result = this.#db.SELECT(query) != null ? this.#db.SELECT(query) : [];
  callback(result);
};
}

module.exports = Users;