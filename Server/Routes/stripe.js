const { Router } = require('express');
const router = Router();

const {stripeHandler} = require("../Handlers/post/stripePostHandler")

router.post("/", stripeHandler)


module.exports=router