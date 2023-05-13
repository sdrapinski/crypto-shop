const db = require("./db.js");

class createData {
  #db;
  #currentDate = "2023-03-29";
  constructor() {
    this.#db = new db();
  }
  createDataBase() {
    this.regionDatabase();
    this.usersDatabase();
    this.productsCategory();
    this.products();
    this.basket();
    this.productsSold();
    this.watchedProducts();
    this.insertData();
  }
  async insertData() {
    const regionData = [
      {
        continent: "Europa",
        country: "Niemcy",
        city: "Berlin",
        street: "Północna",
      },
      {
        continent: "Afryka",
        country: "Ksenia",
        city: "Wakanda",
        street: "Południowa",
      },
      {
        continent: "Azja",
        country: "Chiny",
        city: "Shanghaj",
        street: "Zachodnia",
      },
      {
        continent: "Ameryka",
        country: "Stany Zjednoczone",
        city: "Nowy Jork",
        street: "Wschodnia",
      },
    ];
    await this.initialDatabase("region", regionData);
    const usersData = [
      {
        user_region_id: 1,
        user_name: "Maciej",
        user_surname: "Adamski",
        user_age: 20,
        user_email: "warhammer40k@mechanicus.pl",
        user_phone_number: "666 666 666",
        user_login: "Maciej",
        user_password: "Maciej",
        join_date: this.#currentDate,
      },
      {
        user_region_id: 2,
        user_name: "Szymon",
        user_surname: "Drapiński",
        user_age: 21,
        user_email: "sterydiany@gym.pl",
        user_phone_number: "696 969 696",
        user_login: "Szymon",
        user_password: "Szymon",
        join_date: this.#currentDate,
      },
      {
        user_region_id: 3,
        user_name: "Aleksander",
        user_surname: "Chomicz",
        user_age: 21,
        user_email: "harryPotter@crush.pl",
        user_phone_number: "969 696 969",
        user_login: "Aleksander",
        user_password: "Aleksander",
        join_date: this.#currentDate,
      },
      {
        user_region_id: 4,
        user_name: "Jakub",
        user_surname: "Cegłowski",
        user_age: 20,
        user_email: "cegla@bruk.pl",
        user_phone_number: "000 000 000",
        user_login: "Jakub",
        user_password: "Jakub",
        join_date: this.#currentDate,
      },
    ];

    await this.initialDatabase("users", usersData);
    const productsCategoryData = [
      { products_category_name: "towary" },
      { products_category_name: "warzywa" },
      { products_category_name: "gabaryty" },
      { products_category_name: "rtv" },
    ];

    await this.initialDatabase("products_category", productsCategoryData);
    const productsData = [
      {
        user_id: 1,
        products_category_id: 1,
        product_name: "Niewolnicy",
        product_cost_cash: 100,
        product_cost_crypto: 1,
        product_quantity: 9999999,
        product_description: "Dobrze trzyma szpadel",
        photo_id: 0,
        promoted_for: null,
      },
      {
        user_id: 2,
        products_category_id: 2,
        product_name: "Kreatyna",
        product_cost_cash: 200,
        product_cost_crypto: 2,
        product_quantity: 800,
        product_description: "Najwyższej jakości kreatyna",
        photo_id: 0,
        promoted_for: null,
      },
      {
        user_id: 3,
        products_category_id: 3,
        product_name: "Chomiki",
        product_cost_cash: 150,
        product_cost_crypto: 1.5,
        product_quantity: 99999,
        product_description: "Śmiesznie piszczy jak zdepniesz",
        photo_id: 0,
        promoted_for: null,
      },
      {
        user_id: 4,
        products_category_id: 4,
        product_name: "Glazura",
        product_cost_cash: 80,
        product_cost_crypto: 0.8,
        product_quantity: 0,
        product_description: "Może i chujowe ale kto ma dobre",
        photo_id: 0,
        promoted_for: null,
      },
    ];
    await this.initialDatabase("products", productsData);
    const productsSoldData = [
      { product_id: 1, user_id: 4, sale_time: this.#currentDate },
      { product_id: 2, user_id: 3, sale_time: this.#currentDate },
      { product_id: 3, user_id: 2, sale_time: this.#currentDate },
      { product_id: 4, user_id: 1, sale_time: this.#currentDate },
    ];

    await this.initialDatabase("products_sold", productsSoldData);
    const watchedProductsData = [
      { product_id: 1, user_id: 2 },
      { product_id: 2, user_id: 1 },
      { product_id: 3, user_id: 4 },
      { product_id: 4, user_id: 3 },
    ];

    await this.initialDatabase("watched_products", watchedProductsData);
    const basketData = [
      { product_id: 1, user_id: 2, products_quantity: 99 },
      { product_id: 2, user_id: 1, products_quantity: 8 },
      { product_id: 3, user_id: 4, products_quantity: 999999 },
      { product_id: 4, user_id: 3, products_quantity: 100 },
    ];

    await this.initialDatabase("basket", basketData);
  }
  async regionDatabase() {
    const region =
      "CREATE TABLE IF NOT EXISTS region(region_id INT PRIMARY KEY AUTO_INCREMENT,continent VARCHAR(10) NOT NULL,country VARCHAR(100) NOT NULL,city VARCHAR(100) NOT NULL,street VARCHAR(100) NOT NULL)";
    await this.#db.CREATE(region);
  }
  async usersDatabase() {
    const users =
      "CREATE TABLE IF NOT EXISTS users(user_id INT PRIMARY KEY AUTO_INCREMENT,user_region_id INT NOT NULL,FOREIGN KEY (user_region_id) REFERENCES region(region_id),user_name VARCHAR(100) NOT NULL,user_surname VARCHAR(100) NOT NULL,user_age INT NOT NULL,user_email VARCHAR(100) NOT NULL,user_phone_number VARCHAR(20),user_login VARCHAR(100) NOT NULL,user_password VARCHAR(100) NOT NULL,join_date DATE NOT NULL)";
    await this.#db.CREATE(users);
  }
  async productsCategory() {
    const productsCategory =
      "CREATE TABLE IF NOT EXISTS products_category( products_category_id INT PRIMARY KEY AUTO_INCREMENT, products_category_name TINYTEXT )";
    await this.#db.CREATE(productsCategory);
  }
  async products() {
    const products =
      "CREATE TABLE IF NOT EXISTS products( product_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id), products_category_id INT NOT NULL, FOREIGN KEY (products_category_id) REFERENCES products_category(products_category_id), product_name TINYTEXT NOT NULL, product_cost_cash FLOAT NOT NULL, product_cost_crypto FLOAT, product_quantity INT NOT NULL, product_description TINYTEXT, photo_id INT, added_when TIMESTAMP NOT NULL, promoted_for DATE NULL)";
    await this.#db.CREATE(products);
  }
  async productsSold() {
    const productsSold =
      "CREATE TABLE IF NOT EXISTS products_sold( product_sold_id INT PRIMARY KEY AUTO_INCREMENT, product_id INT NOT NULL, FOREIGN KEY (product_id) REFERENCES products(product_id), user_id INT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(user_id), sale_time DATE NOT NULL )";
    await this.#db.CREATE(productsSold);
  }
  async watchedProducts() {
    const watchedProducts =
      "CREATE TABLE IF NOT EXISTS watched_products( watched_product_id INT PRIMARY KEY AUTO_INCREMENT, product_id INT NOT NULL, FOREIGN KEY (product_id) REFERENCES products(product_id), user_id INT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(user_id))";
    await this.#db.CREATE(watchedProducts);
  }
  async basket() {
    const basket =
      "CREATE TABLE IF NOT EXISTS basket( basket_id INT PRIMARY KEY AUTO_INCREMENT, product_id INT NOT NULL, FOREIGN KEY (product_id) REFERENCES products(product_id), user_id INT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(user_id),products_quantity INT NOT NULL )";
    await this.#db.CREATE(basket);
  }
  async initialDatabase(tableName = "", insertData = []) {
    const result = await this.#db.SELECT(
      `SELECT COUNT(*) AS count FROM ${tableName}`
    );
    if (result[0].count === 0) {
      await insertData.forEach((singleInsertData) => {
        const keysString = Object.keys(singleInsertData).join(", ");
        const valuesString = Object.values(singleInsertData)
          .map((val) => (typeof val === "string" ? `'${val}'` : val))
          .join(", ");
        this.#db.INSERT(
          `INSERT INTO ${tableName} (${keysString}) VALUES (${valuesString})`
        );
      });
    } else {
      console.log("Users already exists");
    }
  }
}
module.exports = createData;
