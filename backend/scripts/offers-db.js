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

  async offersinCategory(CategoryId) {
    const products = await this.#prisma.products.findMany({
      take: 20,
      where: {
        products_category_id: parseInt(CategoryId),
      },
    });
    return products;
  }
  async Usersoffers(user_id) {
    const products = await this.#prisma.products.findMany({
      where: {
        user_id: user_id,
      },
    });
    return products;
  }

  async getProductByID(id) {
    console.log(id);
    const product = await this.#prisma.products.findFirst({
      where: {
        product_id: id,
      },
      include: {
        user: {
          select: {
            user_name: true,
          },
        },
      },
    });
    return product;
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
    let productsList = [];
    const categories = await this.#prisma.products_category.findMany({
      where: {
        products: {
          some: {},
        },
      },
    });

    let indexes = getRandomUniqueNumbers(0, categories.length - 1, 3);

    for await (const item of indexes) {
      const products = await this.findProductsFromCategory(
        categories[item].product_category_id
      );
      productsList.push(products);
    }
    return productsList;
  }
}
module.exports = Offers;
