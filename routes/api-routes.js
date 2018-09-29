const db = require("../models");
const bcrypt = require("bcrypt-nodejs");
const checkAuth = require("../check-auth.js");
const helper = require("../helperObject");

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

  //route to update the project to complete
  app.put("/api/project", checkAuth, (req, res) => {
    console.log("This is req.body: ", req.body);
    console.log("This is req.params: ", req.params);
    db.Project.update(
      {
        isComplete: true
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(result => {
        res.status(200).send("project was completed!");
      })
      .catch(err => {
        console.log(err);
      });
  });

  //this route creates a new project
  app.post("/api/project", checkAuth, (req, res) => {
    console.log("This is req.body", req.body);

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

  app.get("/api/viewproject/:id", checkAuth, (req, res) => {
    db.Project.findOne({
      where: { id: req.params.id }
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //this route handles the matchingggggg
  //removed check auth for testing
  app.get("/api/projectmatch/:id", checkAuth, (req, res) => {
    //get projectId
    let projectId = req.params.id;
    try {
      helper.projectQuery(projectId, result => {
        console.log("This is the result of match call" ,result)
        res.status(200).json(result);
      });
    } catch (error) {
      console.log("Error in project match id: ", error);
    }
  });

  //routes hit when customer invite a developer
  app.put("/api/project/:pid/developer/:did", checkAuth, (req, res) => {
    db.Project.update(
      {
        DeveloperId: req.params.did
      },
      {
        where: {
          id: req.params.pid
        }
      }
    )
      .then(result => {
        res.status(200).send("developer invite updated");
      })
      .catch(err => {
        console.log(err);
      });
    // console.log("CLIKY HERE", req.params.pid)
    // console.log(req.params.did)
  });

  //route hit when the developer accepts a project
  app.put("/api/project/developer/:id", checkAuth, (req, res) => {
    db.Project.update(
      {
        isAssigned: true
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
