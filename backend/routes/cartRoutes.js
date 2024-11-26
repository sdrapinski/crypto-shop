const express = require("express");
const router = express.Router();
const shopping_cart = require("../scripts/shopping-cart.js");
const cart = new shopping_cart();

router.post("/removefromcart", async (req, res) => {
  cart.deleteFromCart(req.body.cart_id, req.body.product_id).then((resp)=>{
    res.send(resp)
  }).catch(error=>res.send(error))
});
router.post("/addtocart", async (req, res) => {
  await cart.addToCart(req.body.cart_id, req.body.product_id)
  cart.getCart(req.body.cart_id).then((resp)=>{
    res.send(resp)
  }).catch(error=>res.send(error))

});
router.post("/clearcart", async (req, res) => {
  cart.clearCart(req.body.cart_id).then((response) => {
    res.send(response);
  });
});

router.get("/getCartFromUserId/:user_id", async (req, res) => {
  cart.getCartFromUserID(req.params.user_id).then((response) => {
    res.send(response);
  });
});

router.route("/showcartitems").get((req, res) => {
  cart.getCart(req.params.cart_id).then((response) => {
    res.send(response);
  });
});

module.exports = router;
