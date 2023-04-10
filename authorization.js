const SERVER_ADDRESS = 'http://127.0.0.1:5000';

const email = localStorage.getItem('email');
const password = localStorage.getItem('password');

const token = btoa(`${email}:${password}`);

fetch(`${SERVER_ADDRESS}/`, {
    headers: {
        'Authorization': `Basic ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Do something with the response data
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Authorization failed.");
    });
