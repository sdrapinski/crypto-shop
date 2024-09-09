const express = require("express");
const router = express.Router();
const Offers = require("../scripts/offers-db.js");
const Categories = require("../scripts/Categories-db.js");

const Category = new Categories();
const offer = new Offers();

router.route("/createOffer").post((req, res) => {
  offer.addOffer(req.body);

  res.send("offer added");
});

router.route("/deleteOffer/:offerId").delete((req, res) => {
  const outserch = offer.removeOffer(req.params.offerId);
  res.send(outserch);
});

router.route("/searchProduct/:offerName").get((req, res) => {
  offer.OfferSearch(req.params.offerName).then((response) => {
    res.send(response);
  });
});
router.route("/searchProductWL/:offerName").get((req, res) => {
  offer.OfferSearchWithLimit(req.params.offerName, 5).then((response) => {
    res.send(response);
  });
});
router.route("/Updateproduct/:offerId").post((req, res) => {
  offer.overwrite_Offer(req.params.offerId).then((response) => {
    res.send(response);
  });
});
router.route("/UpdatePromoDate/:offerId").post((req, res) => {
  offer.PromoUpdate(req.params.offerId).then((response) => {
    res.send(response);
  });
});
router.route("/promotedProducts").get((req, res) => {
  offer.PromotedOffers().then((response) => {
    res.send(response);
  });
});
router.route("/offersincategory/:Categoryid").get((req, res) => {
  offer.offersinCategory(req.params.Categoryid).then((response) => {
    res.send(response);
  });
});
router.route("/Categories").get((req, res) => {
  Category.getCategories().then((response) => {
    res.send(response);
  });
});
router.route("/mainPageProducts").get((req, res) => {
  offer.mainpageproducts().then((response) => {
    res.send(response);
  });
});
router.route("/product/:productId").get((req, res) => {
  console.log(req.params.productId);
  offer.getProductByID(req.params.productId).then((response) => {
    res.send(response);
  });
});

router.route("/getUserProducts/:userId").get((req, res) => {
  offer.getUserProducts(req.params.userId).then((response) => {
    res.send(response);
  });
});
router.route("/getFilteredProducts").post((req, res) => {
  offer.getFilteredProducts(req.body).then((response) => {
    res.send(response);
  });
});


module.exports = router;
