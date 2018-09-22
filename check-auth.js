const jwt = require("jsonwebtoken");

//===========================================
//this function serves as a middleware that will be implented in our profile routes
//to be passed after URL param in any get or posts that require the user to be logged in


module.exports = (req,res,next) => {
    try {
        //look into passing the jswt in a query string from the redirect
        //would have to add a check here to look for the token
        const token = req.cookies.jswt.split(" ")[1];
        jwt.verify(token, "da_secret");
        next();
        
    //in this catch we can have a simple redirect to the home page
    } catch(error) {
        res.status(401).json({message: "Auth failed!"});
    }
}