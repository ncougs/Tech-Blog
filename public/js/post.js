const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#postBody').value.trim();

    const request = {
        title: title,
        body: body
    };
  
    if (title && body) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  

  document
    .querySelector('#postForm')
    .addEventListener('submit', postFormHandler);
  