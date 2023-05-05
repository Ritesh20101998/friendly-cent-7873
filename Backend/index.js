const express = require("express")
const cors = require("cors")
const connection = require("./db")
// const {userRouter} = require("./routes/user.route")
// const auth = require("./middlewares/auth.middleware")
const {channle_router}=require("./channel.route")
// const cookieParser = require("cookie-parser")

require("dotenv").config()

const app = express()
app.use(express.json())
// app.use(cookieParser())

// app.use(auth)
// app.use("/user",userRouter)
app.use("/channel",channle_router)

app.get("/",(req,res)=>{
    res.send("WELCOME TO CHATIFY\nWE BUILD THE COMMUNITY")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`server is running at port ${process.env.port}`)
        console.log("server is successfully connected to database..")
    } 
    catch(err){
        console.log("Server is not connected to Database")
        console.log({error:err.message})
    }
})