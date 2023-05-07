const express= require("express")
const app=express()
const socketio = require("socket.io")
const http = require("http")
//const {connection} = require("./config/db")
const { ChatModel } = require("./model/chat.model")
const cors = require('cors')
const moment = require("moment")
const formateMessage=require("./middleware/message")
app.use(cors({origin:"*"}))
const server = http.createServer(app)



app.use(express.json())
const {connection}=require("./config/db")
require("dotenv").config()

app.get("/", (req, res) => {
    res.send("WELCOME TO CHATIFY\nWE BUILD THE COMMUNITY");
})

app.get("/chat", async (req, res) => {
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

    console.log(`server running on port ${PORT}`);
})
