const DB = require('./db.js');
class Users{
  #db;
  constructor(){
    this.#db = new DB();
  };
  /*
definiuje funkcję "createUsersTable", która tworzy tabelę "users" w bazie danych, jeśli nie istnieje. 
Funkcja tworzy kolumny dla "id", "email", "password" i "name". Kolumna "id" jest kluczem podstawowym i jest automatycznie inkrementowana.
Funkcja wykonuje zapytanie do bazy danych za pomocą metody "query" z obiektu "db" i wywołuje funkcję zwrotną, która wyświetla informację o utworzeniu tabeli.
*/
  createUsersTable(){
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    )
  `;
  this.#db.CREATE(query);
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