const jwt = require("jsonwebtoken");
const config1=require("../config")

const config = process.env;

const verifyToken = (req, res, next) => {

  const token =
    req.body.token || req.query.token || req.headers.authorization || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config1.secretkey);
    req.user = decoded;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;