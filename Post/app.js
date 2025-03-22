const URL = 'https://jsonplaceholder.typicode.com/posts';

document.getElementById('fetch-posts').addEventListener('click', getPosts);

document.getElementById('create-post').addEventListener('click', () => {
  window.location.href = './create-post.html';
});

function getPosts() {
  console.log('Getting posts');
  fetch(URL)
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = ''; // Önceki verileri temizle
      
      posts.forEach((post) => {
        const liItem = document.createElement('li');
        liItem.classList.add('post');
        
        const postTitle = document.createElement('h2');
        postTitle.classList.add('post-title');
        postTitle.textContent = post.title;
        
        const pItem = document.createElement('p');
        pItem.classList.add('post-body');
        pItem.textContent = post.body;

        const updatePostButton = document.createElement('a');
        updatePostButton.href = `./update-post.html?id=${post.id}`;
        updatePostButton.textContent = 'Update';
        updatePostButton.classList.add('button', 'button--success');

        const deletePostButton = document.createElement('button');
        deletePostButton.textContent = 'Delete';
        deletePostButton.addEventListener('click', () => deletePost(post.id, liItem));
        deletePostButton.classList.add('button', 'button--danger');

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        liItem.appendChild(updatePostButton);
        liItem.appendChild(deletePostButton);
        
        postsContainer.appendChild(liItem);
      });
    })
    .catch((error) => console.error('Error fetching posts:', error));
}

function deletePost(postId, element) {
  fetch(`${URL}/${postId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        element.remove(); // Postu sayfadan kaldır
      } else {
        console.error('Error deleting post');
      }
    })
    .catch((error) => console.error('Error:', error));
}

function createPost(title, body) {
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, userId: 1 }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Post created:', data);
      alert('Post successfully created!');
      window.location.href = './index.html'; // Ana sayfaya geri dön
    })
    .catch((error) => console.error('Error creating post:', error));
}

function updatePost(postId, title, body) {
  fetch(`${URL}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: postId, title, body, userId: 1 }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Post updated:', data);
      alert('Post successfully updated!');
      window.location.href = './index.html'; // Ana sayfaya geri dön
    })
    .catch((error) => console.error('Error updating post:', error));
}
