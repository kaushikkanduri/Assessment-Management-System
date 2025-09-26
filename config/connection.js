
const mongoose = require("mongoose");

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected.\nDatabase Name: ${mongoose.connection.name}`);
    }catch(err){
        console.log("Database connection failed");
        process.exit(1);
    }
}

module.exports = dbConnect