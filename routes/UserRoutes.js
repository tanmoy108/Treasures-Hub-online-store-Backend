const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()

router
    .get("/", UserController.fetchUserInfo)
    .patch("/:id", UserController.PatchUsers )

exports.router = router