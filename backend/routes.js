const bodyParser = require("body-parser");
const Users = require("./scripts/users.js");
const user = new Users();
const Cors = require("./scripts/cors.js");
const Offers = require("./scripts/offers-db.js");
const offer = new Offers();
const Categories = require("./scripts/Categories-db.js");
const Category = new Categories();
module.exports = function (app) {
  const cors = new Cors(app);
  cors.setCors();

  app.use(bodyParser.json());

  app.route("/login").post((req, res) => {
    user.addUser("test@test.com", "password", "Test User");
    res.send("User added");
  });

  app.route("/createOffer").post((req, res) => {
    offer.addOffer("");

    res.send("offer added");
  });

  app.route("/deleteOffer/:offerId").delete((req, res) => {
    offer.removeOffer(req.params.offerId).then((response) => {
      res.send(response);
    });
  });

  app.route("/searchProduct/:offerName").get((req, res) => {
    offer.OfferSearch(req.params.offerName).then((response) => {
      res.send(response);
    });
  });
  app.route("/Updateproduct/:offerId").post((req, res) => {
    offer.overwrite_Offer(req.params.offerId).then((response) => {
      res.send(response);
    });
  });
  app.route("/UpdatePromoDate/:offerId").post((req, res) => {
    offer.PromoUpdate(req.params.offerId).then((response) => {
      res.send(response);
    });
  });
  app.route("/promotedProducts").get((req, res) => {
    offer.PromotedOffers().then((response) => {
      res.send(response);
    });
  });

  app.route("/Categories").get((req, res) => {
    Category.AskCats().then((response) => {
      res.send(response);
    });
  });
  app.route("/mainPageProducts").get((req, res) => {
    Category.Categoriesformainpage().then((response) => {
      res.send(response);
    });
  })
};
