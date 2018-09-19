const localStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt-nodejs");

//going to need to modify this strategy to look in both dev table and customer table
//currently only looks in dev table
module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    new localStrategy(function(username, password, done) {
      console.log({ username, password });

      db.Developer.findOne({
        where: {
          username: username
        }
      }).then(result => {
        if (result) {
          bcrypt.compare(result.password, hash, (err, res) => {
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
              bcrypt.compare(result.password, hash, (err, res) => {
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
