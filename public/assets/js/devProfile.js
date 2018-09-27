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
        //success message
        toastr.success("Successfully updated profile!");
        console.log("Developer Profile Updates");
        let delay = 1500;
        setTimeout(function() {
          window.location.href = `/devProfile/${devId}`;
        }, delay);
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
        //success message
        toastr.success("You Have Accepted This Project!");
        console.log("project status was successfully updated");
        let delay = 1500;
        setTimeout(function() {
          window.location.href = `/devProfile/${devId}`;
        }, delay);
      },
      fail: err => {
        console.log(err);
      }
    });
  });

  //view project
  $(document).on("click", ".developer-view-project", e => {
    console.log(`Clicked View Project ${e.target.id}`);
    let projectID = e.target.id;
    console.log(`project id: ${projectID}`);
    $(`.hover_bkgr_fricc#${projectID}`).show();
  });
  $(".hover_bkgr_fricc").click(function() {
    $(".hover_bkgr_fricc").hide();
  });
  $(".popupCloseButton").click(function() {
    $(".hover_bkgr_fricc").hide();
  });
});
