const DB = require("./db.js");

class Categories {
  #db = new DB();
  AskCats() {
    const query = `
          SELECT products_category_name FROM products_category
        `;
    return this.#db.SELECT(query);
  }
  Categoriesformainpage() {
    const query = `
      foreach products_category
      {
        SELECT p.*
        FROM categories c
        JOIN products p ON c.products_category_id = p.products_category_id
        GROUP BY c.category_id
        ORDER BY added_when
        LIMIT 3;
      }
        `;
    return this.#db.SELECT(query);
  }
}
module.exports = Categories;
