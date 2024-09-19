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
        user:{ connect: { user_id: Productinfo.user_id } },
        products_category: {
          connect: {
            product_category_id: Productinfo.products_category_id,
          },
        },
        product_watchedBy: {
          connect: { user_id: Productinfo.user_id },
        },
        product_name:Productinfo.product_name,
        product_description:Productinfo.product_description,
        product_images:Productinfo.product_images,
        product_dollar_price:Productinfo.product_dollar_price,
       // product_crypto_prices:Productinfo.product_cost_crypto,
        product_quantity:Productinfo.product_quantity,
        product_popularity:Productinfo.product_popularity,
        product_promotion:Productinfo.product_promotion,
        product_used:Productinfo.product_used,
        product_crypto:Productinfo.crypto,
      },
    });
    return products;
  }
  async removeOffer(product_id) {
    try {
      // Usuwanie związanych rekordów z innych tabel
      await this.#prisma.cartToItem.deleteMany({
        where: {
          product_id: product_id,
        },
      });

      await this.#prisma.productsSold.deleteMany({
        where: {
          product_id: product_id,
        },
      });

      await this.#prisma.message.deleteMany({
        where: {
          product_id: product_id,
        },
      });

      await this.#prisma.notification.deleteMany({
        where: {
          product_id: product_id,
        },
      });

      // Usuwanie samego produktu
      const deletedProduct = await this.#prisma.products.delete({
        where: {
          product_id: product_id,
        },
      });

      return deletedProduct;
    } catch (error) {
      // Obsługa błędów
      console.error("Error removing offer:", error);
    }
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
        product_crypto:Productinfo.crypto,
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
    return product;
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
  async getFilteredProducts(Productinfo) {
    const where = {};
  
    if (Productinfo.price_min && !isNaN(parseFloat(Productinfo.price_min))) {
      where.product_dollar_price = {
        ...where.product_dollar_price,
        gte: parseFloat(Productinfo.price_min),
      };
    }
    if (Productinfo.price_max  && !isNaN(parseFloat(Productinfo.price_max))) {
      where.product_dollar_price = {
        ...where.product_dollar_price,
        lte: parseFloat(Productinfo.price_max),
      };
    }
  
    if (Productinfo.crypto ==true) {
      where.product_crypto = true;
    }
  
    if (Productinfo.rating  && !isNaN(parseFloat(Productinfo.rating))) {
      where.product_popularity = {
        gte: parseFloat(Productinfo.rating),
      };
    }
  
    if (Productinfo.days_limit>0) {
      const currentDate = new Date();
      const targetDate = new Date();
      targetDate.setDate(currentDate.getDate() - Productinfo.days_limit);
      where.product_added_time = {
        gte: targetDate,
        lte: currentDate,
      };
    }
  
    if (Productinfo.category  && !isNaN(Number(Productinfo.category))) {
      where.products_category_id = Number(Productinfo.category);
    }
    console.log(where);
    const products = await this.#prisma.products.findMany({
      where,
    });
  
    return products;
  }
  


 
}
module.exports = Offers;
