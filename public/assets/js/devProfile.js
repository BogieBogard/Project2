$(() => {
  //event listener for skill set update
  $(document).on("click", "#updateProfile", event => {
    event.preventDefault();
    //this will get the developer ID from the url string
    let devId = parseInt(window.location.pathname.slice(window.location.pathname.indexof("/",2) + 1));

    let devObj = {
      html: $("#htmlUpdate").text(),
      css: $("#cssUpdate").text(),
      javascript: $("#javascriptUpdate").text(),
      java: $("#javascriptUpdate").text(),
      nodeJS: $("#nodejsUpdate").text(),
      angular: $("#angularUpdate").text(),
      react: $("#reactUpdate").text(),
      python: $("#pythonUpdate").text()
    };

    $.ajax({
      type: "PUT",
      url: `/api/developer/${devId}`,
      data: devObj
    })
      .then(result => {
        console.log("put request was sent");
        window.location.href = `/devProfile/${devId}`;
      })
      .catch(err => {
        console.log(err);
      });
  });

  //====================================================================================================
  //====================================================================================================
  //THIS STILL NEED ATTENTION AFTER FRONT END IS COMPLETED TO GET THE PROJECT ID TO PASS IN THE URL
  $(document).on("click","#acceptProject", event => {
      event.preventDefault();

      let devId = parseInt(window.location.pathname.slice(window.location.pathname.indexof("/",2) + 1));

      //need to get project ID from some html element
      let projId = $("#someElement").attr("projectID");
      $.ajax({
          type: "PUT",
          url: `/api/project/developer/${projId}`
      }).then(result => {
        console.log("project status was successfully updated");
        window.location.href = `/devProfile/${devId}`
      }).catch(err => {
        console.log(err);
      })
  })
});
