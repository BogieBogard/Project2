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

  //event listener for skill set update
  $(document).on("click", "#updateProfile", event => {
    event.preventDefault();
    //this will get the developer ID from the url string
    // let devId = parseInt(window.location.href.slice(window.location.href.indexof("/",2) + 1));
    let devId = window.location.pathname.split("/")[2];
    // console.log("Developer URL" , devId); //this output just the developer ID

    let devObj = {
      id: devId,
      html: $("#htmlUpdate").text(),
      css: $("#cssUpdate").text(),
      javascript: $("#javascriptUpdate").text(),
      java: $("#javaUpdate").text(),
      nodeJS: $("#nodejsUpdate").text(),
      angular: $("#angularUpdate").text(),
      react: $("#reactUpdate").text(),
      python: $("#pythonUpdate").text()
    };
    console.log(typeof devObj);
    $.ajax({
      type: "PUT",
      url: `/api/developer/${devId}`,
      data: devObj,
      // datatype: "obj",
      success: result => {
        console.log("put request was sent");
        window.location.href = `/devProfile/${devId}`;
      },
      fail: err => {
        console.log(err);
      }
    });
  });

  //accept project
  $(document).on("click", ".developer-accept-request", e => {
    event.preventDefault();

    let devId = window.location.pathname.split("/")[2];

    //need to get project ID from some html element
    let projId = e.target.id;
    $.ajax({
      type: "PUT",
      url: `/api/project/developer/${projId}`,
      success: result => {
        console.log("project status was successfully updated");
        window.location.href = `/devProfile/${devId}`;
      },
      fail: err => {
        console.log(err);
      }
    });
  });

  //Developer View Project Button
  $(".developer-view-project").on("click", event => {
    let targetView = event.currentTarget.id;
    console.log("Viewing ", targetView);
    $.ajax({
      type: "GET",
      url: `/api/viewproject/${targetView}`,
      success: pending => {
        console.log(`Getting Project matching ${targetView} ID`);
      },
      fail: err => {
        console.log(err);
      },
      complete: result => {
        console.log("Complete GET request for project view", result);
        $(".modal-body").html(""); // Used to clear the html for when the call happens.
        $(".modal-header").html(`<span class="close">&times;</span>`);
        let complete = result.responseJSON;
        console.log("GET PROJECT DATA COMPLETE", complete);
        $(".modal-header").append(
          `<h3>Viewing Project #id: ${complete.id}</h3>`
        );
        $(".modal-body").append(
          `<div class="Fac5"><div class="project-dex"><h5>Project Description:</h5><h6>>>>   ${
            complete.description
          }</h6></div><br><div class="language-shield">
          <i class="fab fa-angular fa-4x"><span>${complete.angular}</i>
          <i class="fab fa-css3-alt fa-4x"><span>${complete.css}</i>
          <i class="fab fa-html5 fa-4x"><span>${complete.html}</span></i>
          <i class="fab fa-java fa-4x"><span>${complete.java}</i>
          <i class="fab fa-js-square fa-4x"><span>${complete.javascript}</i>
          <i class="fab fa-node-js fa-4x"><span>${complete.nodeJS}</i>
          <i class="fab fa-python fa-4x"><span>${complete.python}</i>
          <i class="fab fa-react fa-4x"><span>${complete.react}</i>
          </div><br>
          <div class="project-create-view">Project Created: ${
            complete.createdAt
          }</div>
          <div class="project-assigned-view">Project Assigned: ${
            complete.updatedAt
          }</div>
          <div class="project-complete-view">Project Due-Date: ${
            complete.dueDate
          }</div>
          <br>
          <div class="project-budget"><h6>Project Budget: ${
            complete.cost
          }</h6></div>
          <div class="project-host"><h6>Project Director: ${
            complete.name
          }</h6></div>
          </div>`
        );
      }
    }).then(result => {
      console.log("VIEW Result", result);
      $(".modal").css({
        display: "block"
      });
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

  // this closes view project modal if clilcked outside of the box
  $(document).on("click", event => {
    console.log("Hitting Docuement", event.currentTarget);
    if (event.target.closest(".close")) {
      console.log("Clicked X");
      $(".modal").css({
        display: "none"
      });
    } else if (!event.target.closest(".modal-content")) {
      $(".modal").css({
        display: "none"
      });
    } else {
      console.log("hitting modal");
    }
  });
  $(document).on("click", ".send-invite", event => {
    // console.log(event.currentTarget.id) //VERY IMPORTANT! DO NOT DELETE! PATRICK WILL GET ANGRY AT YOU! >:()
    let relocation = window.location.pathname.split("/");
    console.log("Blu", relocation[2]);
    let projectid = $(".card").attr("id");
    let developerid = event.currentTarget.id;

    console.log(`${projectid} ${developerid}`);
    let dataValues = {
      pid: projectid,
      did: developerid
    };
    console.log(dataValues);
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
