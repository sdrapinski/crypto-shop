const mysql = require("mysql2");

//Skrypt do tworzenia tabeli użytkowników w bazie danych MySQL, dodawania nowych użytkowników i pobierania listy użytkowników z bazy danych.

const db = mysql.createPool({ //definicja połączenia z bazą danych MySQL.
  host: "db",
  user: "giga_user",
  password: "maslo",
  database: "crypto_shop_db",
  port: "3306",
});

/*
definiuje funkcję "createUsersTable", która tworzy tabelę "users" w bazie danych, jeśli nie istnieje. 
Funkcja tworzy kolumny dla "id", "email", "password" i "name". Kolumna "id" jest kluczem podstawowym i jest automatycznie inkrementowana.
Funkcja wykonuje zapytanie do bazy danych za pomocą metody "query" z obiektu "db" i wywołuje funkcję zwrotną, która wyświetla informację o utworzeniu tabeli.
*/

function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    )
  `;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log("Users table created");
  });
}

/*
definiuje funkcję "addUser", która dodaje nowego użytkownika do tabeli "users" w bazie danych. 
Funkcja wykonuje zapytanie do bazy danych za pomocą metody "query" z obiektu "db" i przekazuje argumenty "email", "password" i "name". 
Funkcja wywołuje funkcję zwrotną, która wyświetla informację o dodaniu użytkownika.
*/
function addUser(email, password, name) {
  const query = `
    INSERT INTO users (email, password, name) 
    VALUES (?, ?, ?)
  `;
  db.query(query, [email, password, name], (err, res) => {
    if (err) throw err;
    console.log("User added");
  });
}

/*
definiuje funkcję "getUsers", która pobiera listę użytkowników z tabeli "users" w bazie danych. 
Funkcja wykonuje zapytanie do bazy danych za pomocą metody "query" z obiektu "db" i przekazuje funkcję zwrotną jako argument, która zostanie wywołana z wynikiem zapytania.
*/

function getUsers(callback) {
  const query = "SELECT * FROM users";
  db.query(query, (err, res) => {
    if (err) throw err;
    callback(res);
  });
}

module.exports = { createUsersTable, addUser, getUsers }; //eksportuje funkcje "createUsersTable", "addUser" i "getUsers" jako obiekt modułu, aby można je było wykorzystać w innych plikach.