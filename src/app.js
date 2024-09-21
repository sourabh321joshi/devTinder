const express = require("express");

const app = express();

app.use("/" , (req ,res) =>{
    res.send("sta!!");
});

app.use("/test" , (req , res) =>{
    res.send("Testing route is workinggg fine!!!!!");
});

app.use("/hello" , (req ,res) =>{
    res.send("hello hello hello !!!");
});

app.listen(3000 , () =>{
    console.log("working");
});