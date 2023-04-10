const SERVER_ADDRESS = 'http://127.0.0.1:5000';
const form = document.getElementById("add-item-form");
const token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);

function uploadPicture(menuId) {
    const fileInput = document.getElementById('picture_data');
    const file = fileInput.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append('picture_data', file);
    formData.append('menu_id', menuId);

    fetch(SERVER_ADDRESS + '/upload', {
        method: 'POST',
        body: formData,
        headers: {
            // "Content-type": "application/json; charset=UTF-8",
            // "Access-Control-Allow-Origin": '*',
            // 'Access-Control-Allow-Credentials': 'true',
            'Authorization': `Basic ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Image uploaded successfully');
            } else {
                console.error('Failed to upload image');
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
}

function getIngredients() {
    const ingredients = [];
    const ingredientElements = document.querySelectorAll(".ingredient");

    ingredientElements.forEach((ingredientElement) => {
        const nameInput = ingredientElement.querySelector("input[name='ingredient-name[]']");
        const weightInput = ingredientElement.querySelector("input[name='ingredient-weight[]']");

        ingredients.push({
            product_name: nameInput.value,
            weight: weightInput.value,
        });
    });

    return ingredients;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const weight = document.getElementById("weight").value;
    const percent = document.getElementById("percent").value;
    const availability = document.getElementById("availability").value;

    const ingredients = getIngredients();

    console.log(ingredients);
    // console.log(localStorage.getItem('email'));
    // console.log(localStorage.getItem('password'));
    // console.log(token)

    const data = {
        "name": name,
        "description": description,
        "price": price,
        "weight": weight,
        "percent": percent,
        "availability": availability,
        "ingredients": ingredients
    };

    fetch(SERVER_ADDRESS + "/menu", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Basic ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            alert('Item added successfully!');
            // createUploadPhotoInputBox();
            // pic.menu_id = json.id;
            uploadPicture(json.id);
            form.reset();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});

// function createUploadPhotoInputBox() {
//     const uploadForm = document.createElement("form");
//     uploadForm.action = SERVER_ADDRESS + "/upload";
//     uploadForm.enctype = "multipart/form-data";
//     uploadForm.method = "POST";
//
//     uploadForm.setAttribute("class", "upload-photo input-box");
//     const fileInput = document.createElement("input");
//     fileInput.setAttribute("type", "file");
//     fileInput.setAttribute("name", "picture_data");
//
//     const submitInput = document.createElement("input");
//     submitInput.setAttribute("type", "submit");
//     submitInput.setAttribute("class", "primary-btn secondary-btn")
//     submitInput.innerHTML = "Upload image";
//
//     form.appendChild(fileInput);
//     form.appendChild(submitInput);
//
//     document.body.appendChild(uploadForm);
// }
