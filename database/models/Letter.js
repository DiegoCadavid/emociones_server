const { Schema, model } =  require('mongoose');

const letterSchema = new Schema({
  tile: String, 
  createAt: Date,
  content: String
});

const Letter = model('Letter', letterSchema );
module.exports = Letter;