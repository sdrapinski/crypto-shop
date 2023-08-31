const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
const shopping_cart = require("./shopping-cart.js");
class Users {
  cart = new shopping_cart();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
    
  }

  async createUser(user) {
    const newUser = await this.#prisma.users.create({
      data: user,
    });
    this.cart.createCart(newUser.user_id)
    return newUser;
  }

  async getUserByLoginAndPassword(user) {
    const findedUser = await this.#prisma.users.findFirst({
      where: {
        user_email: user.email,
        user_password: user.password,
      },
    });
    return findedUser;
  }

  async checkIfUserNotExistByEmail(email) {
    const user = await this.getUserByEmail(email);
    return !user;
  }

  async getUserByEmail(email) {
    const findedUser = await this.#prisma.users.findFirst({
      where: {
        user_email: email,
      },
    });
    return findedUser;
  }

  async getUserById(user) {
    const findedUser = await this.#prisma.users.findUnique({
      where: {
        user_id: user.id,
      },
    });
    return findedUser;
  }
}

module.exports = Users;
