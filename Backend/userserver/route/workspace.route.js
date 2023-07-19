const express = require("express")
const workspaceModel  = require("../model/workspace.model")
const workspaceRouter = express.Router()

workspaceRouter.get("/workspaceData", async (req, res) => { 
    try {
        const workspaces = await workspaceModel.find();
        if (!workspaces) {
            return res.status(404).send({ message: 'No workspaces found' });
        }

        // Return the workspaces data
        res.status(200).send({ workspaces });
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

workspaceRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            return res.status(400).send({ message: 'Invalid workspace id' });
        }
        const workspace = await workspaceModel.findById(id);
        if (!workspace) {
            return res.status(404).send({ message: 'Workspace not found' });
        }

        // Return the workspace data
        res.status(200).send({ workspace });
    } catch (error) {
        res.status(500).send({workspace})
    }
    
})

workspaceRouter.post("/addWorkspace", async (req, res) => {
    let {workspace, description} = req.body
    try {
        if (!workspace ) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const existingWorkspace = await workspaceModel.findOne({ workspace });
        if (existingWorkspace) {
          return res.status(409).json({ message: 'Workspace name already exists' });
        }

        let newWorkspace  = new workspaceModel({workspace,description})
        await newWorkspace.save()
        console.log(newWorkspace)
        res.status(200).send({message:"Workspace has been added",newWorkspace})
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

workspaceRouter.put('/:id', async (req, res) => {
    // Get the workspace id from the request parameters
    const { id } = req.params;
  
    // Get the updated workspace input from the request body
    const { workspace, description } = req.body;
    try {
        // Check if the id is valid
        if (!id) {
            return res.status(400).send({ message: 'Invalid workspace id' });
        }
    
        // Find the workspace by id in the database
        const Availableworkspace = await workspaceModel.findById(id);
        if (!Availableworkspace) {
            return res.status(404).send({ message: 'Workspace not found' });
        }
    
        // Check if the name is already taken by another workspace in the database
        // if (workspace && workspace !== workspace.workspace) {
        //     const existingWorkspace = await workspaceModel.findOne({ workspace });
            
        //     if (existingWorkspace) {
        //         return res.status(409).send({ message: 'Workspace name already exists' });
        //     }
        // }
    
        // Update the workspace object with the new input
        if (workspace) {
            workspace.workspace = workspace;
        }
        if (description) {
            workspace.description = description;
        }
        
        // Save the updated workspace to the database
        await Availableworkspace.save();
        res.status(200).send({ message: 'Workspace updated successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
// Define the route for deleting a workspace
workspaceRouter.delete('/:id', async (req, res) => {
    // Get the workspace id from the request parameters
    const { id } = req.params;
    try {
        // Check if the id is valid
        if (!id) {
            return res.status(400).send({ message: 'Invalid workspace id' });
        }
    
        // Find and delete the workspace by id in the database
        
        const deletedWorkspace = await workspaceModel.findByIdAndDelete(id);
        if (!deletedWorkspace) {
            return res.status(404).send({ message: 'Workspace not found' });
        }
        res.status(200).send({ message: 'Workspace deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
    }
});

module.exports = { workspaceRouter }
