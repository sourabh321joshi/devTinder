const adminAuth = (req ,res ,next) =>{
    const token = "xyz";
    isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized) {
        res.status(401).send("unauthorized request");
    }

    else{
        next();
    }
}

const userAuth = (req ,res ,next) =>{
    const token = "ddd";
    isAdminAuthorized = token === "xyz";

    if(!isAdminAuthorized) {
        res.status(401).send("unauthorized request");
    }

    else{
        next();
    }
}


module.exports = {adminAuth ,userAuth};