const validator = require("validator");
const requestRouter = require("../routes/request");

const validateSignUpData = (req) => {
    const {firstName , lastName , email , password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is required");
    }

    else if(!validator.isEmail(email)){
        throw new Error("EmaiL is not valid");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is weak try with strong pasword!!!");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName" , "lastName"  , "photoUrl" , "gender" , "age" , "about" , "skills"];

    if (req.body.email) {
        throw new Error("Email cannot be edited.");
    }

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
}


module.exports = {validateSignUpData ,validateEditProfileData};