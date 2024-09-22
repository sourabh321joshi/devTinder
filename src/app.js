const express = require("express");

const app = express();

const {adminAuth ,userAuth} = require("./middlewares/auth");

app.use("/admin" ,adminAuth);

app.get("/user" , userAuth  , (req ,res) => {
    res.send("user data is send")
});

app.get("/admin/getAllData" , (req ,res ) =>{
    res.send("All data is here...");
})

app.get("/admin/deleteData" , (req ,res) =>{
    res.send("Deleted data is here...");
});

app.listen(3000 , () =>{
    console.log("working");
});