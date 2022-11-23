const express = require("express");
const { sendMessage } = require("../discord/connectDiscord");
const authRouter = express.Router();

authRouter.post("/", (req, res) => {
  const { psw } = req.headers;
  sendMessage('Se ingreso a emociones client');
  res.status(200).json({ status: true, psw: psw });
});

module.exports = authRouter;
