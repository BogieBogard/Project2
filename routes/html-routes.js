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

  app.get("/devProfile/:id", checkAuth, (req, res) => {
    console.log("made it to the profile pages");
    console.log("Developer Control");

    console.log(req.cookies);
    //we have to get the object from the developer database
    let userOb;
    let projArr = [];
    db.Developer.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result, err) => {
        if (err) throw err;
        userOb = result.dataValues;
        //now we have to get all of the project objects from
        //the projects table
      })
      .then(() => {
        db.Project.findAll({
          where: {
            DeveloperId: req.params.id
          }
        })
          .then(result => {
            result.map(x => {
              console.log(x.dataValues);
              projArr.push(x.dataValues);
            });

            console.log(projArr);
            //placing the entirity of the project object that was returned
            //in the userOb under the project key
            //need to store the project id somewhere we can access it in order to make changes to the accepted
            //and done status
            userOb.project = projArr;
            console.log(userOb);
            //res.render("postAuth/developer/developerControl", userOb);
            res.render("postAuth/developer/developerControl");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //what the customer sees after logging in
  app.get("/customerProfile/:id", checkAuth, (req, res) => {
    console.log("made it to the cust profile page");
    console.log("Customer Control");
    let customerData;
    let projectArr = [];
    db.Customer.findOne({
      where: {
        id: req.params.id
      }
    }).then((result, err) => {
      if (err) throw err;
      customerData = result.dataValues;
      console.log("This is CustomerId: ", req.params.id);
      db.Project.findAll({
        where: {
          CustomerId: req.params.id
        }
      }).then(result => {
        result.map(x => {
          console.log(x.dataValues);
          projectArr.push(x.dataValues);
        });
        console.log("This is projectArr ", projectArr);
        customerData.project = projectArr;
        // console.log("this is customer data", customerData);
        // console.log("this is customerdata.project ", customerData.project);
        // console.log("this is projectData", projectData);
        res.render("postAuth/Customer/customerControl", customerData);
      });
     
    });
  
  });

  //what is this?
  app.get("/1", (req, res) => {
    console.log("Developer Profile");
    res.render("postAuth/Customer/customerControl");
  });

  // app.get("/2", (req, res) => {
  //   console.log("Developer Card");
  //   res.render("postAuth/Developer/developerProfilecard");
  // });
};
