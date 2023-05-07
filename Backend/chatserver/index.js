const express= require("express")
const socketio = require("socket.io")
const http = require("http")
//const {connection} = require("./config/db")
const { ChatModel } = require("./model/chat.model")
const cors = require('cors')
const moment = require("moment")

const websocket = require("websockets")
const formateMessage=require("./middleware/message")

const app=express()
app.use(express.json())
app.use(cors({origin:"*"}))
const {connection}=require("./config/db")

const server = http.createServer(app)
require("dotenv").config()


const formateMessage = require("./middleware/message")
const { time } = require("console")


app.use(cors({origin:"*"}))

const io = socketio(server)

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

const botename = "Chatify"


io.on("connection", (socket) => {

    socket.on("user_channel", ({ username, channel }) => {

        socket.join(channel)
        socket.emit("welcome", formateMessage(botename, "Welcome to Chatify"))

        //Broadcast to other channel
        socket.broadcast.to(channel).emit("message_all", formateMessage(botename, `${username} has join the chat`))

        socket.on("chatMessage", async (text) => {
            io.to(channel).emit("message_all", formateMessage(username, text))

        })

        socket.on("disconnect", () => {

            io.to(channel).emit("message_all", formateMessage(botename, `${username} has left the chat`))

        })
    })
})

io.on("connection", (socket) => {

    socket.on("user_channel", ({ username, channel }) => {

        socket.join(channel)
        socket.emit("welcome", formateMessage(botename, "Welcome to we connect"))

        //Broadcast to other channel
        socket.broadcast.to(channel).emit("message_all", formateMessage(botename, `${username} has join the chat`))

        socket.on("chatMessage", async (text) => {
            io.to(channel).emit("message_all", formateMessage(username, text))

        })

        socket.on("disconnect", () => {

            io.to(channel).emit("message_all", formateMessage(botename, `${username} has left the chat`))

        })
    })
})

const PORT = 8081;
server.listen(PORT, async () => {

    console.log(`server running on port ${PORT}`);
})
