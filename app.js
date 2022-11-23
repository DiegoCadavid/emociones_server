require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true
})

const Server = require("./Server");

const sv = new Server();
sv.init();