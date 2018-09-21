$(() => {
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

    console.log(user);

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
      console.log(result);
      //this get the jswt
      token = `Bearer ${result.token}`;
      console.log(token);
      //this gets the user id to pass in the get request
      //we can query the DB on the back end to get all of the user data
      userId = result.id;

      console.log(userId);

    

      $.ajax({
        type: "GET",
        url: `/devProfile/${userId}`,
        headers: {authorization: token},
      }).then(result => {
        //now we need to figure out how to get the pages to render when the get request is put in
        //auth is working fine, and jwt can be passed in the header as seen above
        console.log("request was sent");
      });
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
      console.log(result);
      //put case to handle invalid creds TODO
      console.log("we sent the request");
      console.log(result);
      //this get the jswt
      token = `Bearer ${result.token}`;
      //this gets the user id to pass in the get request
      //we can query the DB again on the back end before the page render to get user obj info
      userId = result.id

      $.ajax({
        type: "GET",
        url: `/customerProfile/${userId}`,
        headers: {authorization: token},
      }).then(result => {
        //now we need to figure out how to render the pages once we reach the new route
        //auth works passing the jwt in the header as seen above
        console.log("request was sent");
      });
    });
  });
});
