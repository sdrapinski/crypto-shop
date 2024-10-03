const express = require("express");
const router = express.Router();
const Users = require("../scripts/users");
const jwt = require("jsonwebtoken");
const jwtUtils = require("../services/jwt.js");
const user = new Users();

router.post("/login", async (req, res) => {
  const userFromDB = await user.getUserByLoginAndPassword(req.body);
  if(userFromDB.code===400){
    return res.sendStatus(400);
  }

  if (!userFromDB.findedUser || userFromDB.findedUser.length === 0) {
    return res.sendStatus(401);
  }

  const accessToken = jwtUtils.generateAccessToken(userFromDB.findedUser);
  const refreshToken = jwtUtils.generateRefreshToken(userFromDB.findedUser);

  res.json({ accessToken, refreshToken });
});

router.post("/ChceckIfUserDoesNotExist", async (req, res) => {
  user.checkIfUserNotExistByEmail(req.body.email).then((val) => {
    res.send(val);
  });
});

router.post("/registerUser", async (req, res) => {
  console.log(req.body)
  user.createUser(req.body).then((resp) => {
    res.send(resp);
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

  let obj = { accessToken: accessToken };
  res.send(obj);
});

router.route("/getUserAndProducts/:user_id").get((req, res) => {
  user.getUserAndProductsPurchasedByUser_id(req.params.user_id).then((response) => {
    res.send(response);
  });
});

module.exports = router;
