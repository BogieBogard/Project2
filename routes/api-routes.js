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
  app.post("/api/project", (req, res) => {
    console.log("This is req.body", req.body);
    console.log("This is req.params", req.params);

    db.Project.create({
      name: req.body.name,
      description: req.body.description,
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
      CustomerId: req.body.CustomerId
    })
      .then(result => {
        console.log("New Project Created");
        res.send(true);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //route to hit when developer wants to update their profile
  app.put("/api/developer/:id", checkAuth, (req, res) => {
    //assuming the request body is an object with all of the fields that need to be updated
    //I need to send an entirely new object with ALL of the new values
    //hitting update would need to send the post request and then
    //set window.location.href = to the deveprofile page so the get request can be sent again
    //and the page can be updated
    // console.log(req.params.id)
    db.Developer.update(
      {
        html: req.body.html,
        css: req.body.css,
        javascript: req.body.javascript,
        java: req.body.java,
        nodeJS: req.body.nodeJS,
        angular: req.body.angular,
        react: req.body.react,
        python: req.body.python
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(result => {
        res.status(200).send("user was updated");
      })
      .catch(err => {
        console.log(err);
      });
  });

  //route hit when the developer accepts a project
  app.put("/api/project/developer/:id", checkAuth, (req, res) => {
    db.Project.update(
      {
        isAssigned: 1
      },
      {
        where: {
          //assuming PROJECT ID will be passed in the URL
          id: req.params.id
        }
      }
    )
      .then(result => {
        res.status(200).send("project was accepted");
      })
      .catch(err => {
        console.log(err);
      });
  });
};
