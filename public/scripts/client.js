/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

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

    $("#tweet-form").submit((event) => {
      event.preventDefault();
      const tweet = $("#tweet-text").val();

      if (!tweet) {
        alert("You didn't write anything!");
        return;
      }
      if (tweet.length > 140) {
        alert("Tweet too long!")
        return;
      }
      const stringData = $("#tweet-form").serialize();
      $.post("/tweets", stringData, () => {
        console.log("success mate");
      });
    });

    loadTweets();
  });
