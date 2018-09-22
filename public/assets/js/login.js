$(() => {
  //This catches the 401 Unauthorized Error from the document
  $(document).on("ajaxError", (event, xhr) => {
    if (xhr.status === 401 || xhr.status === 403) {
      $(".panel").append(`<span id="wronginfo">INCORRECT LOGIN TRY AGAIN</span>`);
      $("#wronginfo").fadeOut(3000);
      $(
        "#inputDevlogin.form-control, #inputDevPassword.form-control, #inputCuslogin.form-control, #inputCusPassword.form-control"
      ).css({
        border: "red solid 3px"
      });
      setTimeout(() => {
        $(
          "#inputDevlogin.form-control, #inputDevPassword.form-control, #inputCuslogin.form-control, #inputCusPassword.form-control"
        ).css({
          border: "#d4d4d4 solid 1px",
          transition: "all .3s ease",
          outline: "0"
        });
      }, 1000);
    }
  });

  //developer login handling
  $(document).on("click", "#dev-login", function(event) {
    event.preventDefault();
    //craete user object based on user input
    let user = {
      username: $("#inputDevlogin")
        .val()
        .trim(),
      password: $("#inputDevPassword")
        .val()
        .trim()
    };

    // console.log(user);

    let token;
    let userId;
    let dataOb;

    $.ajax({
      type: "POST",
      url: "/login/developer",
      data: user
    }).then(result => {
      //put case to handle invalid creds TODO
      console.log("we sent the request");
      console.log(document.cookie);
      //this gets the user id to pass in the get request
      //we can query the DB on the back end to get all of the user data
      userId = result.id;

      console.log(userId);

      window.location.href = `/devProfile/${userId}`;

    });
  });

  //customer login handling
  $(document).on("click", "#customer-login", function(event) {
    event.preventDefault();
    //craete user object based on user input
    let user = {
      username: $("#inputCuslogin")
        .val()
        .trim(),
      password: $("#inputCusPassword")
        .val()
        .trim()
    };

    //reroute is handeled on the backend
    //if login is successful the user is automatically re-routed
    //to their page
    $.ajax({
      type: "POST",
      url: "/login/customer",
      data: user
    }).then(result => {
      //put case to handle invalid creds TODO
      console.log("we sent the request");
      console.log(result);
      //cookie is passed with jwt
      //with every request, the cookie is passed back to the back end
      //in our middle ware, we check the contents to ensure that the jwt is there
      console.log(document.cookie);
      //this gets the user id to pass in the get request
      //we can query the DB again on the back end before the page render to get user obj info
      userId = result.id;

      window.location.href = `/customerProfile/${userId}`;

    });
  });
});
