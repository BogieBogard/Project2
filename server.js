// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
const exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static(path.join(__dirname, "public")));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(routes);
//=============================================================================================
app.engine("handlebars", exphbs({ defaultLayout: "main" })); // set the main html page load out.
app.set("view engine", "handlebars"); // set the engine run root dir.

// Routes - NEED TO INSERT OUR ROUTES HERE
// ============================================================================================
//EXAMPLES:
// require("./routes/post-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/html-routes.js")(app);

//this is our strategy
require("./passport")(passport);

//====================================================
//added this to show the home page
//need to discuss how we are going to set up the routes

//=========================================================

require("./routes/auth.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
