const express = require("express");
const router = express.Router();
const Users = require("../scripts/users");
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

router.post("/refresh-token", (req, res) => {
  const { refresh } = req.body;
  const data = jwtUtils.verifyRefreshToken(refresh);
  res.json(data);
  if (!data) {
    return res.sendStatus(403);
  }
  jwt.verify(refresh, jwtUtils.REFRESH_TOKEN, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    const payload = { id: data.id, name: data.name, email: data.email };
    const newAccessToken = jwt.sign(payload, jwtUtils.ACCESS_TOKEN, {
      expiresIn: "10m",
    });
    let obj = { accessToken: newAccessToken };
    res.send(obj);
  });
});

module.exports = router;
