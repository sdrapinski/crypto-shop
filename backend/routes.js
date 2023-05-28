const bodyParser = require("body-parser");
const Users = require("./scripts/users.js");

const Cors = require("./scripts/cors.js");
const Offers = require("./scripts/offers-db.js");

const jwtUtils = require("./services/jwt.js");
const Categories = require("./scripts/Categories-db.js");
const Category = new Categories();
const user = new Users();
const offer = new Offers();
module.exports = function (app) {
  const cors = new Cors(app);
  cors.setCors();

  app.use(bodyParser.json());

  app.post("/login", async (req, res) => {
    const userFromDB = await user.findUser(req.body);
    if (!userFromDB || userFromDB.length === 0) {
      return res.sendStatus(401);
    }
    const userObject = userFromDB[0];

    const accessToken = jwtUtils.generateAccessToken(userObject);
    const refreshToken = jwtUtils.generateRefreshToken(userObject);

    res.json({ accessToken, refreshToken });
  });

  app.post("/refresh-token", (req, res) => {
    const { token } = req.body;
    const data = jwtUtils.verifyRefreshToken(token);
    res.json(data);
    // if (!data) {
    //   return res.sendStatus(403);
    // }
    // jwt.verify(token, REFRESH_TOKEN, (err, data) => {
    //   if (err) {
    //     return res.sendStatus(403);
    //   }
    //   const payload = { id: data.id, name: data.name, email: data.email };
    //   const newAccessToken = jwt.sign(payload, ACCESS_TOKEN, {
    //     expiresIn: "3m",
    //   });
    //   res.json({ accessToken: newAccessToken });
    // });
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
    Category.getCategories().then((response) => {
      res.send(response);
    });
  });
  app.route("/mainPageProducts").get((req, res) => {
    Category.categoriesForMainPage().then((response) => {
      res.send(response);
    });
  });
};
