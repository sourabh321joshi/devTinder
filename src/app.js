const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup" , async (req ,res) => {
     const user = new User(req.body);
     
     try{
        await user.save();
     res.send("user created successfully");
     } catch (err) { 
        res.status(400).send("user cannot created please check!!!");
    }
});

app.get("/user" , async (req ,res) => {
   const userEmail = req.body.email;

   try{
      const user =  await User.findOne({email : userEmail})
      res.send(user);
   }

   // try { 
   //    const users = await User.find({email : userEmail});
   //    if(users.length=== 0) {
   //       res.status(404).send("user not found");
   //    }
   //    else{
   //       res.send(users);
   //    }
   // }

   catch {
      res.status(400).send("something went wrong");
   }
})

app.get("/feed" , async (req , res) => {

   try {
      const users = await User.find({});
      res.send(users);
   }
   catch{
      res.status(400).send("something went wrong");
   }
})

connectDB().then(() => {
    console.log("database connction successfull");
    app.listen(3000 , () =>{
    console.log("server working on port 3000");
});
 }).catch((err) => {
     console.log("database cannot be connected");
 });

