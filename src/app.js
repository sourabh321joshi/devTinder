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

connectDB().then(() => {
    console.log("database connction successfull");
    app.listen(3000 , () =>{
    console.log("server working on port 3000");
});
 }).catch((err) => {
     console.log("database cannot be connected");
 });

