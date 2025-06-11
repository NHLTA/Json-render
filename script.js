document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tweetForm');
  const preview = document.getElementById('previewArea');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const tweetUrl = document.getElementById('tweetUrl').value.trim();

    // Validate the URL format
    if (!tweetUrl.startsWith("https://twitter.com/")) {
      alert("Please enter a valid Twitter URL.");
      return;
    }

    // Build embed code from tweet URL
    const embed = `<blockquote class="twitter-tweet"><a href="${tweetUrl}"></a></blockquote>`;

    // Show live preview
    preview.innerHTML = `<h3>${title}</h3>${embed}`;

    // Copy to clipboard
    const tweetObject = {
      title: title,
      embed: embed
    };
    const tweetJsonString = JSON.stringify(tweetObject, null, 2);
    navigator.clipboard.writeText(tweetJsonString).then(() => {
      alert("Tweet JSON copied to clipboard. Paste it into tweets.json on GitHub.");
    });

    // Optional: Trigger Twitter's embed JS (if not already active)
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(preview);
    }
  });
});
