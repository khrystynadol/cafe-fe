const addIngredientBtn = document.getElementById("add-ingredient");
const ingredientList = document.getElementById("ingredient-list");

function createInputBox(name, placeholder) {
    const div = document.createElement("div");
    div.setAttribute("class", "input-box");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("class", "input-field full-width no-border");
    label.appendChild(input);
    div.appendChild(label);
    return div;
}

addIngredientBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const newIngredient = document.createElement("div");
    // newIngredient.classList.add("ingredient");
    newIngredient.setAttribute("class", "ingredient")


    const ingredientNameDiv = createInputBox("ingredient-name[]", "Enter name");
    const ingredientWeightDiv = createInputBox("ingredient-weight[]", "Enter weight");

    newIngredient.appendChild(ingredientNameDiv);
    newIngredient.appendChild(ingredientWeightDiv);

    const removeIngredientBtn = document.createElement("button");
    removeIngredientBtn.setAttribute("type", "button");
    // removeIngredientBtn.classList.add("primary-btn secondary-btn");
    removeIngredientBtn.setAttribute("class", "primary-btn secondary-btn")
    removeIngredientBtn.innerHTML = "-";
    removeIngredientBtn.addEventListener("click", function() {
        ingredientList.removeChild(newIngredient);
    });
    newIngredient.appendChild(removeIngredientBtn);

    ingredientList.appendChild(newIngredient);

});