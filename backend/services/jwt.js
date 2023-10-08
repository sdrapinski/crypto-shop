const jwt = require("jsonwebtoken");

// dac do .env potem
const ACCESS_TOKEN = "dhsgfgsdhfvsgdfvhsdvfhsdfvts16267612vsgdfgnmsdfgsvdf123";
const REFRESH_TOKEN = "ksodfkosdfksifsdnjfnsjdfnjsdnjsfkjdsfnskdnfksdkn";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, ACCESS_TOKEN, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = data;
    next();
  });
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "3m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "30d" });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN);
};

module.exports = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authMiddleware,
};
