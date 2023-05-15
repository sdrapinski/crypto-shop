const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
class Categories {
  #db = new DB();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async getCategories() {
    const categories = await this.#prisma.products_category.findMany({});
    return categories;
  }
  categoriesForMainPage() {
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
