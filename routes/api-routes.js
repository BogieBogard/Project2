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
          bcrypt.hash(req.body.password, salt, null, (err, hash) => {
            if (err) throw err;
            db.Developer.create({
              name: req.body.name,
              username: req.body.username,
              password: hash,
              location: req.body.location,
              photo: req.body.photo,
              portfolio: req.body.portfolio,
              html: req.body.html,
              css: req.body.css,
              javascript: req.body.javascript,
              java: req.body.java,
              nodeJS: req.body.nodeJS,
              angular: req.body.angular,
              react: req.body.react,
              python: req.body.python,


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
          bcrypt.hash(req.body.password, salt, null, (err, hash) => {
            if (err) throw err;
            db.Customer.create({
              name: req.body.name,
              username: req.body.username,
              password: hash,
              location: req.body.location,
              photo: req.body.photo,
              numberOfProjects: req.body.numberOfProjects,
            
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
