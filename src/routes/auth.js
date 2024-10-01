const express = require("express");
const authRouter = express.Router();
const {validateSignUpData }= require('../utils/validation');
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const {userAuth} = require("../middlewares/auth");




authRouter.post("/signup" , async (req ,res) => {
    try{
     validateSignUpData(req);
 
     const {firstName , lastName , email ,password} = req.body
 
     const passwordHash = await bcryptjs.hash(password ,10);
     
       const user = new User({
          firstName,
          lastName,
          email,
          password : passwordHash,
       });
       await user.save();
       res.send("user created successfully");
      }
         catch (err) { 
         res.status(400).send("Error : " + err.message);
     }
 });

authRouter.post("/login" , async (req ,res) => {
   try {
      const {email ,password} = req.body

      const user = await User.findOne({email : email})
      
      if(!user) {
         throw new Error("Invalid credentials");
      }
      const isPasswordValid = await user.validatePassword(password);

      if(isPasswordValid){
         const token = await user.getJWT();

         res.cookie("token" , token ,{
            expires : new Date(Date.now() +  8 * 3600000),
         });
         res.send("Login successfull");
      }
      else{
         throw new Error("Invalid credentials");
      }
   }
   catch(err){
      res.status(400).send("Erro : " + err.message);
   }
});

authRouter.post("/logout" , async(req ,res) => {
   res.cookie("token" ,null , {
      expires :new Date (Date.now()),
   });
   res.send("logged out successfully");
})

 module.exports = authRouter;
