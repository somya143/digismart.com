const express = require("express");
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cart = require("./routes/cartRoute");
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use("/api" , product)
app.use("/users" , user);
app.use("/carts", cart);

app.use(errorMiddleware);

module.exports = app;