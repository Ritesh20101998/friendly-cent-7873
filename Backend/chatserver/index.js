const express= require("express")
const app=express()
app.use(express.json())
const {connection}=require("./config/db")
require("dotenv").config()

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running");
})