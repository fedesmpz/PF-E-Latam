
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { conn } = require('./db.js');

const server = express();
const port = 8000;

const productRoutes = require("./Routes/product.js")
const userRoutes = require("./Routes/user.js")
const reviewRoutes = require("./Routes/ratingAndReview.js")
const cartRoutes = require("./Routes/cart.js")
const stripeRoutes= require("./Routes/stripe.js")
const salesRoutes= require("./Routes/sales.js")


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/products", productRoutes)
server.use("/users",userRoutes)
server.use("/reviews",reviewRoutes)
server.use("/carts", cartRoutes)
server.use("/checkout", stripeRoutes)
server.use("/sales", salesRoutes)


conn.sync({ force: false }).then(() => { //ADVERTENCIA: NO PONER TRUE GABO POR FAVOR
  console.log('DB conectada')
  server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
});
