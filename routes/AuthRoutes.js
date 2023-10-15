const express = require("express")
const router = express.Router()
const AuthController = require("../controller/AuthController")

router.post("/signup", AuthController.PostUsers)
// router.post("/signin", AuthController.PostUsers)

exports.router = router