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
        res.status(400).send("user cannot created please check!!!" + err);
    }
});
app.delete("/user" , async (req ,res) =>{
   const userId = req.body.userId;

   try{
      const user = await User.findByIdAndDelete(userId);
      res.send("user deleted successfully");
   }
   catch (err){
      res.status(400).send("soemthing went wrong");
   }
})


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

app.patch("/user" , async (req ,res) =>{
   const userId = req.body.userId;
   const data = req.body;

   try{
      await User.findByIdAndUpdate({_id : userId} ,data ,{
         returnDocument : "after",
         runValidators : true,
      });
      res.send("user updated successfully");
   }
   catch(err) {
      res.status(400).send("update failed : " + err.message);
   }
})

// app.patch("/user" , async(req ,res) =>{
//    const userEmail = req.body.email;
//    const data = req.body;

//    try{
//       const updatedUser = await User.findOneAndUpdate({email : userEmail} , data , {new : true})
//       if(!updatedUser){
//          res.status(404).send("user not found");
//       }
//       else{   
//       res.send("user updated succesfully ");
//       }
//    }
//    catch(err){
//       res.status(400).send("some error occured");
//    }
// })


connectDB().then(() => {
    console.log("database connction successfull");
    app.listen(3000 , () =>{
    console.log("server working on port 3000");
});
 }).catch((err) => {
     console.log("database cannot be connected");
 });

