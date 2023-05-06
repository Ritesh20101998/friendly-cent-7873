const mongoose=require("mongoose");
const channelSchema=mongoose.Schema({
    Channel:String,
},{
    versionKey:false
})

const ChannelMod=mongoose.model("channel",channelSchema);

module.exports={ChannelMod}