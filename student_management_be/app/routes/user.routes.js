const express = require("express");
const user_router = express.Router();
const user_controller = require("../controllers/user.controller.js");
const authJwt = require('../middlewares/authJwt');

user_router.post("/users/signup", user_controller.create);

user_router.get("/api/users", authJwt.verifyToken, user_controller.getUSers);

user_router.post("/api/login", user_controller.loginUser);

module.exports = user_router;
