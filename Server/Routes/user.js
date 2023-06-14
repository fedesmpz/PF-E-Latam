const { Router } = require('express');
const router = Router();

const { registerHandler } = require("../Handlers/post/register")
const { getUserByIdHandler } = require("../Handlers/get/getUserById")
const {deleteUserHandler } = require("../Handlers/delete/deleteUser")

router.get("/:id", getUserByIdHandler)
router.post("/register",registerHandler)
// router.get("/login", loginHandler)
// router.get("/login", loginOutHandler)
router.delete("/delete/:id", deleteUserHandler)



module.exports = router;


