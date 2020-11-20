$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    //subtract value of tweet-text from maximum character limit and store in variable
    const newval = (140 - $("#tweet-text").val().length);
    //make characters red if they exceed limit
    if (newval < 0 ) {
      $(".counter").addClass("red-counter");
    } else {
      $(".counter").removeClass("red-counter");
    }
    //update counter to reflect characters remaining
    $(".counter").val(newval);
  });
});