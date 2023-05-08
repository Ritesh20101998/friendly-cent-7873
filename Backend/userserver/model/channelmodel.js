const mongoose=require("mongoose");
const channelSchema=mongoose.Schema({
    Channel:{type:String,required:true},
},{
    versionKey:false
})

const ChannelMod=mongoose.model("channel",channelSchema);

module.exports={ChannelMod}