const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    channel_name:{type:String, required:true},
    name:{type:String, required:true},
    message:{type:String, required:true}
})

const ChatModel = mongoose.model("chat",chatSchema)

module.exports = {ChatModel}