const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
const { getRandomUniqueNumbers } = require("../utils/utils.js");
class Offers {
  #db = new DB();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async addOffer(
    Productinfo
  ) {
    const products = await this.#prisma.products.create({
      data:{
        product_id:Productinfo.products_id,
        user_id:Productinfo.user_id,
        products_category_id:Productinfo.products_category_id,
        product_name:Productinfo.product_name,
        product_description:Productinfo.product_description,
        product_images:Productinfo.photo_id,
        product_dollar_price:Productinfo.product_cost_cash,
        product_crypto_prices:Productinfo.product_cost_crypto,
        product_quantity:Productinfo.product_quantity,
        product_popularity:Productinfo.popularity,
        product_added_time:Productinfo.added_when,
        product_promotion:Productinfo.promoted_for,
        product_used:Productinfo.product_used,
      },
    });
    return products;
  }
  async removeOffer(product_id) {
    const product = await this.#prisma.products.delete({
      where: {
        product_id: product_id,
      },
    });
    return product;
  }
  async overwrite_Offer(
    Productinfo
  ) {
    const product = await this.#prisma.products.update({
      where: {
        product_id: product_id,
      },
      data:{
        products_category_id:Productinfo.products_category_id,
        product_name:Productinfo.product_name,
        product_description:Productinfo.product_description,
        product_images:Productinfo.photo_id,
        product_dollar_price:Productinfo.product_cost_cash,
        product_crypto_prices:Productinfo.product_cost_crypto,
        product_quantity:Productinfo.product_quantity,
        product_promotion:Productinfo.promoted_for,
        product_used:Productinfo.product_used,
      },
    });
    return product;
  }
  async PromoUpdate(product_id, promoted_for) {
    const product = await this.#prisma.products.update({
      where: {
        product_id: product_id,
      },
      data:{
        product_promotion:promoted_for,
      },
    });
    return this.#db.INSERT(query);
  }
  async OfferSearch(Searched_pharse) {
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
  async PromotedOffers() {
    const products = await this.#prisma.products.findMany({
      take: 20,
      where: {
        products_category_id: parseInt(CategoryId),
      },
      order
    });
    return products;
  }

  async offersinCategory(CategoryId) {
    const products = await this.#prisma.products.findMany({
      take: 20,
      where: {
        products_category_id: parseInt(CategoryId),
      },
      order
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
