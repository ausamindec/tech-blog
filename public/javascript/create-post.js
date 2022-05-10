async function addNewPost(event) {
    event.preventDefault();
  
    const postTitle = document.querySelector('input[name="post-postTitle"]').value;
    const postContent = document.querySelector('input[name="post-content"]').value;
  
    const res = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (res.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(res.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', addNewPost);