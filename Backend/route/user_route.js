let express=require("express");
const { UserModel } = require("../model/user_model");
let userRouter=express();
let bcrypt=require("bcrypt");

userRouter.post("/user/register",async(req,res)=>{
    let {name,email,mobile,password}=req.body;
    try {
      let user=await UserModel.findOne({email})
      if(user){
        return res.status(400).send({msg:"User is already present"})
      }
      bcrypt.hash(password,4,async function(err,hash){
        let user =new UserModel({name,email,mobile,password:hash});
        await user.save();
        res.status(200).send({msg:"Registration Successfull"})
      })
      
    } catch (error) {
      res.send({msg:error.message});
    }
  })
  
  userRouter.post("/user/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email})
        if(!user){
          return res.status(400).send({msg:"Wrong Credentials"})
        }
    } catch (error) {
      res.send({msg:error.message})
    }
  })
  
  userRouter.post("/user/register",async(req,res)=>{
    try {
      
    } catch (error) {
        res.send({msg:error.message})
    }
  })
  
  module.exports={userRouter};