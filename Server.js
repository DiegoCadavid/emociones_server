
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const connectDb = require('./database/connectDB');
const imageRouter = require('./routes/imageRouter');




class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;


    this.connectdb();
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
  }

  routes(){
    this.app.use('/image',imageRouter);
  }

  init(){
    this.app.listen(this.port, () => {
      console.log('Servidor iniciado');
     })
  }
}

module.exports = Server;