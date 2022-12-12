const app = require("./app");
const connect = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({path : "backend/config/config.env"});

//Uncaught error/Not defined error
process.on("uncaughtException" , (err) => {
    console.log("message",err.message);
    console.log("server shutting down due to uncaught exception error");
    process.exit(1)
})

const PORT = process.env.PORT || 8000;




const server = app.listen(PORT , async() => {
    await connect();
    console.log(`Listening at http://localhost:${PORT}`);
})

//Unhandled promise rejection
process.on("unhandledRejection" , (err) => {
    console.log("error",err.message);
    console.log("shutting down server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1)
    });
})