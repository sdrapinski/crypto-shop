const bodyParser = require("body-parser");
const Cors = require("../scripts/cors.js");

const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");
const offerRoutes = require("./offerRoutes");
const paymentRoutes = require("./paymentRoutes"); 

module.exports = function (app) {
  const cors = new Cors(app);
  cors.setCors();

  app.use(bodyParser.json());

  app.use("/user", userRoutes);
  app.use("/cart", cartRoutes);
  app.use("/payment", paymentRoutes);
  app.use("/offer", offerRoutes);
};
