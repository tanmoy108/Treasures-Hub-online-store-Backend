const express = require('express')
const BrandController = require('../controller/BrandController')
const router = express.Router()

router
    .post("/", BrandController.postBrand)
    .get("/", BrandController.fetchAllBrands)

exports.router = router