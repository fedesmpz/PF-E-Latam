const { Router } = require('express');
const router = Router();

const { registerHandler } = require("../Handlers/post/register")
const { getUserByIdHandler } = require("../Handlers/get/getUserById")
const {deleteUserHandler } = require("../Handlers/delete/deleteUser")
const {updateUserHandler} = require("../Handlers/put/updateUser")

router.get("/:id", getUserByIdHandler)
router.post("/register",registerHandler)
router.delete("/delete/:id", deleteUserHandler)
router.put("/update/:id",updateUserHandler)



// router.get("/login", loginHandler)
// router.get("/login", loginOutHandler)
module.exports = router;


