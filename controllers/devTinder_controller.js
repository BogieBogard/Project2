let express = require("express");

let router = express.Router();


router.get("/", (req, res) => {
  console.log("Default Page /");
  res.render("index");
});

module.exports = router; // why does this export custom methods too?
