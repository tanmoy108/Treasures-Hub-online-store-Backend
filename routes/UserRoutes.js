const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()

router
    .get("/info", UserController.fetchUserInfo)
    .patch("/update", UserController.PatchUsers )

exports.router = router