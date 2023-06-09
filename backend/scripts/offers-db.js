const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
const { getRandomUniqueNumbers } = require("../utils/utils.js");
class Offers {
  #db = new DB();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  addOffer(
    user_id,
    products_id,
    products_category_id,
    product_name,
    product_cost_cash,
    product_cost_crypto,
    product_quantity,
    product_description,
    photo_id,
    added_when,
    popularity,
    promoted_for
  ) {
    const query = `
          INSERT INTO Products (user_id, product_name, products_category_id, product_cost_cash, product_cost_crypto, product_quantity, product_description, photo_id, added_when,promoted_for) 
          VALUES (${user_id}, ${product_name}, ${products_category_id}, ${product_cost_cash}, ${product_cost_crypto}, ${product_quantity}, ${product_description}, ${photo_id}, ${photo_id}, ${added_when},${promoted_for})
        `;
    return this.#db.INSERT(query);
  }
  removeOffer(products_id) {
    const query = `
          DELETE FROM Products WHERE products_id=${products_id}
        `;
    return this.#db.DELETE(query);
  }
  overwrite_Offer(
    products_id,
    product_name,
    product_cost_cash,
    product_cost_crypto,
    product_quantity,
    product_description,
    photo_id,
    added_when,
    promoted_for
  ) {
    const query = `
          UPDATE Products SET product_name=${product_name} ,product_cost_cash=${product_cost_cash}, product_cost_crypto= ${product_cost_crypto}, product_quantity=${product_quantity}, product_description=${product_description} , photo_id=  ${photo_id}, added_when=${added_when}, promoted_for=${promoted_for}
          WHERE products_id=${products_id}
        `;
    return this.#db.INSERT(query);
  }
  PromoUpdate(product_id, promoted_for) {
    const query = `
          UPDATE Products SET promoted_for=${promoted_for}
          WHERE products_id=${products_id}
          `;
    return this.#db.INSERT(query);
  }
  OfferSearch(Searched_pharse) {
    const query = `
           SELECT * from Products WHERE product_name LIKE '%${Searched_pharse}%' OR product_description LIKE '%${Searched_pharse}%'
          `;
    return this.#db.SELECT(query);
  }
  OfferSearchWithLimit(Searched_pharse, limit) {
    const query = `
           SELECT * from Products WHERE product_name LIKE '%${Searched_pharse}%' OR product_description LIKE '%${Searched_pharse}% limit ${limit}'
          `;
    return this.#db.SELECT(query);
  }
  PromotedOffers() {
    const query = `
           SELECT * from Products WHERE promoted_for>CURDATE() ORDER BY RAND() LIMIT 6
          `;
    return this.#db.SELECT(query);
  }

  async findProductsFromCategory(item) {
    const products = await this.#prisma.products.findMany({
      take: 6,
      where: {
        products_category_id: item,
      },
      include: {
        products_category: true,
      },
    });
    return products;
  }

  async mainpageproducts() {
    let invalidNumbers = [];
    let productsList = [];
    const categories = await this.#prisma.products_category.findMany({});

    let indexes = getRandomUniqueNumbers(1, categories.length, 3);

    for await (const item of indexes) {
      const products = await this.findProductsFromCategory(item);
      if (products.length === 0) {
        invalidNumbers.push(item);
      } else {
        productsList.push(products);
      }
    }
    if (invalidNumbers.length > 0) {
      console.log(invalidNumbers);
      let indexes = getRandomUniqueNumbers(
        1,
        categories.length,
        invalidNumbers.length,
        invalidNumbers
      );

      for (const newItems of indexes) {
        const products = await this.findProductsFromCategory(newItems);
        productsList.push(products);
      }
    }

    return productsList;
  }
}
module.exports = Offers;
