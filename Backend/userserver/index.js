const express = require("express")
const cors = require("cors")
const connection = require("./db")

// const auth = require("./middlewares/auth.middleware")
// <<<<<<< HEAD:Backend/index.js
const {channle_router}=require("./route/channel.route")
const { userRouter } = require("./route/user_route")
const cookieParser = require("cookie-parser")

// =======
const {channle_router}=require("../route/channel.route")
const cookieParser = require("cookie-parser")
// >>>>>>> c319acafa50d52c273fabc30ca7aa2dd9137c7ce:Backend/userserver/index.js

require("dotenv").config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({origin:"*"}))
// app.use(cookieParser())
app.use(cors())
// app.use(auth)
app.use("/user",userRouter)
app.use("/channel",channle_router)

app.get("/",(req,res)=>{
    res.send("WELCOME TO CHATIFY\nWE BUILD THE COMMUNITY")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server is successfully connected to database..")
    } 
    catch(err){
        console.log("Server is not connected to Database")
        console.log({error:err.message})
    }
    console.log(`server is running at port ${process.env.port}`)
})