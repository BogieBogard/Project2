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

  app.get("/developerlogin", (req, res) => {
    console.log("Developer Main Page");
    res.render("partials/Developer/developerlogin");
  });

  //what the developer sees after logging in
  app.get("/devProfile/:id", checkAuth, (req,res) => {
      console.log('made it to the profile pages');

  });

  //what the customer sees after logging in
  app.get("/customerProfile/:id", checkAuth, (req,res) => {
      console.log("made it to the cust profile page");

  });
};
