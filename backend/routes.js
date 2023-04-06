const bodyParser = require('body-parser');
const Users = require("./scripts/users.js");
const user = new Users();
const Cors = require("./scripts/cors.js");
const Offers = require("./scripts/offers.js");
const offer = new Offers();
module.exports = function(app){
  const cors = new Cors(app);
  cors.setCors();
  
      app.use(bodyParser.json());

      app.route("/")
      .get((req, res) =>{
        user.getUsers((data)=>{
          if(data === []){
            res.sendStatus(400);
            res.send(data);
          }
          else{
            res.sendStatus(200);
            res.send(data);
          }
        })
      });

      app.route("/login")
      .post((req, res) =>{
        user.addUser("test@test.com", "password", "Test User");
        res.send("User added");
      });
      app.route("/searched")
      .get((req, res) =>{
        const outserch=offer.OfferSearch("Chomiki");
        res.send(outserch);
      });

}