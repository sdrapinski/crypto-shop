const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
const shopping_cart = require("./shopping-cart.js");
const bcrypt = require("bcryptjs");
class Users {
  cart = new shopping_cart();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }

  async createUser(user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.user_password, salt);

    const newUser = await this.#prisma.users.create({
      data: {
          user_name: user.user_name,
          user_surname: user.user_surname,
          user_email: user.user_email,
          user_date_of_birth: user.user_date_of_birth,
          user_phone_number: user.user_phone_number,
          user_login: user.user_login,
          user_password: hashedPassword,
      }
    });
    this.cart.createCart(newUser.user_id);
    return newUser;
  }

  async getUserByLoginAndPassword(user) {
    const findedUser = await this.#prisma.users.findFirst({
      where: {
        user_email: user.email,
      },
      include: {
        user_cart: true,
      },
    });

    
    if (!(await bcrypt.compare(user.password, findedUser.user_password))) {
      
      return { findedUser:[],code:400 };
    }
   
    return {findedUser:findedUser,code:200};
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
      include: {
        user_cart: true,
      },
    });
    return findedUser;
  }

  async getUserById(user) {
    const findedUser = await this.#prisma.users.findUnique({
      where: {
        user_id: user.id,
      },
      include: {
        user_cart: true,
      },
    });
    return findedUser;
  }
  async getUserByUser_id(user_id) {
    const findedUser = await this.#prisma.users.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        user_cart: true,
      },
    });
    return findedUser;
  }
  async getUserAndProductsPurchasedByUser_id(user_id) {
    const findedUser = await this.#prisma.users.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        user_products_purchased: true,
      },
    });
    return findedUser;
  }
}

module.exports = Users;
