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
            user_id: user_id,
          },
        },
      },
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

  async addToCart(cart_id, product_id) {
    // Pobierz aktualny koszyk

    const updatedCart = await this.#prisma.cart.update({
      where: {
        cart_id: cart_id,
      },
      data: {
        cartItems: {
          createMany: {
            data: {
              product: {
                connect: {
                  product_id: product_id,
                },
              },
              quantity: 1, // Ustaw ilość na 1 lub odpowiednio, jeśli jest inaczej
            },
          },
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
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
  async getCartFromUserID(user_id) {
    const cart = await this.#prisma.Cart.findMany({
      where: {
        user_id: user_id,
      },
    });
    return cart;
  }

  async getCart(Cart_id) {
    const cart = await this.#prisma.Cart.findMany({
      where: {
        cart_id: Cart_id,
      },
    });
    return cart;
  }
}
module.exports = shopping_cart;
