const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
class PostPayment {
  #db = new DB();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
}


module.exports = PostPayment;