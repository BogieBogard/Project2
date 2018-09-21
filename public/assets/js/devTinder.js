$(() => {
  console.log("devTinder.js Loaded");
  $("#devSubmit").on("click", function(event) {
    event.preventDefault();
    let developerData = {
      name: `${$("#inputFirst")
        .val()
        .trim()} ${$("#inputLast")
        .val()
        .trim()}`,
      username: $("#inputUsername")
        .val()
        .trim(),
      password: $("#inputPassword1")
        .val()
        .trim(),
      location: $("#inputLocation")
        .val()
        .trim(),
      photo: $("#inputPhoto")
        .val()
        .trim(),
      portfolio: $("#inputPortfolio")
        .val()
        .trim(),
      html: $("#html").text(),
      css: $("#css").text(),
      javascript: $("#javascript").text(),
      java: $("#javascript").text(),
      nodeJS: $("#nodejs").text(),
      angular: $("#angular").text(),
      react: $("#react").text(),
      python: $("#python").text()
    };
    console.log(developerData);

    $.post("/api/developers", developerData, function() {
      console.log("created a user and posted data to db");
    }).then(() => {
      $.get("/developerlogin", function() {
        console.log("login plz");
      });
    });
  });
});
