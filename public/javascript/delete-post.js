async function deleteNewPost(event) {
    event.preventDefault();
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    if (response.ok) {
        location.reload();
      } else {
        alert('Failed to delete.');
      }
    };
    
    document.querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
