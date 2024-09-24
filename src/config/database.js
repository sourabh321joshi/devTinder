const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sourabh-20:1C4RnPMg5CLDbXcq@namastenode.ksoxg.mongodb.net/devTinder");
};

module.exports = connectDB;


