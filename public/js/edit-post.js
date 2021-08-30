const udpatePost = async (event) => {
    event.preventDefault();

    const windowLocation = window.location.pathname.split('/');

    const postID = windowLocation[windowLocation.length - 1];
  
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#postBody').value.trim();

    const request = {
        title: title,
        body: body
    };
  
    if (title && body) {
      const response = await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert(response.statusText);
      }
    }
};

const deletePost = async (event) => {
    event.preventDefault();

    const windowLocation = window.location.pathname.split('/');

    const postID = windowLocation[windowLocation.length - 1];
  
 
      const response = await fetch(`/api/post/${postID}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert(response.statusText);
      }

};
  
  
  

document
    .querySelector('#updatePost')
    .addEventListener('submit', udpatePost);
  
document
    .querySelector('#deletePost')
    .addEventListener('click', deletePost);