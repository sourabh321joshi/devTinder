const express = require("express");

const app = express();

app.use("/user" ,(req ,res) =>{
    res.send("HAHAHAHAHHAHAHAH");
})

app.get("/user" , (req ,res) =>{
    res.send({firstName: "Sourabh" ,lastName :"joshi"})
});

app.post("/user" , (req ,res) =>{
    res.send("database updated successfully!!!");
});

app.delete("/user" ,(req ,res) =>{
    res.send("deleted from the database");
})


app.use("/test" , (req , res) =>{
    res.send("Testing route is workinggg fine!!!!!");
});



app.listen(3000 , () =>{
    console.log("working");
});