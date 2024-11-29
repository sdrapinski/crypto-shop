const express = require("express");
const router = express.Router();
const PostPayment = require("../scripts/postPayment.js");
const postPayment = new PostPayment();

router.post("/removefromcart", async (req, res) => {
    cart.deleteFromCart(req.body.cart_id, req.body.product_id).then((resp)=>{
      res.send(resp)
    }).catch(error=>res.send(error))
  });

  
module.exports = router;