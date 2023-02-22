const express = require("express");
const { getUser, getUsers } = require("../controllers/userControls");
const { auth, register, login, tokenIsValid } = require("../utils/auth");

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/getUser/:id", auth, getUser);
userRoute.get("/getUsers", getUsers);

module.exports = {
    userRoute,
  };
