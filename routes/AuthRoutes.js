const express = require("express")
const router = express.Router()
const AuthController = require("../controller/AuthController")
const passport = require("passport")

router
    .post("/signup", AuthController.PostUsers)
    .post("/signin",passport.authenticate("local"), AuthController.LoginUsers)
    .get("/check", passport.authenticate("jwt"),AuthController.Check)

exports.router = router