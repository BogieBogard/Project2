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
      console.log("login please");
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
      // window.location.reload();
      let customerID = window.location.pathname.slice(17);
      window.location.href = `/customerProfile/${customerID}`;
      //need to make this into a modal
      alert("Project Added Successfully!");
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
      console.log("put request was sent");
      window.location.href = `/customerProfile/${customerID}`;
      //need to make this a modal
      alert("Project Completed!");
    });
  });

  //Developer Update Profiel Button
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
    console.log("this is the project id", projectId);
    $.ajax({
      type: "Get",
      url: `/api/projectmatch/${projectId}`,
      complete: result => {
        $(".modal-body").html(""); // Used to clear the html for when the call happens again.
        let complete = result.responseJSON;
        // console.log("HELLO GLOP", result.responseJSON);
        for (let i = 0; i < complete.length; i++) {
          let choice = complete[i];
          // console.log("Result Lenght", i);
          $(".modal-body").append(`<div class="card" id="${projectId}">
          <div class="developer-profilecard-photo">
          <img src="${choice.photo}" alt="developer_profile_image"></div>
          <h1 id="profilecard-name">${choice.name}</h1>
          <p class="title">Software / Full-stack Developer</p>
          <a href="JavaScript:;" class="button alt small fit not-active" id="rating"><i class="icon fa-star rating">62</i><i class="icon fa-thumbs-up rating">50</i><i class="icon fa-thumbs-down rating">12</i></a>
          <a href="JavaScript:;" class="view-developer addproject button alt small fit icon fa-info-circle" id="${
            choice.id
          }">View Developer Profile</a>
          <a href="JavaScript:;" class="send-invite viewprofile button small fit icon fa-plus" id="${
            choice.id
          }">Invite to project</a>
      </div>`);
        }
      }
    }).then(result => {
      $(".modal").css({
        display: "block"
      });
    });
  });

  $(".close").on("click", () => {
    $(".modal").css({
      display: "none"
    });
  });

  $(document).on("click", ".send-invite", event => {
    // console.log(event.currentTarget.id) //VERY IMPORTANT! DO NOT DELETE! PATRICK WILL GET ANGRY AT YOU! >:()
    let relocation = window.location.pathname.split('/');
    console.log("Blu", relocation[2])
    let projectid = $(".card").attr("id");
    let developerid = event.currentTarget.id;

    console.log(`${projectid} ${developerid}`);
    let dataValues = {
      pid: projectid,
      did: developerid
    }
    console.log(dataValues)
    $.ajax({
      type: "PUT",
      url: `/api/project/${projectid}/developer/${developerid}`,
      data: dataValues
    }).then(result => {
      console.log("customer invite sent");
      window.location.href = `/customerProfile/${relocation[2]}`;
    });
  });

  $("#hibernateButton").on("click", function(event) {
    event.preventDefault();
    window.location.replace("/customerlogin");
    alert("Logged out!");
  });
});
