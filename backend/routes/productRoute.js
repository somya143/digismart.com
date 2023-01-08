const express = require("express");
const { getAllProducts, createProduct, findAndUpdate, deleteProduct, getProductById } = require("../controller/productController");

const app = express.Router();

app.route("/products").get(getAllProducts)
app.route("/products").post(createProduct)
app.route("/products/:id").put(findAndUpdate)
app.route("/products/:id").delete(deleteProduct)
app.route("/products/:id").get(getProductById)

module.exports = app;