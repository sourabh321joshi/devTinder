const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserid" , userAuth , async (req , res) => {
   try{
    const fromUserId = req.user;
    const toUserId = req.params.toUserid;
    const status = req.params.status;

    const allowedStatus = ["ignored" , "interested"];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({message : "Invalid status type " + status});
    }

    const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message : "User not found"})
        };
    

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or : [
            {fromUserId , toUserId},
            {fromUserId : toUserId , toUserId : fromUserId},
        ],
    });

    if(existingConnectionRequest){
        return res.status(400).json({message : "connection request already present"});
    }

    const connectionRequest = new ConnectionRequest({
        fromUserId,toUserId,status,
    });

    const data = await connectionRequest.save();

    res.json({
        message: `${req.user.firstName} ${req.user.lastName} has ${status}  ${toUser.firstName} ${toUser.lastName}`,
        data
    });
    

   }
   catch(err) {
    res.status(400).send("Error : " + err.message);
   }
 });

requestRouter.post("/request/review/:status/:requestId" , userAuth , async (req ,res) =>{
    try{

    
    const loggedInUser = req.user;
    const {status ,  requestId} = req.params;

    const allowedStatus = ["accepted" ,"rejected"];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({message : "Status not allowed"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "interested",

    });

    if(!connectionRequest){
        return res.status(400).json({message : "connection request not found"})
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.json({message : "connection request " + status , data});
}
    catch(err){
        res.status(400).json("Error :" + err.message);
    };
});
 
module.exports = requestRouter;

