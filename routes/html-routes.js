const path = require("path");
const checkAuth = require("../check-auth.js");
const db = require("../models");

module.exports = app => {
  //for the profiles, we need to include either the user ID or some other form of identifying them
  //this will ensure that the correct information gets generated for the server side rendering
  //IE correct picture, projects etc.

  // Main/Index Page
  app.get("/", (req, res) => {
    console.log("Index Main Page");
    res.render("index");
  });

  app.get("/customerlogin", (req, res) => {
    console.log("Customer Main Page");
    res.render("partials/Customer/customerlogin");
  });

  app.get("/developerlogin", (req, res) => {
    console.log("Developer Main Page");
    res.render("partials/Developer/developerlogin");
  });

  app.get("/newdeveloper", (req, res) => {
    console.log("Developer Signup");
    res.render("partials/Developer/developerSignup");
  });

  app.get("/newcustomer", (req, res) => {
    console.log("Customer Signup");
    res.render("partials/Customer/customerSignup");
  });

  app.get("/newproject", checkAuth, (req, res) => {
    console.log("Create a Project Section");
    res.render("partials/Customer/CustomerControlMenu/addproject");
  });

  //what the developer sees after logging in
  app.get("/devProfile/:id", checkAuth, (req, res) => {
    db.Developer.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result, err) => {
        if (err) throw err;
        let userOb = result.dataValues;
        db.Project.findAll({
          where: {
            DeveloperId: req.params.id
          }
        })
          .then(result => {
            let projectinvite = result.filter(
              z => !z.isAssigned && !z.isComplete
            );
            let openproject = result.filter(
              b => b.isAssigned && !b.isComplete
            );
            let completeProjects = result.filter(
              x => x.isAssigned && x.isComplete
            );
            res.render("postAuth/developer/developerControl", {
              developer: userOb,
              projectinvite: projectinvite,
              openproject: openproject,
              completeProjects: completeProjects
            });
          })
          .catch(err => {
            if (err) throw err;
          });
      })
      .catch(err => {
        if (err) throw err;
      });
  });

  //what the customer sees after logging in
  app.get("/customerProfile/:id", checkAuth, (req, res) => {
    console.log("made it to the cust profile page");
    console.log("Customer Control");
    let customerData;

    db.Customer.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result, err) => {
        if (err) throw err;
        customerData = result.dataValues;
        db.Project.findAll({
          where: {
            CustomerId: req.params.id
          }
        })
          .then(result => {
            let completeProjects = result.filter(x => x.isComplete == 1);
            let notCompleteProjects = result.filter(y => y.isComplete == 0);
            res.render("postAuth/customer/customerControl", {
              name: customerData.name,
              photo: customerData.photo,
              completeProjects: completeProjects,
              notCompleteProjects: notCompleteProjects
            });
          })
          .catch(err => {
            if (err) throw err;
          });
      })
      .catch(err => {
        if (err) throw err;
      });
  });
};
