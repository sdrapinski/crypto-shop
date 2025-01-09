const express = require("express");
const router = express.Router();
const PostPayment = require("../scripts/postPayment.js");
const shopping_cart = require("../scripts/shopping-cart.js");
const postPayment = new PostPayment();
const cart = new shopping_cart();

// Endpoint obsługujący tworzenie transakcji

router.route("/getSuppliers").get((req, res) => {
  postPayment.getSuppliers().then((response) => {
    res.send(response);
  });
});

router.post("/createTransaction", async (req, res) => {
  const { buyerId, cartItems, deliveryData, deliveryOption,notificationContent,cart_id } = req.body;

  try {
    // Wywołanie funkcji do tworzenia transakcji
    const result = await postPayment.createTransaction({
      buyerId,
      cartItems,
      deliveryData,
      deliveryOption,
      notificationContent,
    });

     await cart.clearCart(cart_id)

    res.status(200).json({
      message: "Transaction created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in /createTransaction:", error);
    res.status(500).json({ message: "Failed to create transaction", error });
  }
});

router.get('/user-notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await postPayment.getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error.message);
    res.status(500).send({ error: "Could not fetch notifications." });
  }
});


router.get('/getNotificationById/:notificationId', async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await postPayment.getNotificationById(notificationId);
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching user notifications:", error.message);
    res.status(500).send({ error: "Could not fetch notifications." });
  }
});

router.put("/mark-notification-read/:notificationId", async (req, res) => {
  const { notificationId } = req.params;

  try {
    const updatedNotification = await postPayment.markNotificationAsRead(notificationId);
    res.status(200).json({
      message: "Notification marked as read successfully",
      data: updatedNotification,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error.message);
    res.status(500).json({ error: "Could not mark notification as read." });
  }
});

router.put("/confirm-shipment/:deliveryId", async (req, res) => {
  const { deliveryId } = req.params;

  try {
    const updatedDelivery = await postPayment.updateDeliveryStatusToShipped(deliveryId);
    res.status(200).json({
      message: "Delivery status updated to 'Shipped' successfully",
      data: updatedDelivery,
    });
  } catch (error) {
    console.error("Error updating delivery status:", error.message);
    res.status(500).json({ error: "Could not update delivery status." });
  }
});

module.exports = router;
