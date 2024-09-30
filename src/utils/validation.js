const validator = require("validator");

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


module.exports = {validateSignUpData};