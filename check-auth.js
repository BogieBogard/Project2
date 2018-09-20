const jwt = require("jsonwebtoken");

//===========================================
//this function serves as a middleware that will be implented in our profile routes
//to be passed after URL param in any get or posts that require the user to be logged in


module.exports = (req,res,next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "da_secret");
        next();
        
    } catch(error) {
        res.status(401).json({message: "Auth failed!"});
    }
}