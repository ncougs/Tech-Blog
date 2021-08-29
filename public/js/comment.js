const commentFormHandler = async (event) => {
    event.preventDefault();


    const windowLocation = window.location.pathname.split('/');

    const postID = windowLocation[windowLocation.length - 1];

    const comment = document.querySelector('#comment').value.trim();

    const request = {
        comment_text: comment
    };
  
    if (comment) {
      const response = await fetch(`/api/comment/${postID}`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/comments/${postID}`);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  

  document
    .querySelector('#commentForm')
    .addEventListener('submit', commentFormHandler);
  