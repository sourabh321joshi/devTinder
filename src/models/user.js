const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String, 
        required : true,
        minLength : 4,
        maxLength : 50,
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address : " + value);
            }
        },
    },
    password : {
        type : String , 
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak :" + value);
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value) {
            if(!["male" , "female" , "others"].includes(value)){
                throw new Error ("gender data is not valid");
            }
        },
    },
    photoUrl : {
        type : String,
        default : "http://abc.png",
    },
    about : {
        type  : String , 
        default : "This is a default description of a user"
    },
    skills : {
        type : [String],
    },

}, {
    timestamps : true,
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id :user._id} , "DEV@Tinder$790" ,{
        expiresIn : "7D",
    });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcryptjs.compare (passwordInputByUser , passwordHash);

    return isPasswordValid ; 
};

module.exports = mongoose.model("User" ,userSchema);