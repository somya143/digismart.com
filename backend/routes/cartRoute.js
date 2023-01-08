const express = require("express");
const { getAllCartProducts } = require("../controller/cartController");

const app = express.Router();

app.route("/carts").get(getAllCartProducts);