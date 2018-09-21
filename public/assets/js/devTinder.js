$(() => {
  console.log("devTinder.js Loaded");
  $(".change-sleep").on("click", function(event) {
    $.ajax("/" + id, {
      type: "GET",
      data: newSleepState
    }).then(function() {
      console.log("changed sleep to", newSleep);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
