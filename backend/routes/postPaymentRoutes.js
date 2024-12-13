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

module.exports = router;
