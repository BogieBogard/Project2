const localStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt-nodejs");

//going to need to modify this strategy to look in both dev table and customer table
//currently only looks in dev table
//comment
module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    //username and password are what the user types in
    //these are gathered in the auth.js routes
    //when passport.authenticate is called, it invokes our local strategy and
    //passes it the username password
    new localStrategy(function(username, password, done) {
      console.log({ username, password });

      db.Developer.findOne({
        where: {
          username: username
        }
      }).then(result => {
        if (result) {
          bcrypt.compare(password, result.password, (err, res) => {
            if (err) throw err;
            if (res) {
              return done(null, {
                username: result.username,
                password: result.password
              });
            } else {
              return done(null, false, { message: "incorrect password" });
            }
          });
          //user was not found in developer database
          //now we check customer database
        } else {
          db.Customer.findOne({
            where: {
              username: username
            }
          }).then(result => {
            if (result) {
              bcrypt.compare(password, result.password, (err, res) => {
                if (err) throw err;
                if (res) {
                  return done(null, {
                    username: result.username,
                    password: result.password
                  });
                } else {
                  return done(null, false, { message: "incorrect password" });
                }
              });
            } else {
                return done(null, false, {message: "user does not exist"});
            }
          });
        }
      });
    })
  );
};
