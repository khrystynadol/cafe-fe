const deleteUserBtn = document.getElementById("delete-user-btn");

deleteUserBtn.addEventListener("click", (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (confirmDelete) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/user/delete/" + userId); // replace userId with the ID of the user to delete
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                // redirect to main page after successful deletion
                window.location.href = "/";
            } else if (xhr.status === 403) {
                console.log("Access denied");
                // display an error message to the user
                const errorDiv = document.getElementById("error-message");
                errorDiv.textContent = "Access denied";
                errorDiv.style.display = "block";
            } else {
                console.log("Deletion failed");
                // display an error message to the user
                const errorDiv = document.getElementById("error-message");
                errorDiv.textContent = "Deletion failed";
                errorDiv.style.display = "block";
            }
        };
        xhr.send();
    }
});
