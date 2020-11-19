$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
    //console.log(($(".counter").val() - $("#tweet-text").val().length));
    //console.log($(".counter").val());
    const newval = (140 - $("#tweet-text").val().length);
    //console.log(newval);
    $(".counter").val(newval);
  });
});