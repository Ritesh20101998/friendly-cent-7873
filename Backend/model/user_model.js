let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true},
    password:{type:String}
})

let UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}