$(() => {
  console.log("devTinder.js Loaded");

  // developer signup page submit button
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
      window.location.replace("/developerlogin");
      console.log("login plz");
    });
  });

  //customer signup page button
  $("#customerSubmit").on("click", function(event) {
    event.preventDefault();
    let customerData = {
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
        .trim()
    };
    console.log(customerData);

    $.post("/api/customers", customerData, function() {
      console.log("created a customer and posted data to db");
    }).then(() => {
      window.location.replace("/customerlogin");
      console.log("login plz");
    });
  });

  $("#addProject").on("click", function(event) {
    event.preventDefault();
    let projectData = {
      name: $("#projectName")
        .val()
        .trim(),
      description: $("#projectDes")
        .val()
        .trim(),
      dueDate: $("#projectDue")
        .val()
        .trim(),
      cost: $("#projectCost")
        .val()
        .trim(),
      html: $("#projectHTML")
        .val()
        .trim(),
      css: $("#projectCSS")
        .val()
        .trim(),
      javascript: $("#projectJS")
        .val()
        .trim(),
      java: $("#projectJava")
        .val()
        .trim(),
      nodeJS: $("#projectNodeJS")
        .val()
        .trim(),
      angular: $("#projectAngular")
        .val()
        .trim(),
      react: $("#projectReact")
        .val()
        .trim(),
      python: $("#projectPython")
        .val()
        .trim()
    };
    console.log("This is Project Data: ", projectData);

    $.post("/api/project", projectData, function() {
      console.log("created a project and posted data to db");
    });
  });

  //customer and developer dynamic scroll button
  // $("#customer-scroll-add-project").scrollTo("#add-project")
});
