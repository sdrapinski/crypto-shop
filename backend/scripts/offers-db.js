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
    promoted_for,
    product_used
  ) {
    const query = `
          INSERT INTO Products (user_id, product_name, products_category_id, product_cost_cash, product_cost_crypto, product_quantity, product_description, photo_id, added_when,promoted_for, product_used) 
          VALUES (${user_id}, ${product_name}, ${products_category_id}, ${product_cost_cash}, ${product_cost_crypto}, ${product_quantity}, ${product_description}, ${photo_id}, ${photo_id}, ${added_when},${promoted_for},${product_used})
        `;
    return this.#db.INSERT(query);
  }
  async removeOffer(product_id) {
    const product = await this.#prisma.products.delete({
      where: {
        product_id: product_id,
      },
    });
    return product;
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
    promoted_for,
    product_used
  ) {
    const query = `
          UPDATE Products SET product_name=${product_name} ,product_cost_cash=${product_cost_cash}, product_cost_crypto= ${product_cost_crypto}, product_quantity=${product_quantity}, product_description=${product_description} , photo_id=  ${photo_id}, added_when=${added_when}, promoted_for=${promoted_for}, product_used=${product_used}
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

  async getUserProducts(user_id) {
    const products = await this.#prisma.products.findMany({
      where: {
        user_id: user_id,
      },
    });
    return products;
  }
  async getFilteredProducts(price_max, price_min, crypto_max, crypto_min, days_limit,Condition, Rating,category,Searched_pharse) {
    if (price_min!== null && price_max !== null) {
      where.AND.push({
        product_dollar_price: {
          gte: price_min,
          lte: price_max,
        },
      });
    }
    else if(price_min == null && price_max !== null)
    {
      where.AND.push({
        product_dollar_price: {
          lte: price_max,
        },
      });
    }
    else if(price_min !== null && price_max == null)
    {
      where.AND.push({
        product_dollar_price: {
          gte: price_min,
        },
      });
    }
    if (crypto_min!== null && crypto_max !== null) {
      where.AND.push({
        product_dollar_price: {
          gte: crypto_min,
          lte: crypto_max,
        },
      });
    }
    else if(crypto_min == null && price_mcrypto_maxax !== null)
    {
      where.AND.push({
        product_dollar_price: {
          lte: crypto_max,
        },
      });
    }
    else if(crypto_min !== null && price_crypto_maxax == null)
    {
      where.AND.push({
        product_crypto_price: {
          gte: crypto_min,
        },
      });
    }
    if (Rating !== null) {
      where.AND.push({
        popularity: {
          gte: Rating,
        },
      });
    }
    if (days_limit !== null) {
      const targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - daysLimit);
      where.AND.push({
        product_added_time: days_limit,
      });
    }
    if (Condition !== null) {
      where.AND.push({
        product_added_time: {
          gte: targetDate,
          lte: currentDate,
        },
      });
    }
    if (category !== null) {
      where.AND.push({
        products_category_id: category,
      });
    }
    if (Searched_pharse !== null) {
      where.AND.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    const products = await prisma.product.findMany({
      where,
    });
    return products;
  }
}
module.exports = Offers;
