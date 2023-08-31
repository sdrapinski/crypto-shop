const bodyParser = require("body-parser");
const Users = require("./scripts/users.js");

const Cors = require("./scripts/cors.js");
const Offers = require("./scripts/offers-db.js");
const shopping_cart = require("./scripts/shopping-cart.js")
const jwtUtils = require("./services/jwt.js");
const Categories = require("./scripts/Categories-db.js");
const Category = new Categories();
const user = new Users();
const cart = new shopping_cart();
const offer = new Offers();
module.exports = function (app) {
  const cors = new Cors(app);
  cors.setCors();

  app.use(bodyParser.json());
  
  app.post("/login", async (req, res) => {
    const userFromDB = await user.getUserByLoginAndPassword(req.body);

    if (!userFromDB || userFromDB.length === 0) {
      return res.sendStatus(401);
    }

    const accessToken = jwtUtils.generateAccessToken(userFromDB);
    const refreshToken = jwtUtils.generateRefreshToken(userFromDB);

    res.json({ accessToken, refreshToken });
  });
  app.post("/removefromcart", async (req, res) => {
    cart.deleteFromCart(req.body.cart_id,req.body.product_id)
  });
  app.post("/addtocart", async (req, res) => {
    cart.addtoCart(req.body.cart_id,req.body.product_id).then((response)=> {
      res.send(response);
    });
  });
  app.post("/clearcart", async (req, res) => {
    cart.clearCart(req.body.cart_id)
  });
  app.route("/showcartitems").get((req, res) => {
    console.log(req.params.cart_id);
    Category.getCart(req.params.cart_id).then((response) => {
      res.send(response);
    });
  });
  app.post("/ChceckIfUserDoesNotExist", async (req, res) => {
    user.checkIfUserNotExistByEmail(req.body.email).then((val) => {
      res.send(val);
    });
  });

  app.post("/registerUser", async (req, res) => {
    console.log(req.body);
    user.createUser(req.body).then((resp) => {
      res.send(resp);
    });
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
  app.route("/searchProductWL/:offerName").get((req, res) => {
    offer.OfferSearchWithLimit(req.params.offerName, 5).then((response) => {
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
  app.route("/offersincategory/:Categoryid").get((req, res) => {
    offer.offersinCategory(req.params.Categoryid).then((response) => {
      res.send(response);
    });
  });
  app.route("/Categories").get((req, res) => {
    Category.getCategories().then((response) => {
      res.send(response);
    });
  });
  app.route("/mainPageProducts").get((req, res) => {
    offer.mainpageproducts().then((response) => {
      res.send(response);
    });
  });
  app.route("/product/:productId").get((req, res) => {
    console.log(req.params.productId);
    offer.getProductByID(req.params.productId).then((response) => {
      res.send(response);
    });
  });

  app.route("/getUserProducts/:userId").get((req, res) => {
    offer.getUserProducts(req.params.userId).then((response) => {
      res.send(response);
    });
  });
};
