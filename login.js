const SERVER_ADDRESS = 'http://127.0.0.1:5000';

const form = document.getElementById("login-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        "email": email,
        "password": password
    };

    fetch(SERVER_ADDRESS + "/user/login", {
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
            // console.log("Added email to storage")
            localStorage.setItem("password", password);
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("id", data.id);
            // Redirect the user to the appropriate page based on their role
            if (data.role === "client") {
                window.location.href = "index.html";
            } else if (data.role === "manager") {
                window.location.href = "admin.html";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Login failed.");
        });
});

// const SERVER_ADDRESS = 'http://127.0.0.1:5000';
//
// const loginForm = document.getElementById("login-form");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const loginBtn = document.getElementById("login-btn");
//
// loginForm.addEventListener("submit", (event) => {
//     event.preventDefault(); // prevent the form from submitting normally
//
//     const email = emailInput.value;
//     const password = passwordInput.value;
//
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", SERVER_ADDRESS + "/user/login");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.onload = () => {
//         if (xhr.status === 201) {
//             const response = JSON.parse(xhr.responseText);
//             console.log(response);
//             // Get the user role from the response
//             const userRole = response.role;
//             // Redirect the user to the appropriate page based on their role
//             if (userRole === "client") {
//                 window.location.href = "index.html";
//             } else if (userRole === "manager") {
//                 window.location.href = "admin.html";
//             }
//         } else {
//             console.log("Login failed");
//         }
//     };
//     const data = JSON.stringify({ email, password });
//     xhr.send(data);
// });




// // import config from './config.js';
//
// const SERVER_ADDRESS = 'http://127.0.0.1:5000';
//
// const form = document.getElementById("login-form");
// form.addEventListener("submit", function(event) {
//     event.preventDefault();
//
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//
//     const data = {
//         "email": email,
//         "password": password
//     };
//
//     fetch(SERVER_ADDRESS + "/user/login", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             alert("Login successful!");
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             alert("Login failed.");
//         });
// });