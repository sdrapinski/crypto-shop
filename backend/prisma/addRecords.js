const { PrismaClient } = require("@prisma/client");
const shopping_cart = require("../scripts/shopping-cart.js");
const bcrypt = require("bcryptjs");
const cart = new shopping_cart();
const prisma = new PrismaClient();
const records = require("./records.json");

async function addRecords() {
  for (const cat of records.products_category) {
    const category = await prisma.products_category.create({
      data: cat,
    });
  }
  for (const supplier of records.suppliers) {
    const newSupplier = await prisma.suppliers.create({
      data: supplier,
    })
  }

  const salt = await bcrypt.genSalt(10);
  



  const newUsers = [];
  for (const [index, user] of records.users.entries()) {
    const hashedPassword = await bcrypt.hash(user.user_password, salt);
    const newUser = await prisma.users.create({
      data:{
        ...user, 
      user_password: hashedPassword,
      }
      
    });
    const userRegion = await prisma.region.create({
      data: { user_id: newUser.user_id, ...records.region[index] },
    });
    const userCart = await cart.createCart(newUser.user_id);

    newUsers.push(newUser);
  }

  let user_index = 0;

  for (let index = 0; index < records.products.length; index++) {
    const userProduct = await prisma.products.create({
      data: {
        user: { connect: { user_id: newUsers[user_index].user_id } },
        products_category: {
          connect: {
            product_category_id: records.products[index].products_category_id,
          },
        },
        product_watchedBy: {
          connect: { user_id: newUsers[user_index].user_id },
        },
        product_name: records.products[index].product_name,
        product_description: records.products[index].product_description,
        product_images: records.products[index].product_images,
        product_dollar_price: records.products[index].product_dollar_price,
        product_quantity: records.products[index].product_quantity,
        product_popularity: records.products[index].product_popularity,
        product_promotion: records.products[index].product_promotion,
        product_used: records.products[index].product_used,
        product_crypto:records.products[index].product_crypto,
      },
    });

    if (user_index >= newUsers.length - 1) {
      user_index = 0;
    } else {
      user_index++;
    }
  }

  for (const wallet of records.wallets) {
    const newWallet = await prisma.cryptoWallet.create({
      data: {
        ...wallet
      },
    })
  }


}

addRecords()
  .catch((err) => console.error(err))
  .finally(async () => await prisma.$disconnect());
