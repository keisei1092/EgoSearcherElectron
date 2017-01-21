// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const $ = require('jquery');
const { shell } = require('electron');

// fetch tweets
const Twitter = require('ntwitter');
const client = new Twitter(twitterClidentials);

let searchQuery = '';

function startTrackingTweets() {
  const textBox = $('input[name=query]')
  const newSearchQuery = textBox.val();
  searchQuery = newSearchQuery;

  client.stream('statuses/filter', { track: searchQuery }, function(stream) {
    stream.on('data', function(data) {
      const title = searchQuery + ' についてのあたらしいツイート';
      const body = data.text;
      const iconUrl = data.user.profile_image_url_https;
      spawnNotification(title, body, iconUrl);
    });
    client.currentTwitterStream = stream;
  });
}

function spawnNotification(title, body, iconUrl) {
  const options = {
    body: body,
    icon: iconUrl
  }

  const notification = new Notification(title, options);
}

window.startTrackingTweets = startTrackingTweets;

