async function commentsForm(event) {
    event.preventDefault();
    console.log(event)
    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const postId = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (commentText) {
        const res = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            postId,
            commentText
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (res.ok) {
          document.location.reload();
        } else {
          alert(res.statusText);
        }
      }
  }

  
  
  var el = document.querySelector('.comment-form');
if(el){
  el.addEventListener('submit', commentsForm, false);
}