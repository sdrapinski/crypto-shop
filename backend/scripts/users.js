const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
class Users {
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }

  async createUser(user) {
    const newUser = await this.#prisma.users.create({
      data: user,
    });
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
