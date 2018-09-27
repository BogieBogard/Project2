const db = require("../models");
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = app => {
  let devId;
  let custId;
  //once the user hits the sign in button, we need to re route them to their profile page
  //need to figure out best way to do this
  app.post("/login/developer", function(req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        //auth fails
        return res.status(401).json(false);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        //here we get th user id of the user who signed in in order to redirect the user after theyre logged in
        //if we want to get fancy we can hash the ID for protection
        //

        db.Developer.findOne({
          where: {
            username: user.username
          }
        }).then(result => {
          //since our auth strat checks through both DB's, we have to implement
          //a catch incase a dev accidentially tries to sign in on the customer page
          //the user can exist, but it will not exist in the customer db, thus if the result
          //of the query is null, we return a 401
          if (result === null) {
            //auth fails
            return res.status(401).json(false);
          }
          devId = result.dataValues.id;
          console.log(devId);
          const token = jwt.sign(
            { username: user.username, password: user.password },
            "da_secret",
            { expiresIn: "24h" }
          );
          return res
            .status(200)
            .cookie("jswt", `Bearer ${token}`, { maxAge: 60 * 60 * 24 * 1000 })
            .json({
              id: devId
            });
        });
      });
    })(req, res, next);
  });

  app.post("/login/customer", function(req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        //auth fails
        console.log("failing here");
        return res.status(401).json(false);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        //need to get user id from database to pass to the front end
        //this is the purpose of userId and the DB query
        //if we want to get fancy we can hash the id for protection
        //returning the status an json in the db response promise

        db.Customer.findOne({
          where: {
            username: user.username
          }
        }).then(result => {
          //since our auth strat checks through both DB's, we have to implement
          //a catch incase a dev accidentially tries to sign in on the customer page
          //the user can exist, but it will not exist in the customer db, thus if the result
          //of the query is null, we return a 401
          if (result === null) {
            //auth fails
            console.log("Failing here");
            return res.status(401).json(false);
          }
          custId = result.dataValues.id;
          console.log(custId);
          const token = jwt.sign(
            { username: user.username, password: user.password },
            "da_secret",
            { expiresIn: "24h" }
          );

          return res
            .status(200)
            .cookie("jswt", `Bearer ${token}`, { maxAge: 60 * 60 * 24 * 1000 })
            .json({
              id: custId
            });
        });
      });
    })(req, res, next);
  });

  //customer logout
  app.get("/logout/customer", checkAuth, (req, res) => {
    console.log("cookie cleared");
    res.clearCookie("jswt").status(200);
  })

  //developer logout
  app.get("/logout/developer", checkAuth, (req, res) => {
    console.log("cookie cleared");
    res.clearCookie("jswt").status(200);
  })
};
