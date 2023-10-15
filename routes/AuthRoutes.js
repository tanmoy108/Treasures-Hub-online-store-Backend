const express = require("express")
const router = express.Router()
const AuthController = require("../controller/AuthController")

router
    .post("/signup", AuthController.PostUsers)
    .post("/signin", AuthController.CheckUsers)

exports.router = router