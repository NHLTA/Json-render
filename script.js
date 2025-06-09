fetch('tweets.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('tweets');
    data.forEach(item => {
      const tweetDiv = document.createElement('div');
      tweetDiv.classList.add('tweet');
      tweetDiv.innerHTML = item.embed;
      container.appendChild(tweetDiv);
    });
  });
