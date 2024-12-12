const express = require("express");
const router = express.Router();
const PostPayment = require("../scripts/postPayment.js");
const postPayment = new PostPayment();
router.route("/notify").post((req, res) => {

    postPayment.notify(req.body).then((response) => {
      res.send(response);
    });
});
  
module.exports = router;