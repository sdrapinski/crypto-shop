const DB = require("./db.js");
const { PrismaClient } = require("@prisma/client");
class PostPayment {
  #db = new DB();
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }

  async getSuppliers() {
    const supplier = await this.#prisma.Suppliers.findMany({ });
    return supplier;
  }

  async createTransaction({ buyerId, cartItems, deliveryData,deliveryOption ,notificationContent }) {
    try {
      return await this.#prisma.$transaction(async (prisma) => {
        // Grupowanie produktów według sprzedawcy
        const productsBySeller = cartItems.reduce((acc, item) => {
          const sellerId = item.product.user.user_id;
          if (!acc[sellerId]) {
            acc[sellerId] = [];
          }
          acc[sellerId].push(item);
          return acc;
        }, {});
  
        const transactions = [];
  
        // Iteracja przez każdego sprzedawcę i tworzenie `ProductsBought`
        for (const [sellerId, items] of Object.entries(productsBySeller)) {
          // Tworzenie rekordu `ProductsBought`
          const productsBought = await prisma.productsBought.create({
            data: {
              buyer_id: buyerId,
              seller_id: sellerId,
              sale_time: new Date(),
            },
          });
  
          // Tworzenie rekordów `ProductsBoughtItems` dla sprzedawcy
          const productBoughtItems = await Promise.all(
            items.map((item) =>
              prisma.productsBoughtItems.create({
                data: {
                  products_bought_id: productsBought.products_bought_id,
                  product_id: item.product_id,
                  product_quantity: item.quantity,
                },
              })
            )
          );
  
          // Tworzenie rekordu `Delivery`
          const delivery = await prisma.delivery.create({
            data: {
              city: deliveryData.city,
              street: deliveryData.street,
              houseNumber: deliveryData.houseNumber || 2,
              postcode: deliveryData.postcode,
              phoneNumber: deliveryData.phoneNumber,
              email: deliveryData.email,
              status: "Pending",
              productsBought_id: productsBought.products_bought_id,
              supplier_id: deliveryOption.id,
            },
          });
  
          // Tworzenie rekordu `Notifications`
          const notification = await prisma.notifications.create({
            data: {
              productsBought_id: productsBought.products_bought_id,
              content: notificationContent,
            },
          });
          const updatedProductsBought = await prisma.productsBought.update({
            where: {
              products_bought_id: productsBought.products_bought_id,
            },
            data: {
              notification_id: notification.notification_id,
              delivery_id: delivery.id,
            },
          });
  
          transactions.push({
            productsBought: updatedProductsBought,
            productBoughtItems,
            delivery,
            notification,
          });
        }
  
        return transactions; // Zwraca listę transakcji dla każdego sprzedawcy
      });
    } catch (error) {
      console.error("Error creating transactions:", error);
      throw new Error("Transaction failed.");
    }
  }

  async getUserNotifications(userId) {
    try {
      const notifications = await this.#prisma.notifications.findMany({
        where: {
          productsBought: {
            OR: [
              { buyer_id: userId },
              { seller_id: userId },
            ],
          },
        },
        include: {
          productsBought: {
          include:{
            delivery:true,
            products_bought_items:true
          }
          
        },
      }
      });
      return notifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw new Error("Could not fetch notifications.");
    }
  }
  
}


module.exports = PostPayment;