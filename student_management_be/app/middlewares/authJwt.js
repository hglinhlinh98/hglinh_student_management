const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
//const User = require("../models/user.model");

exports.verifyToken = (req, res, next) => {
  console.log("req.headers: ", req.headers);
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    //console.log(`decoded:`, decoded);
    if (!decoded || decoded.exp < new Date().getTime() / 1000) {
      //console.log(`expired`);
      return res.status(402).send({ message: "Token expired!" });
    }
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
};
