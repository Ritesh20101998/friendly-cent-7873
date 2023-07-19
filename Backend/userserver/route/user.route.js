let express=require("express");
const UserModel = require("../model/usermodel");
let userRouter=express.Router();
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken")
// let Redis=require("ioredis")
// let ioredis=new Redis();


userRouter.get("/",(req,res)=>{
    res.send("Working");
})

userRouter.post("/register",async(req,res)=>{
    let {name,email,mobile,password}=req.body;
    try {      if (!name || !email || !password || !mobile) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }
      // let user=await UserModel.findOne({email})
      // if(user){
      //   return res.status(400).send({msg:"User is already present"})
      // }
        bcrypt.hash(password,4,async function(err,hash){
          let User = new UserModel({name,email,mobile,password:hash});
          await User.save();
          res.status(200).send({msg:"Registration Successfully Done..."})
      })
      
    } catch (error) {
      res.send({msg:error.message});
    }
})

  
let tokenN;
  
userRouter.post("/login",async(req,res)=>{
    // console.log("Working");
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email})
        if(!user){
          return res.status(400).send({msg:"Wrong Credentials"})
        }
        bcrypt.compare(password, user.password,function(err,result) {
            if(result){
                
                let token=jwt.sign({userName:user.name,userMobile:user.mobile},"token",{
                    expiresIn:'10m'
                })
        
                let refreshToken=jwt.sign({userName:user.name,userMobile:user.mobile},"refreshToken",{
                    expiresIn:'20m'
                })
               
                res.cookie("token",token)
                tokenN=token
                res.cookie("refreshToken",refreshToken)
                res.send({msg:"Login Successful",token, refreshToken});
            }
            else{
                res.status(400).send({msg:"Wrong credential, Login Failed"});
            }
        });
    } catch (error) {
      res.send({msg:error.message})
    }
})
  
userRouter.get("/logout",async(req,res)=>{
    try {
      
        // let {token}=req.cookies;
        
        redis.set("blacklist",tokenN);
        res.send({msg:"LogOut Successfull"});

    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

userRouter.get("/refresh-token",async(req,res)=>{
    let refreshToken=req.cookies.refreshToken

    let valid=jwt.verify(refreshToken,"refreshToken")

    let newToken=jwt.sign({userEmail:valid.email,role:valid.role},"token",{
        expiresIn:'10m'
    })
    res.cookie("token",newToken,{maxAge:1000*60})
    res.status(200).send({msg:"Token Generated"});

})
  
module.exports={userRouter};