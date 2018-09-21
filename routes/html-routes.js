const path = require("path");
const checkAuth = require("../check-auth.js");

module.exports = app => {
  //for the profiles, we need to include either the user ID or some other form of identifying them
  //this will ensure that the correct information gets generated for the server side rendering
  //IE correct picture, projects etc.

  app.get("/customerlogin", (req, res) => {
    console.log("Customer Main Page");
    res.render("partials/Customer/customerlogin");
  });

  app.get("/allpagedisplay", (req, res) => {
    console.log("Front End All Page Test Call");
    res.render("layouts/allpageload");
  });

  // Main/Index Page
  app.get("/", (req, res) => {
    console.log("Index Main Page");
    res.render("index");
  });

  // developer login -- forget password -- Signup
  app.get("/developerlogin", (req, res) => {
    console.log("Developer Main Page");
    res.render("partials/Developer/developerlogin");
  });

  //what the developer sees after logging in
  app.get("/devProfile/:id", checkAuth, (req, res) => {
    console.log("made it to the profile pages");
    console.log("Developer Control");
    res.render("postAuth/Developer/developerControl");
  });

  //what the customer sees after logging in
  app.get("/customerProfile/:id", checkAuth, (req, res) => {
    console.log("made it to the cust profile page");
    console.log("Customer Control");
    res.render("postAuth/Customer/customerControl");
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
  app.get("/newproject", (req, res) => {
    console.log("Create a Project Section");
    res.render("partials/Customer/CustomerControlMenu/addproject");
  });

  //what is this?
  app.get("/1", (req, res) => {
    console.log("Developer Profile");
    res.render("postAuth/Developer/developerProfile");
  });

  app.get("/2", (req, res) => {
    console.log("Developer Card");
    res.render("postAuth/Developer/developerProfilecard");
  });
};
