async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;
  
    const response = await fetch(`/api/blogs/`, {
        method: 'POST',
        body: JSON.stringify({ blog_title, blog_text, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to submit reply.');
      }
    };
  
  document
    .querySelector(".new-post-form")
    .addEventListener("submit", newFormHandler);
  