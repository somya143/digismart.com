const express = require("express");
const { getAllProducts, createProduct } = require("../controller/productController");

const app = express.Router();

app.route("/products").get(getAllProducts)
app.route("/products").post(createProduct)

module.exports = app;