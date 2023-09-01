const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
class shopping_cart {
  #db = new DB();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async createCart(user_id) {
    const newCart = await this.#prisma.Cart.create({
      data: {
        user: {
          connect: {
            user_id: user_id
          }
        }
      }
    });
    return newCart;
  }
  
  async clearCart(cart_id) {
    const clearedCart = await this.#prisma.cart.update({
      where: {
        cart_id: cart_id,
      },
      data: {
        products: {
          disconnect: true,
        },
      },
    });
  
    return clearedCart;
  }
  
  async addtoCart(cart_id, product_ids) {
    const updatedCart = await this.#prisma.cart.update({
      where: {
        cart_id: cart_id,
      },
      data: {
        products: {
          connect: product_ids.map(product_id => ({ product_id: product_id })),
        },
      },
    });
  
    return updatedCart;
  }
  
  
  
  async deleteFromCart(cart_id, product_id) {
    const updatedCart = await this.#prisma.Cart.update({
      where: {
        cart_id: cart_id,
      },
      data: {
        products: {
          disconnect: {
            product_id: product_id,
          },
        },
      },
    });
  
    return updatedCart;
  }  
  async getCart(Cart_id) {
    const cart= await this.#prisma.Cart.findMany({
      where:{
        cart_id: Cart_id
      }
    });
    return cart;
  }
  }
module.exports = shopping_cart;
