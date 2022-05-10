async function deletePost(event) {
  event.preventDefault();
    
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        postId: id
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
  
  document.querySelector('.delete-post-btn').addEventListener('click', deletePost);