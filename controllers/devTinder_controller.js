

//edited this to get the home page to show up
//we need to discuss how were going to implement the routes
//we can change this laterzzzzzz
module.exports = app => {
  app.get("/", (req, res) => {
    console.log("Default Page /");
    res.render("index");
  });
  app.get("/#", (req, res) => {
    console.log("LInk");
  });
};
