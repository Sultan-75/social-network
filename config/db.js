const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

// traditional 
// mongoose.connect(db);

const connectDb = async () =>{
    try {
        await mongoose.connect(db);
        console.log("Database connected");
    } catch (error) {
        console.error(error.message);

        process.exit(1);
    }
}

module.exports = connectDb;