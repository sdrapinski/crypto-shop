const bodyParser = require('body-parser');
const user = require("./scripts/users.js");
const cors = require("./scripts/cors.js");

module.exports = function(app){
  cors.cors(app);
  
      app.use(bodyParser.json());

      app.route("/")
      .get((req, res) =>{
        user.getUsers((data)=>{
            res.send(data);
        })
      });

      app.route("/login")
      .post((req, res) =>{
        user.addUser("test@test.com", "password", "Test User");
        res.send("User added");
      });

}