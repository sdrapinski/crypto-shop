const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const records = require("./records.json");

async function addRecords() {
  for (const cat of records.products_category) {
    const category = await prisma.products_category.create({
      data: cat,
    });
  }

  for (const crypto of records.crypto) {
    const coin = await prisma.crypto.create({
      data: crypto,
    });
  }

  const newUsers = [];
  for (const [index, user] of records.users.entries()) {
    const newUser = await prisma.users.create({
      data: user,
    });
    const userRegion = await prisma.region.create({
      data: { user_id: newUser.user_id, ...records.region[index] },
    });

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
      },
    });

    if (user_index >= newUsers.length - 1) {
      user_index = 0;
    } else {
      user_index++;
    }
  }
}

addRecords()
  .catch((err) => console.error(err))
  .finally(async () => await prisma.$disconnect());
