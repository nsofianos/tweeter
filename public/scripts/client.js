/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <h2>${tweet.user.name}</h2>
      <h3 class="my-tag">${tweet.user.handle}</h3>
    </header>
    <div>
      <p>${tweet.content.text}</p>
    </div>
    <hr>
    <footer class="tweet-footer">
      <p>10 days ago</p>
      <p class="icons">icons</p>
    </footer>
  </article>`);
    return $tweet;
  };
  
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
  }

  $(document).ready(() => {

    const loadTweets = () => {
      $.get("/tweets")
      .then((tweets) => {
        renderTweets(tweets);
      })
    };

    //tweet submission
    $("#tweet-form").submit((event) => {

      //prevent default form submit event so we can define our own
      event.preventDefault();

      const tweet = $("#tweet-text").val();
      //send alert and don't submit form if tweet is empty
      if (!tweet) {
        alert("You didn't write anything!");
        return;
      }
      //send alert and don't submit form if tweet is too long
      if (tweet.length > 140) {
        alert("Tweet too long!")
        return;
      }
      //encode form data as query string and send to server
      const stringData = $("#tweet-form").serialize();
      $.post("/tweets", stringData, () => {
        console.log("success mate");
      });
    });

    loadTweets();
  });
