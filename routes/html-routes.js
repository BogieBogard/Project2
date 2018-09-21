const path = require("path");
const checkAuth = require("../check-auth.js");

module.exports = app => {
    //for the profiles, we need to include either the user ID or some other form of identifying them
    //this will ensure that the correct information gets generated for the server side rendering
    //IE correct picture, projects etc.
    app.get("/profile", checkAuth, (req,res) => {
        res.status(200).send("we in here");
    })
}