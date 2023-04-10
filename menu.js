const SERVER_ADDRESS = 'http://127.0.0.1:5000';
const token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);

fetch(SERVER_ADDRESS + '/menu/getAll', {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Basic ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // Get the container for the menu items
        const menuContainer = document.querySelector('.menu-container');

        // Keep track of the number of items displayed so far
        let numItems = 0;

        // Iterate through each menu item and display it on the page
        data.forEach(item => {
            // Create HTML elements to display the menu item info
            const menuItem = document.createElement('div');
            menuItem.setAttribute("class","menu-member hover-effect")
            const menuImage = document.createElement('img');
            const menuContent = document.createElement('div');
            menuContent.setAttribute("class", "content")
            const itemName = document.createElement('h4');
            itemName.setAttribute("class","h5")
            const itemDescription = document.createElement('p');
            itemDescription.setAttribute("class","simple-text h5")

            // Set the content for the HTML elements
            // menuImage.src = `data:${item.mimetype};base64,${btoa(item.img)}`;
            // menuImage.src = `${SERVER_ADDRESS}/image/${item.id}`;
            // console.log(item.id);
            itemName.textContent = item.name;
            itemDescription.textContent = item.description;

            // Fetch the image data and encode it
            fetch(SERVER_ADDRESS + `/image/${item.id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Basic ${token}`
                }
            })
                .then(response => response.json())
                .then(imageData => {
                    // Set the source of the image element to the encoded image data
                    // console.log(imageData.mimetype);
                    // console.log(imageData.img);
                    // menuImage.src = `data:${imageData.mimetype};base64,${imageData.img}`;
                    menuImage.src = `/images/${imageData.name}`;
                    console.log(menuImage.src);

                })
                .catch(error => {
                    console.error(`Error fetching image data for menu item '${item.name}':`, error);
                });

            // Append the HTML elements to the DOM
            menuItem.appendChild(menuImage);
            menuContent.appendChild(itemName);
            menuContent.appendChild(itemDescription);
            menuItem.appendChild(menuContent);

            // Add the menu item to the appropriate grid
            if ((numItems + 1) % 4 === 1) {
                const gridIndex = Math.floor(numItems / 4);
                let grid = document.querySelector(`.four-col-grid:nth-of-type(${gridIndex + 1})`);
                if (!grid) {
                    grid = document.createElement('div');
                    grid.classList.add('four-col-grid');
                    document.querySelector('.menu-container').appendChild(grid);
                }
                grid.appendChild(menuItem);
            } else {
                document.querySelector('.four-col-grid:last-of-type').appendChild(menuItem);
            }
            // const gridIndex = Math.floor(numItems / 4);
            // let grid = document.querySelector(`.four-col-grid:nth-of-type(${gridIndex + 1})`);
            // if (!grid) {
            //     // const fourColGrid = document.createElement('div');
            //     // fourColGrid.setAttribute('class', 'four-col-grid');
            //     // document.querySelector('.menu-container').appendChild(fourColGrid);
            //     // grid = fourColGrid; // Update the grid reference
            //
            //     // (numItems + 1) % 4 === 1
            //     grid = document.createElement('div');
            //     grid.setAttribute("class", "four-col-grid");
            //     menuContainer.appendChild(grid);
            // }
            // grid.appendChild(menuItem);

            // Increment the number of items displayed so far
            numItems++;
            console.log(numItems);
        });
    })
    .catch(error => {
        console.error('Error fetching menu items:', error);
    });


// const SERVER_ADDRESS = 'http://127.0.0.1:5000';
//
// const form = document.getElementById("add-item-form");
// const token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
//
//
// fetch(SERVER_ADDRESS + '/menu/getAll', {
//     method: "GET",
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         'Authorization': `Basic ${token}`
//     }
// })
//     .then(response => response.json())
//     .then(data => {
//         // Iterate through each menu item and display it on the page
//         data.forEach(item => {
//             // Create HTML elements to display the menu item info
//             const menuItem = document.createElement('div');
//             menuItem.setAttribute("class","menu-member hover-effect")
//             const menuImage = document.createElement('img');
//             const menuContent = document.createElement('div');
//             menuContent.setAttribute("class", "content")
//             const itemName = document.createElement('h4');
//             itemName.setAttribute("class","h5")
//             const itemDescription = document.createElement('p');
//             itemDescription.setAttribute("class","simple-text h5")
//
//             // Set the content for the HTML elements
//             menuImage.src = item.img;
//             itemName.textContent = item.name;
//             itemDescription.textContent = item.description;
//
//             // Append the HTML elements to the DOM
//             menuContent.appendChild(itemName);
//             menuContent.appendChild(itemDescription);
//             menuItem.appendChild(menuImage);
//             menuItem.appendChild(menuContent);
//             document.querySelector('.menu-container').appendChild(menuItem);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching menu items:', error);
//     });
