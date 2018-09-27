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
      //success message
      toastr.success("Thank you for registering! Please Log-in");
      console.log("Developer Added");
      let delay = 1500;
      setTimeout(function() {
        window.location.replace("/developerlogin");
      }, delay);
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
      //success message
      toastr.success("Thank you for registering! Please Log-in");
      console.log("Customer Added");
      let delay = 1500;
      setTimeout(function() {
        window.location.replace("/customerlogin");
      }, delay);
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
      html: $("#projectHTML").text(),
      css: $("#projectCSS").text(),
      javascript: $("#projectJavascript").text(),
      java: $("#projectJava").text(),
      nodeJS: $("#projectNodeJS").text(),
      angular: $("#projectAngular").text(),
      react: $("#projectReact").text(),
      python: $("#projectPython").text(),
      CustomerId: window.location.pathname.slice(17)
    };
    console.log("This is Project Data: ", projectData);
    $.post("/api/project", projectData, function() {
      console.log("created a project and posted data to db");
    }).then(() => {
      let customerID = window.location.pathname.slice(17);
      //success
      toastr.success("Project Added!");
      console.log("Project Added!");
      let delay = 1500;
      setTimeout(function() {
        window.location.href = `/customerProfile/${customerID}`;
      }, delay);
    });
  });
  $(".completeButton").on("click", function(event) {
    let customerID = window.location.pathname.slice(17);
    let projectID = `${this.id}`;
    console.log("this is customerID: ", customerID);
    console.log("This is the project ID:", projectID);
    $.ajax({
      type: "PUT",
      url: `/api/project`,
      data: { id: projectID }
    }).then(result => {
      toastr.success("Project Complete!");
      console.log("put request was sent");
      let delay = 1500;
      setTimeout(function() {
        window.location.href = `/customerProfile/${customerID}`;
      }, delay);
    });
  });

  //Developer Update Profile Button
  $("#profile-update").on("submit", () => {
    event.preventDefault();
    console.log("Developer Profile Update Clicked");
    let DevUpdate = {
      html: $("#html").text(),
      css: $("#css").text(),
      javascript: $("#javascript").text(),
      java: $("#javascript").text(),
      nodeJS: $("#nodejs").text(),
      angular: $("#angular").text(),
      react: $("#react").text(),
      python: $("#python").text()
    };
    console.log(DevUpdate);
    $.post("/api/developer/profileupdate", DevUpdate, () => {
      console.log("Changed Developer Profile Settings");
    });
  });
  $(document).on("click", ".matchButton", function(event) {
    event.preventDefault();
    let projectId = $(this).attr("data-id");
    $.ajax({
      type: "Get",
      url: `/api/projectmatch/${projectId}`
    }).then(result => {
      //ok, so in the result, I am going to return an array with all of the developers that "matched"
      //with the project.
    });
  });
  $("#hibernateButton").on("click", function(event) {
    event.preventDefault();
    console.log("Successfully Logged Out!");
    $.ajax({
      type: "GET",
      url: "/logout/customer"
    }).then(result => {
      toastr.success("Successfully Logged Out!");
      let delay = 1500;
      setTimeout(function() {
        window.location.replace("/customerlogin");
      }, delay);
    });
  });
});
