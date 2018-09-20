let express = require("express");

let router = express.Router();
// MAIN TESTING PAGE: CAN BE DELETED AT ANYTIME AFTER DEPLOYMENT
router.get("/allpagedisplay", (req, res) => {
  console.log("Front End All Page Test Call");
  res.render("layouts/allpageload");
});
// Main/Index Page
router.get("/", (req, res) => {
  console.log("Index Main Page");
  res.render("index");
});
// developer login -- forget password -- Signup
router.get("/developerlogin", (req, res) => {
  console.log("Developer Main Page");
  res.render("partials/Developer/developerlogin")
});
// develoer login > Signup
router.get("/newdeveloper", (req, res) => {
  console.log("Developer Signup");
  res.render("partials/Developer/developerSignup")
});

// customer login -- forget password -- Signup
router.get("/customerlogin", (req, res) => {
  console.log("Customer Main Page");
  res.render("partials/Customer/customerlogin")
});
// customer login > Signup
router.get("/newcustomer", (req, res) => {
  console.log("Customer Signup");
  res.render("partials/Customer/customerSignup")
});


router.get("/1", (req, res) => {
  console.log("Developer Profile");
  res.render("postAuth/Developer/developerProfile")
});

router.get("/2", (req, res) => {
  console.log("Developer Card");
  res.render("postAuth/Developer/developerProfilecard")
});

router.get("/3", (req, res) => {
  console.log("Developer Control");
  res.render("postAuth/Developer/developerControl")
});

router.get("/4", (req, res) => {
  console.log("Customer Control");
  res.render("postAuth/Customer/customerControl")
});
module.exports = router; // why does this export custom methods too?
