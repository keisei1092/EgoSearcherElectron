// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const $ = require('jquery');
const { shell } = require('electron');

// fetch tweets
const Twitter = require('ntwitter');
const client = new Twitter(twitterClidentials);

function startTrackingTweets() {
  const textBox = $('input[name=query]')
  const newSearchQuery = textBox.val();
  searchQuery = newSearchQuery;

  client.stream('statuses/filter', { track: searchQuery }, function(stream) {
    stream.on('data', function(data) {
      new Notification(data.text);
    });
    client.currentTwitterStream = stream;
  });
}

window.startTrackingTweets = startTrackingTweets;

