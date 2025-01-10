const express = require("express");
const router = express.Router();
const Offers = require("../scripts/offers-db.js");
const Categories = require("../scripts/Categories-db.js");

const Category = new Categories();
const offer = new Offers();

router.route("/createOffer").post((req, res) => {

  try {
  const productinfo = req.body;
  if (
    !productinfo.user_id ||
    !productinfo.products_category_id ||
    !productinfo.product_name ||
    !productinfo.product_description ||
    !productinfo.product_images ||
    !productinfo.product_dollar_price ||
    !productinfo.product_quantity
  ) {
    return res.status(400).send("Invalid data - all fields must be filled");
  }

  if (typeof productinfo.product_dollar_price !== 'number' || productinfo.product_dollar_price <= 0) {
    return res.status(400).send("Product dollar price must be a number greater than 0");
  }

  if (typeof productinfo.product_quantity !== 'number' || productinfo.product_quantity <= 0) {
    return res.status(400).send("Product quantity must be a number greater than 0");
  }

  offer.addOffer(req.body).then((response) => {
    res.send(response);
  });
} catch (error) {
  console.error("Error adding offer:", error);
  res.status(500).send("An error occurred while adding the offer. Please try again later.");
}
  
});

router.route("/deleteOffer/:offerId").delete(async (req, res) => {
  try {
    const response = await offer.removeOffer(req.params.offerId);
    if (response) {
      res.status(200).send("Offer deleted successfully");
    } else {
      res.status(404).send("Offer not found");
    }
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).send("Internal Server Error");
  }
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
router.route("/product/:offerId").put((req, res) => {
  offer.overwrite_Offer(req.params.offerId,req.body).then((response) => {
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
