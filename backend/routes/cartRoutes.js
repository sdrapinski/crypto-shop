const express = require("express");
const router = express.Router();
const shopping_cart = require("../scripts/shopping-cart.js");
const cart = new shopping_cart();

router.post("/removefromcart", async (req, res) => {
  cart.deleteFromCart(req.body.cart_id, req.body.product_id);
});
router.post("/addtocart", async (req, res) => {
  cart.addtoCart(req.body.cart_id, req.body.product_id).then((response) => {
    res.send(response);
  });
});
router.post("/clearcart", async (req, res) => {
  cart.clearCart(req.body.cart_id);
});
router.route("/showcartitems").get((req, res) => {
  console.log(req.params.cart_id);
  Category.getCart(req.params.cart_id).then((response) => {
    res.send(response);
  });
});

module.exports = router;
