const {Router} =  require("express")
const {User} = require("../models/user.model")
const jwt =  require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { blacklist } = require("../blacklist")
require("dotenv").config()
const userRouter = Router()


userRouter.get("/",(req,res)=>{
    res.send("Welcome")
})

userRouter.post("/signup",async(req,res)=>{
    const {name, mobile,email,password,workspace} = req.body;
    try{
        const useravailable = await User.findOne({email})
        if(useravailable){
            return res.status(200).send({msg:"User already present ,please login directly.."})
        }

        const hashedpass = await bcrypt.hashSync(password,5);

        const nuser = new User({name,mobile,email,password:hashedpass,workspace})
        await nuser.save()
        console.log(nuser)
        res.status(200).send({msg:"Signup Successfully done.."})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}= req.body;
    
        if(!email){
            return res.status(400).send({msg:"Wrong details provided.."})
        }

        const useravailable = await User.findOne({email})
        if(!useravailable) {
            return res.status(400).send({msg:"Please first register yourself.."})
        }

        const passwordCorrect = await bcrypt.compareSync(
            password,
            useravailable.password
        )
        if(!passwordCorrect){
            return res.status(400).send({msg:"Worng Credentials"})
        }

        const token = await jwt.sign(
            {email,userId:useravailable._id},
            process.env.secret_key ,
            {expiresIn:"1hr"}
        )

        const refresh_token = await jwt.sign(
            {userId:useravailable._id,role},
            process.env.refresh_key ,
            {expiresIn:"3hr"}
        )

        console.log(token,refresh_token)
        res.status(200).send({msg:"Login Successfully.."})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        const blacklistToken = blacklist.push(token)
        await blacklistToken.save()
        res.status(200).send({msg:"logout successfully.."})
    } catch(err){
        res.status(500).send({msg:err.message})
    }
})

userRouter.get("/refreshtoken",async(req,res)=>{
    const refreshToken =  req.headers.authorization.split(" ")[1];

    if(!refreshToken){
        return res.status(400).send({msg:"Please login again.."})
    }

    jwt.verify(refreshToken,process.env.refresh_key,(err,decoded)=>{
        if(err){
            return res.send({msg:"Please login again.."})
        } else {
            const token = jwt.sign(
                {userId:decoded.userId,email:decoded.email},
                process.env.secret_key,
                {expiresIn:"1m"}
            )
            res.status(200).send({msg:"Login successfully done.."})
        }
    })
})



module.exports = {userRouter}