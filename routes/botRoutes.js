const express = require("express");
const { chatBot } = require("../controllers/botControls");
const { auth } = require("../utils/auth");

const botRoute = express.Router();

botRoute.post("/chat", chatBot);

module.exports ={
    botRoute,
}