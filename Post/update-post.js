const URL = 'https://jsonplaceholder.typicode.com/posts';

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
console.log(params, postId);

const form = document.getElementById('update-post-form');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');

const messageBox = document.createElement('div');
messageBox.id = 'message-box';
form.parentElement.insertBefore(messageBox, form);

// Create Post button on top (also for index.html equivalent)
const topCreatePostButton = document.createElement('button');
topCreatePostButton.textContent = 'Create New Post';
topCreatePostButton.className = 'button button--primary';
topCreatePostButton.addEventListener('click', () => {
  window.location.href = 'create-post.html';
});
form.parentElement.insertBefore(topCreatePostButton, form);

// Back to Home button
const backButton = document.createElement('button');
backButton.textContent = 'Back to Home';
backButton.className = 'button button--secondary';
backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});
form.parentElement.appendChild(backButton);

// Fetch the post and prefill the form
fetch(`${URL}/${postId}`)
  .then((response) => response.json())
  .then((post) => {
    titleInput.value = post.title;
    bodyInput.value = post.body;
  })
  .catch((error) => {
    console.error('Error fetching post:', error);
    showMessage('Failed to load post data.', 'error');
  });

// Form submission handler
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const updatedTitle = titleInput.value.trim();
  const updatedBody = bodyInput.value.trim();

  if (!updatedTitle || !updatedBody) {
    showMessage('Please fill in both title and content fields.', 'error');
    return;
  }

  fetch(`${URL}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: postId, title: updatedTitle, body: updatedBody, userId: 1 }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Post updated:', data);
      showMessage('Post successfully updated!', 'success');
    })
    .catch((error) => {
      console.error('Error updating post:', error);
      showMessage('Something went wrong. Please try again.', 'error');
    });
});

function showMessage(message, type) {
  messageBox.textContent = message;
  messageBox.className = type === 'success' ? 'message-success' : 'message-error';
}
