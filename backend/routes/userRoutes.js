const express = require("express");
const router = express.Router();
const Users = require("../scripts/users");
const jwt = require("jsonwebtoken");
const jwtUtils = require("../services/jwt.js");
const user = new Users();

router.post("/login", async (req, res) => {
  const userFromDB = await user.getUserByLoginAndPassword(req.body);

  if (!userFromDB || userFromDB.length === 0) {
    return res.sendStatus(401);
  }

  const accessToken = jwtUtils.generateAccessToken(userFromDB);
  const refreshToken = jwtUtils.generateRefreshToken(userFromDB);

  res.json({ accessToken, refreshToken });
});

router.post("/ChceckIfUserDoesNotExist", async (req, res) => {
  user.checkIfUserNotExistByEmail(req.body.email).then((val) => {
    res.send(val);
  });
});

router.post("/registerUser", async (req, res) => {
  console.log(req.body);
  user.createUser(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/refreshToken", async (req, res) => {
  const { refresh } = req.body;
  const data = jwtUtils.verifyRefreshToken(refresh);
  console.log(data);
  if (!data) {
    return res.sendStatus(403);
  }

  const user_new_data = await user.getUserByUser_id(data.user_id);

  const accessToken = jwtUtils.generateAccessToken(user_new_data);

  let obj = { accessToken: accessToken };
  res.send(obj);
});

module.exports = router;
