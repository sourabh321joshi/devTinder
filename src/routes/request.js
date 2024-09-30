const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest" , userAuth , async (req , res) => {
    const user = req.user
    console.log("sendConnectionRequest");
    res.send(user.firstName + " sent the connection sent");
 })
 
module.exports = requestRouter;