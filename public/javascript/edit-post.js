async function editNewPost(event) {
    event.preventDefault();
  
    const post_text = document.querySelector('textarea[name="post-text"]').value;
    const title = document.querySelector('input[name="post-title"]').value;
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/replies/${event.target.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    

    if (response.ok) {
        location.reload();
      } else {
        alert('Failed to delete.');
      }
    };
    




    ocument .querySelector(".edit-post-form").addEventListener("submit", editNewPost);
