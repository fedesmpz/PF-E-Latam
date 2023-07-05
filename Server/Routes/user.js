const { Router } = require('express');
const router = Router();

const { registerHandler } = require("../Handlers/post/register")
const { getUserByIdHandler } = require("../Handlers/get/getUserById")
const {deleteUserHandler } = require("../Handlers/delete/deleteUser")
const { updateUserHandler, updateUserImageHandler } = require("../Handlers/put/updateUser")
const { googleLoginHandler, googleExist } = require("../Handlers/post/googleLogin")
const { loginHandler } = require("../Handlers/post/loginHandler")
const { getToken, validateToken } = require("../Handlers/post/tokenHandler")
const { getUserAddressHandler } = require("../Handlers/get/getUserAddress")
const { getAllUsersHandler } = require("../Handlers/get/getAllUsers")



router.get("/address/:countryName/:addressId", getUserAddressHandler)
router.get("/", getAllUsersHandler)
router.get("/:id", getUserByIdHandler)
router.post("/register",registerHandler)

router.post("/googleLogin", googleLoginHandler)
router.post("/googleExist", googleExist)
router.post("/login", loginHandler)
// router.get("/login", loginOutHandler)

router.delete("/delete/:id", deleteUserHandler)
router.put("/update/:id",updateUserHandler)
router.put("/update/image/:id", updateUserImageHandler)
router.post("/getToken", getToken)
router.post("/validateToken", validateToken)

module.exports = router;


