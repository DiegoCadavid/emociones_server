const mongoose = require('mongoose');


const connectDb  = async () => {
  try {
      await mongoose.connect(process.env.DATABASE_URL);
      console.log('Base de datos conectada');
  } catch (error) {
    throw new Error('Error al inicial la base de datos');
  }
}

module.exports = connectDb;