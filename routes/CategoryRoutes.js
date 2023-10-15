const express = require('express')
const CategoryController = require('../controller/CategoryController')
const router = express.Router()

router
    .post("/", CategoryController.postCategory)
    .get("/", CategoryController.fetchAllCategories)

exports.router = router