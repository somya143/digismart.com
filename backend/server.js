const app = require("./app");
const connect = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({path : "backend/config/config.env"});

const PORT = process.env.PORT || 8000;




app.listen(PORT , async() => {
    await connect();
    console.log(`Listening at http://localhost:${PORT}`);
})