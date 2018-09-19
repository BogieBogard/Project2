const path = require("path");

module.exports = app => {
    app.get("/profile", (req,res) => {
        res.status(200).send("we in here");
    })
}