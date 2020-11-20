/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <div class="users-name">
        <h2>${tweet.user.name}<h2>
      </div>
      <div class="users-handle">
        <h3>${tweet.user.handle}</h3>
      </div>
    </header>
    <div>
      <p>${escape(tweet.content.text)}</p>
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

    //Hide error msg by default
    $("div.error-msg").hide();

    const loadTweets = () => {
      $.get("/tweets", (tweets) => {
        renderTweets(tweets);
      });
    };

    //tweet submission
    $("#tweet-form").submit((event) => {

      //prevent default form submit event so we can define our own
      event.preventDefault();

      const tweet = $("#tweet-text").val();

      //send alert and don't submit form if tweet is empty
      if (!tweet) {
        $("p.error-msg").text("You didn't write anything!");
        $("div.error-msg").slideDown(200);
        return;
      }
      //send alert and don't submit form if tweet is too long
      if (tweet.length > 140) {
        $("p.error-msg").text("Too many characters, trim the essay please!");
        $("div.error-msg").slideDown(200);
        return;
      }
      //encode form data as query string and send to server
       const stringData = $("#tweet-form").serialize();

      $.post("/tweets", stringData, (tweet) => {
        $("#tweets-container").prepend(createTweetElement(tweet));
        $("div.error-msg").slideUp();

      });
      
    });

    loadTweets();

  });
