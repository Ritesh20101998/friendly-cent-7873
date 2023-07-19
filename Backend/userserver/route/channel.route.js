const express = require("express")
const ChannelModel  = require("../model/channelmodel")
const channelRouter = express.Router()

channelRouter.get("/channelData", async (req, res) => { 
    try {
        const channel = await ChannelModel.find();
        if (!channel) {
            return res.status(404).send({ message: 'No channel found' });
        }

        // Return the channel data
        res.status(200).send({ channel });
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

channelRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            return res.status(400).send({ message: 'Invalid channel id' });
        }
        const channel = await ChannelModel.findById(id);
        if (!channel) {
            return res.status(404).send({ message: 'channel not found' });
        }

        // Return the channel data
        res.status(200).send({ channel });
    } catch (error) {
        res.status(500).send({channel})
    }
    
})

channelRouter.post("/addChannel", async (req, res) => {
    let {channel} = req.body
    try {
        if (!channel ) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const existingChannel = await ChannelModel.findOne({ channel });
        if (existingChannel) {
          return res.status(409).json({ message: 'channel name already exists' });
        }

        let newChannel  = new ChannelModel({channel })
        await newChannel.save()
        console.log(newChannel)
        res.status(200).send({message:"channel has been added",newChannel})
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

channelRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    // Get the updated channel input from the request body
    const { channel } = req.body;
    try {
        // Check if the id is valid
        if (!id) {
            return res.status(400).send({ message: 'Invalid channel id' });
        }
    
        // Find the channel by id in the database
        const Availablechannel = await ChannelModel.findById(id);
        if (!Availablechannel) {
            return res.status(404).send({ message: 'channel not found' });
        }
    
       
    
        // Update the channel object with the new input
        if (channel) {
            workspace.workspace = workspace;
        }
       
        
        // Save the updated workspace to the database
        await Availablechannel.save();
        res.status(200).send({ message: 'Channel updated successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
// Define the route for deleting a channel
channelRouter.delete('/:id', async (req, res) => {
    // Get the channel id from the request parameters
    const { id } = req.params;
    try {
        // Check if the id is valid
        if (!id) {
            return res.status(400).send({ message: 'Invalid channel id' });
        }
    
        // Find and delete the channel by id in the database
        
        const deletedChannel = await ChannelModel.findByIdAndDelete(id);
        if (!deletedChannel) {
            return res.status(404).send({ message: 'Channel not found' });
        }
        res.status(200).send({ message: 'Workspace deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
    }
});



module.exports = { channelRouter }
