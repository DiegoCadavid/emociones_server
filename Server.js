
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const connectDb = require('./database/connectDB');
const imageRouter = require('./routes/imageRouter');
const validatePSW = require('./middlewares/validatePSW');
const letterRouter = require('./routes/letterRoute');
const { connectDiscord } = require('./discord/connectDiscord');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;


    this.connectdb();
    this.connectDsc();
    this.middlewares();
    this.routes();
  }
  
  async connectdb () {
    await connectDb();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(fileUpload());

    // Auth middleware
    this.app.use('*', validatePSW );
  }

  connectDsc = () => {
    connectDiscord();
  }

  routes(){
    this.app.use('/image',imageRouter);
    this.app.use('/letter',letterRouter);
  }

  init(){
    this.app.listen(this.port, () => {
      console.log('Servidor iniciado');
     })
  }
}

module.exports = Server;