async function editPost(event) {
    event.preventDefault();
  
    const postTitle = document.querySelector('input[name="post-postTitle"]').value;
    const postContent = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(res.statusText);
      }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editPost);