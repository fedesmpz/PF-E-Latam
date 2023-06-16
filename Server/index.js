
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { conn } = require('./db.js');

const server = express();
const port = 8000;

const productRoutes = require("./Server/Routes/product.js")
const userRoutes = require("./Server/Routes/user.js")
const reviewRoutes = require("./Server/Routes/ratingAndReview.js")
const cartRoutes = require("./Server/Routes/cart.js")


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/products", productRoutes)
server.use("/users",userRoutes)
server.use("/reviews",reviewRoutes)
server.use("/carts", cartRoutes)


conn.sync({ force: false }).then(() => { //ADVERTENCIA: NO PONER TRUE GABO POR FAVOR
  console.log('DB conectada')
  server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
});
