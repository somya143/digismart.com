const express = require("express");
const { getAllCartProducts, createCartProducts, getSingleCartItem, updateCartItem, removeItemFromCart } = require("../controller/cartController");

const app = express.Router();

app.route("/").get(getAllCartProducts);
app.route("/:id").get(getSingleCartItem);
app.route("/").post(createCartProducts);
app.route("/:id").patch(updateCartItem);
app.route("/:id").delete(removeItemFromCart);

module.exports = app;