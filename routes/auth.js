const db = require("../models");
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = app => {

    //once the user hits the sign in button, we need to re route them to their profile page
    //need to figure out best way to do this
    app.post("/login/developer", function(req, res, next) {
        console.log(req.body);
        passport.authenticate("local", function(err, user, info){
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.status(401).json({user});
            }
            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }
                const token = jwt.sign({username: user.username , password: user.password}, "da_secret", {expiresIn: "24h"});
                return res.status(200).json({
                    token: token,
                    expiresIn: 86400
                });
            });
        })(req,res,next);
    });

    app.post("/login/customer", function(req, res, next) {
        console.log(req.body);
        passport.authenticate("local", function(err, user, info){
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.status(401).json({user});
            }
            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }
                const token = jwt.sign({username: user.username, password: user.password}, "da_secret", {expiresIn: "24h"});
                return res.status(200).json({
                    token: token,
                    expiresIn: 86400
                });
            });
        })(req,res,next);
    });
}