const express = require("express");
const router = express.Router();
const Users = require("../scripts/users");
const jwt = require("jsonwebtoken");
const jwtUtils = require("../services/jwt.js");
const {response} = require("express");
const user = new Users();

router.post("/login", async (req, res) => {
    const userFromDB = await user.getUserByLoginAndPassword(req.body);
    console.log("user logged in "+userFromDB.findedUser.user_login);
    
    if (userFromDB.code === 400) {
        return res.sendStatus(400);
    }

    if (!userFromDB.findedUser || userFromDB.findedUser.length === 0) {
        return res.sendStatus(401);
    }

    const accessToken = jwtUtils.generateAccessToken(userFromDB.findedUser);
    const refreshToken = jwtUtils.generateRefreshToken(userFromDB.findedUser);

    res.json({accessToken, refreshToken});
});

router.post("/ChceckIfUserDoesNotExist", async (req, res) => {
    user.checkIfUserNotExistByEmail(req.body.email).then((val) => {
        res.send(val);
    });
});

router.post("/registerUser", async (req, res) => {
   
    user.createUser(req.body).then((resp) => {
        
        
        if(!resp){
            return res.sendStatus(403);
        }
      return  res.send(resp);
    });
});

router.post("/refreshToken", async (req, res) => {

  const { refresh } = req.body;
  const data = jwtUtils.verifyRefreshToken(refresh);
  
  if (!data) {
    return res.sendStatus(403);
  }

  const user_new_data = await user.getUserByUser_id(data.user_id);
  if (!user_new_data) {
    return res.sendStatus(403);
  }
  


    const accessToken = jwtUtils.generateAccessToken(user_new_data);

    let obj = {accessToken: accessToken};
    res.send(obj);
});

router.route("/getUserAndProducts/:user_id").get((req, res) => {
    user.getUserAndProductsPurchasedByUser_id(req.params.user_id).then((response) => {
        res.send(response);
    });
});

router.route("/getUserData/:user_id").get((req, res) => {
    const userId = req.params.user_id;
    user.getUserByUser_id(userId)
        .then((user) => {
            const {user_name, user_surname, user_email, user_phone_number, user_login, user_date_of_birth} = user;
            res.send(
                {
                    user_name,
                    user_surname,
                    user_email,
                    user_phone_number,
                    user_login,
                    user_date_of_birth
                }
            );
        });
});
// pobranie walleta
router.route("/createWallet").post((req, res) => {
    const userId = req.body.user_id;
    const wallet = req.body.user_wallet_address;

    user.createWallet(userId, wallet).then((response) => {
        res.send(response)
    });
});
router.post("/activateWallet", async (req, res) => {
    const { user_id, wallet_address } = req.body;
  
  
   user.activateUserWallet(user_id,wallet_address).then((response)=>{
    res.status(response.status).send({ message: response.message });
   })
  });

  router.post("/deleteWallet", async (req, res) => {
    const { wallet_id } = req.body;

    if (!wallet_id) {
        return res.status(400).send({ message: "Brak wymaganych danych." });
    }

    try {
       const data =  await user.deleteWallet(wallet_id);
        res.status(data.status).send( data.message );
    } catch (error) {
        res.status(500).send({ message: "Unable to remove wallet" });
    }
});


router.route("/getOrdersHistory/:userId").get((req, res) => {
    user.getOrdersHistory(req.params.userId).then((response) => {
        res.send(response)
    });
});
router.post("/checkWalletAssignment", async (req, res) => {
    const { wallet_address } = req.body;
  
    if (!wallet_address) {
      return res.status(400).send({ message: "Wallet address is required." });
    }
  
    try {
      const existingWallet = await user.checkIfWalletIsAssigned(wallet_address);
      if (existingWallet) {
        return res.status(200).send({ isAssigned: true });
      } else {
        return res.status(200).send({ isAssigned: false });
      }
    } catch (error) {
      console.error("Error checking wallet assignment:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  });

router.route("/getUserMessages/:userId").get((req, res) => {
    user.getUserMessages(req.params.userId).then((response) => {res.send(response)});
});

module.exports = router;
