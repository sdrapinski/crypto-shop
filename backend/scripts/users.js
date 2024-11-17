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
  
    const newRegion = await this.#prisma.region.create({
      data:{
        city:user.user_region.city,
        country:user.user_region.country,
        street:user.user_region.street,
        postCode:user.user_region.postCode,
        user_id:newUser.user_id
      }
    })
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
        user_region:true
      },
    });
    console.log(findedUser);
    
   

    
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
        user_region:true
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
        user_region:true,
        user_wallets:true
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
        user_region:true,
        user_wallets:true
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
        user_region:true
      },
    });
    return findedUser;
  }
  async createWallet(userId, walletAddress) {
    const newWallet = await this.#prisma.cryptoWallet.create(
        {
            data: {
              wallet_address: walletAddress,
              user_id:userId,
            }
        }
    );

    return newWallet;
}



async getOrdersHistory(userId) {
    const productsSold = await this.#prisma.productsSold.findMany(
        {
            where: {
                user_id: userId
            }
        }
    );

    if(productsSold.length === 0) {
        return [];
    }

    const orders = [];

    for (let productSold of productsSold) {
       const product = await this.#prisma.products.findUnique({where: {product_id: productSold.product_id}});
       orders.push(product);
    }

    return orders;
}

async getUserMessages(userId) {
    const messages = await this.#prisma.message.findMany({
        where: {
            recipient_id: userId
        }
    });

    if(messages.length === 0) {
        return [];
    }

    const chats = [];

    for (let message of messages) {
        const sender = await this.#prisma.users.findUnique({where: {user_id: message.sender_id}});
        chats.push({
            sender:{
                user_name: sender.user_name,
                user_surname: sender.user_surname,
                user_email: sender.user_email
            },
            message: {
                content: message.content,
                is_read: message.is_read
            }
        });
    }

    return chats;
  }


}

module.exports = Users;
