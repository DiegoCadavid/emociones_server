const { Schema, model } =  require('mongoose');

const letterSchema = new Schema({
  title: String, 
  createAt: Date,
  content: String
});

const Letter = model('Letter', letterSchema );
module.exports = Letter;