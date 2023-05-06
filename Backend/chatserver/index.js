const express= require("express")
const app=express()
const socketio = require("socket.io")
const http = require("http")
const {ChatModel}=require("./model/chat.model")
const cors = require('cors')
const moment = require("moment")
const formateMessage=require("./middleware/message")
app.use(cors({origin:"*"}))
const server = http.createServer(app)



app.use(express.json())
const {connection}=require("./config/db")
require("dotenv").config()

app.get("/", (req, res) => {
    res.send("WELCOME");
})

app.get("/channel", async (req, res) => {
    let query = req.query;
    try {
        let data = await ChatModel.find(query)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("Somethig went wrong")
    }
})

const botename = "We Connect"

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running");
})