const express = require("express");
const { getSingleWishlistItem } = require("../controller/wishlistController");
const app = express.Router();

app.route("/:id").get(getSingleWishlistItem);