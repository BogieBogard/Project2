$(() => {
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
      java: $("#javascriptUpdate").text(),
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

  //view project
  $(document).on("click", ".developer-view-project ", e => {
    console.log(`Clicked View Project ${e.target.id}`);
    let a = e.target.id.split("-");
    console.log(a);
    $(".hover_bkgr_fricc").show();
    $("#headerpage").html(`
    <div id="view-project-project-id">Projct ID: ${a[1]}</div>
    <div id="view-project-customer-id">Customer ID: ${a[0]}</div>
    <div id="view-project-project-description">${a[2]}</div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>
    <div id="view-project-project-id"></div>`);
    //This is the order data is passed from the backend to the front end using ID.
    // Does not need auth and would not be accessable with out proper auth to make the call
    //-------------------- 5 elements per line 13 elements total
    // Customer ID, Developer ID, Project Description, update date, due date
    // html, css, javascript, java, nodejs
    //angular, react, python
    //--------------------
  });
  $(".hover_bkgr_fricc").click(function() {
    $(".hover_bkgr_fricc").hide();
  });
  $(".popupCloseButton").click(function() {
    $(".hover_bkgr_fricc").hide();
  });
});
