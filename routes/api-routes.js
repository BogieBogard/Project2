const db = require("../models");
const bcrypt = require("bcrypt-nodejs");
const checkAuth = require("../check-auth.js");

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
  
  //this route creates a developer user
  app.post("/api/developers", (req, res) => {
    //first check the developer database for the user name the user
    //is trying to claim
    db.Developer.findOne({
      where: {
        username: req.body.username
      }
    }).then(results => {
      //if the username exists (results is not null), then return a false
      console.log(results);
      if (results) {
        //returning false to the client to reflect that the user already exists
        res.send(false);
      } else {
        //if the username does not exist in the developer database, we have to check the customer database
        db.Customer.findOne({
          where: {
            username: req.body.username
          }
        }).then(result => {
          if (result) {
            //returning false to the client to reflect that the username is already taken
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
                  python: req.body.python

                }).then(result => {
                  console.log("user created");
                  //return true if user was successfully created
                  return res.send(true);
                });
              });
            });
          }
        });
      }
    });
  });

  //this route creates a customer user
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
        db.Developer.findOne({
          where: {
            username: req.body.username
          }
        }).then(result => {
          if (result) {
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
                  numberOfProjects: req.body.numberOfProjects
                }).then(result => {
                  console.log("user created");
                  //return true if user was successfully created
                  return res.send(true);
                });
              });
            });
          }
        });
      }
    });
  });


  //this route creates a new project
  app.post("/api/project", checkAuth, (req,res) => {
    let projObj = {
      name: req.body.name,
      dueDate: req.body.dueDate,
      cost: req.body.cost,
      html: req.body.html,
      css: req.body.css,
      javascript: req.body.javascript,
      java: req.body.java,
      nodeJS: req.body.nodeJS,
      angular: req.body.angular,
      react: req.body.react,
      python: req.body.python,
    };
    db.Project.create({
      projObj
    }).then(result => {
      console.log("New Project Created");
      res.send(true);
    })
  })
};
