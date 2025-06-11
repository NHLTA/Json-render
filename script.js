document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tweetForm');
  const preview = document.getElementById('previewArea');

  // --- Form Submission Logic ---
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const tweetUrl = document.getElementById('tweetUrl').value.trim();

    if (!tweetUrl.startsWith("https://twitter.com/")) {
      alert("Please enter a valid Twitter URL.");
      return;
    }

    // Generate embed code from tweet URL
    const embed = `<blockquote class="twitter-tweet"><a href="${tweetUrl}"></a></blockquote>`;

    // Show preview
    preview.innerHTML = `<h3>${title}</h3>${embed}`;

    // Copy JSON to clipboard
    const tweetObject = {
      title: title,
      embed: embed
    };
    const tweetJsonString = JSON.stringify(tweetObject, null, 2);
    navigator.clipboard.writeText(tweetJsonString).then(() => {
      alert("Tweet JSON copied to clipboard. Paste it into tweets.json on GitHub.");
    });

    // Load Twitter embed for preview
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(preview);
    }
  });

  // --- Load and Display Tweets from tweets.json ---
  fetch('tweets.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('tweetsContainer');
      data.forEach(tweet => {
        const tweetDiv = document.createElement('div');
        tweetDiv.innerHTML = `<h3>${tweet.title}</h3>${tweet.embed}`;
        container.appendChild(tweetDiv);
      });

      // Load Twitter embed widgets for all tweets
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(container);
      }
    })
    .catch(error => console.error('Error loading tweets:', error));
});
