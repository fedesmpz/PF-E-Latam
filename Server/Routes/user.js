const { Router } = require('express');
const router = Router();

const { registerHandler } = require("../Handlers/post/register")
const { getUserByIdHandler } = require("../Handlers/get/getUserById")

router.get("/:id", getUserByIdHandler)
router.post("/register",registerHandler)
// router.get("/login", loginHandler)
// router.get("/login", loginOutHandler)

module.exports = router;


