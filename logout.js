form.addEventListener("reset", function(event) {
    event.preventDefault();

    localStorage.removeItem('email');
    localStorage.removeItem('password');

    // Redirect to index.html
    window.location.href = 'index.html';
})
