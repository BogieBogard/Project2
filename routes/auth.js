const db = require("../models");
const passport = require("passport");

module.exports = app => {
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
                return res.status(200).json({user});
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
                return res.status(200).json({user});
            });
        })(req,res,next);
    });
}