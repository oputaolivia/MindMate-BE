const express = require("express");
const { chatBot, getChats } = require("../controllers/botControls");
const { auth } = require("../utils/auth");

const botRoute = express.Router();

botRoute.post("/chat", chatBot);
botRoute.get("/getchats", getChats);

module.exports ={
    botRoute,
}