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

  app.get("/allpagedisplay", (req, res) => {
    console.log("Front End All Page Test Call");
    res.render("layouts/allpageload");
  });

  // developer login -- forget password -- Signup
  app.get("/developerlogin", (req, res) => {
    console.log("Developer Main Page");
    res.render("partials/Developer/developerlogin");
  });

  // developer login > Signup
  app.get("/newdeveloper", (req, res) => {
    console.log("Developer Signup");
    res.render("partials/Developer/developerSignup");
  });

  // customer login > Signup
  app.get("/newcustomer", (req, res) => {
    console.log("Customer Signup");
    res.render("partials/Customer/customerSignup");
  });
  //route to add a new project
  app.get("/newproject", checkAuth, (req, res) => {
    console.log("Create a Project Section");
    res.render("partials/Customer/CustomerControlMenu/addproject");
  });

  //what the developer sees after logging in
  //this route needs attention when merged I tried implementing the same changes yall made on your end
  //yall go it before i did so make sure this doesnt overwrite yalls route
  //same with the customer
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
<<<<<<< HEAD
            let openProjectinvite = result.filter(
              z => !z.isAssigned && !z.isComplete
            );
            let openProjectAccept = result.filter(
              b => b.isAssigned && !b.isComplete
            );
            let completeProjects = result.filter(
              x => x.isAssigned && x.isComplete
            );
            res.render("postAuth/developer/developerControl", {
              developer: userOb,
              projectinvite: openProjectinvite,
              openproject: openProjectAccept,
              completeProjects: completeProjects
=======
            let completeProjects = result.filter(x => x.isComplete == 1);
            let notCompleteProjects = result.filter(y => y.isComplete == 0);

            console.log("This is customerData", customerData);
            //res.render("postAuth/developer/developerControl", userOb);
            res.render("postAuth/developer/developerControl", {
              name: userOb.name,
              photo: userOb.photo,
              completeProjects: completeProjects,
              notCompleteProjects: notCompleteProjects

>>>>>>> master
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
<<<<<<< HEAD
=======
    console.log("made it to the cust profile page");
    console.log("Customer Control");
    let customerData;

>>>>>>> master
    db.Customer.findOne({
      where: {
        id: req.params.id
      }
<<<<<<< HEAD
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
=======
    }).then((result, err) => {
      if (err) throw err;
      customerData = result.dataValues;
      console.log("This is CustomerId: ", req.params.id);
      db.Project.findAll({
        where: {
          CustomerId: req.params.id
        }
      }).then(result => {
        let completeProjects = result.filter(x => x.isComplete == 1);
        let notCompleteProjects = result.filter(y => y.isComplete == 0);
        console.log("This is customerData", customerData);
        res.render("postAuth/customer/customerControl", {
          name: customerData.name,
          photo: customerData.photo,
          completeProjects: completeProjects,
          notCompleteProjects: notCompleteProjects
        });
>>>>>>> master
      });
  });
};
