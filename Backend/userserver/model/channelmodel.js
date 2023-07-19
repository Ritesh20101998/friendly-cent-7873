const mongoose=require("mongoose");
const channelSchema=mongoose.Schema({
    channel:{type:String,required:true},
},{
    versionKey:false
})

const ChannelModel=mongoose.model("channel",channelSchema);

module.exports=ChannelModel