const mongoose = require("mongoose");

mongoose.set('strictQuery', false)
const connect = async () => {
    return mongoose.connect(process.env.DB_URI)
}

module.exports = connect;