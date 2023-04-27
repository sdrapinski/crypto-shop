const bodyParser = require("body-parser");
const Users = require("./scripts/users.js");
const user = new Users();
const Cors = require("./scripts/cors.js");
const Offers = require("./scripts/offers-db.js");
const offer = new Offers();
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
    const outserch = offer.removeOffer(req.params.offerId);
    res.send(outserch);
  });
  app.route("/searchProduct/:offerName").get((req, res) => {
    offer.OfferSearch(req.params.offerName).then((response) => {
      res.send(response);
    });
  });
};
