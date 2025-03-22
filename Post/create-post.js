document.getElementById('create-post-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body, userId: 1 })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Post created:', data);
      alert('Post successfully created!');
      window.location.href = 'index.html';
  })
  .catch(error => console.error('Error creating post:', error));
});
