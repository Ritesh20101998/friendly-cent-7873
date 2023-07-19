const mongoose=require("mongoose");
const workspaceSchema=mongoose.Schema({
    workspace:{type:String,required:true},
    description:{type:String,required:false}
},{
    versionKey:false
})

const workspaceModel=mongoose.model("workspace",workspaceSchema);

module.exports=workspaceModel