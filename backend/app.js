const express = require("express");
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use("/api" , product)
app.use("/user" , user);

app.use(errorMiddleware);

module.exports = app;