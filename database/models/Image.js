const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  url: String, 
  cloudinaryId: String,
  label: String,
  createAt: Date,
})

const Image = model('image', imageSchema);
module.exports = Image