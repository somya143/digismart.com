const express = require("express");
const { getSingleWishlistItem, createWishlistItem, removeWishlistItem } = require("../controller/wishlistController");
const app = express.Router();

app.route("/:id").get(getSingleWishlistItem);
app.route("/").post(createWishlistItem);
app.route("/:id").delete(removeWishlistItem);

module.exports = app;