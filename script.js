fetch('tweets.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('tweets');
    data.forEach(item => {
      const tweetDiv = document.createElement('div');
      tweetDiv.classList.add('tweet');
      tweetDiv.innerHTML = item.embed;
      container.appendChild(tweetDiv);
      document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tweetForm');
  const preview = document.getElementById('previewArea');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const embed = document.getElementById('embed').value.trim();

    // Live preview
    preview.innerHTML = `<h3>${title}</h3>${embed}`;

    // Optional: Add to clipboard (see quick copy option below)
    const tweetObject = {
      title: title,
      embed: embed
    };
    const tweetJsonString = JSON.stringify(tweetObject, null, 2);
    navigator.clipboard.writeText(tweetJsonString).then(() => {
      alert("Tweet copied to clipboard. Paste it into tweets.json on GitHub.");
    });
  });
});

    });
  });
