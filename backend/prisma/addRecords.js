const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const records = require("./records.json");

async function addRecords() {
  records.products_category.map(async (cat) => {
    const category = await prisma.products_category.create({
      data: cat,
    });
  });

  records.crypto.map(async (crypto) => {
    const coin = await prisma.crypto.create({
      data: crypto,
    });
  });
  records.users.map(async (user, index) => {
    const newUser = await prisma.users.create({
      data: user,
    });
    const userRegion = await prisma.region.create({
      data: { user_id: newUser.user_id, ...records.region[index] },
    });

    const userProduct = await prisma.products.create({
      data: {
        user: { connect: { user_id: newUser.user_id } },
        products_category: {
          connect: {
            product_category_id: records.products[index].products_category_id,
          },
        },
        product_watchedBy: { connect: { user_id: newUser.user_id } },
        product_name: records.products[index].product_name,
        product_description: records.products[index].product_description,
        product_images: records.products[index].product_images,
        product_dollar_price: records.products[index].product_dollar_price,
        product_quantity: records.products[index].product_quantity,
        product_popularity: records.products[index].product_popularity,
        product_promotion: records.products[index].product_promotion,
      },
    });
  });
}
addRecords()
  .catch((err) => console.error(err))
  .finally(async () => await prisma.$disconnect());
