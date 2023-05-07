const express = require("express")
const { ChannelMod } = require("../model/channelmodel")
const channle_router = express.Router()

channle_router.get("/channelData", async (req, res) => {
    
    try {
        const users = await ChannelMod.find()
        
        console.log("user register succesfully")
        res.send(users)
        console.log(users.Channel)
        // console.log(users)
    } catch (error) {
        res.send(error)
    }
})

channle_router.post("/addChannel", async (req, res) => {
    let {Channel} = req.body
    try {
        let chnl = new ChannelMod({Channel})
        await chnl.save()
        console.log(chnl)
        res.send("Channel has been added")
    } catch (error) {
        res.send({ msg: error.message })
    }
})


module.exports = {
    channle_router
}
