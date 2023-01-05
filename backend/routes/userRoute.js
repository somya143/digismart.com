const express = require("express");
const { createUser, authenticate } = require("../controller/userController");
const app = express.Router();

app.route("/signup").post(createUser);
app.route("/login").post(authenticate);

module.exports = app;