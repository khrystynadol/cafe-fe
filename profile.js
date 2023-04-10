const SERVER_ADDRESS = 'http://127.0.0.1:5000';
const id = localStorage.getItem('id');

fetch(SERVER_ADDRESS + '/profile/' + id)
    .then(response => response.json())
    .then(data => {
        // Populate the HTML elements with the data
        document.getElementById('name').textContent = data.name;
        document.getElementById('surname').textContent = data.surname;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        // document.querySelector('.h5.birthdate').textContent = data.birthdate;
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
    });