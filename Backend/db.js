let mongoose=require("mongoose");
require("dotenv").config();

let connection=mongoose.connect(process.env.mongo_URL)