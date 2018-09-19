const db = require("../models");
const bcrypt = require("bcrypt-nodejs");

module.exports = app => {
  app.get("/api/developers", (req, res) => {
    db.Developer.findAll({}).then(result => {
      res.json(result);
    });
  });

  app.get("/api/customers", (req, res) => {
    db.Customer.findAll({}).then(result => {
      res.json(result);
    });
  });

  //missing all fields except username and password
  app.post("/api/developers", (req, res) => {
    db.Developer.findOne({
      where: {
        username: req.body.username
      }
    }).then(results => {
      console.log(results);
      if (results) {
        //returning false to the client to reflect that the user already exists
        res.send(false);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            db.Developer.create({
              username: req.body.username,
              password: hash
            }).then(result => {
              console.log("user created");
              //return true if user was successfully created
              return res.send(true);
            });
          });
        });
      }
    });
  });

  //missing all fields except username and password
  app.post("/api/customers", (req, res) => {
    db.Customer.findOne({
      where: {
        username: req.body.username
      }
    }).then(results => {
      console.log(results);
      if (results) {
        //returning false to the client to reflect that the user already exists
        res.send(false);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            db.Developer.create({
              username: req.body.username,
              password: hash
            }).then(result => {
              console.log("user created");
              //return true if user was successfully created
              return res.send(true);
            });
          });
        });
      }
    });
  });
};
