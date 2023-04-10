const SERVER_ADDRESS = 'http://127.0.0.1:5000';

const form = document.getElementById("registration-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        "name": name,
        "surname": surname,
        "phone": phone,
        "email": email,
        "password": password
    };

    fetch(SERVER_ADDRESS + "/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("id", data.id);
            window.location.href = "index.html";
            // alert("Registration successful!");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Registration failed.");
        });
});