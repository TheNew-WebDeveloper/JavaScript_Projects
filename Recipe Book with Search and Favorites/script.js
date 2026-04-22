let addBtn = document.querySelector("#add-btn");
let recipeName = document.querySelector("#recipe-name");
let ingredients = document.querySelector("#ingredients");
let steps = document.querySelector("#steps");
let search = document.querySelector("#search");

let recipeList = document.querySelector("#recipe-list");
let favoriteList = document.querySelector("#fav-list");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let favRecipes = JSON.parse(localStorage.getItem("favRecipes")) || [];

recipeUI(recipes);
favoriteUI(favRecipes);

addBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (!recipeName.value || !ingredients.value || !steps.value) {
        alert("Please fill all fields!");
        return;
    }

    let newRecipe = {
        id : Date.now(),
        name : recipeName.value,
        ingredients : ingredients.value,
        steps : steps.value,
        favorite : false
    }

    recipes.push(newRecipe);
    save(recipes, favRecipes);
    recipeUI(recipes);

    recipeName.value = "";
    ingredients.value = "";
    steps.value = "";
})

function save(data, fav) {
    localStorage.setItem("recipes", JSON.stringify(data));
    localStorage.setItem("favRecipes", JSON.stringify(fav));
}

function recipeUI(data) {
    recipeList.innerHTML = "";

    data.forEach(recipe => {

        let div = document.createElement("div");
        div.classList.add("card");

        let ingrdList = recipe.ingredients.split(",");
        
        div.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>📝 Ingredients:</strong></p>
            <ol>${ingrdList.map(ingrd => `<li>${ingrd}</li>`).join("")}</ol>
            <div class="btns">
            ${recipe.favorite 
                ? `<button class="fav-btn dis-btn" onclick="updateFavorite(${recipe.id})">Like 👍</button>`
                : `<button class="fav-btn" onclick="updateFavorite(${recipe.id})">Like 👍</button>`
            }
            <button class="fav-btn edit-btn" onclick="editRecipe(${recipe.id})">Edit ✍️</button>
            <button class="del-btn" onclick="deleteRecipe(${recipe.id})">Delete 🚮</button></div>
        `;
        
        recipeList.appendChild(div);
    })
}

function favoriteUI(data) {
    favoriteList.innerHTML = "";

    data.forEach(recipe => {

        let div = document.createElement("div");
        div.classList.add("card");

        let ingrdList = recipe.ingredients.split(",");

        div.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>📝 Ingredients:</strong></p>
        <ol>${ingrdList.map(ingrd => `<li>${ingrd}</li>`).join("")}</ol>
        <button class="fav-btn" onclick="updateFavorite(${recipe.id})">👎 Dislike</button>
        `

        favoriteList.appendChild(div);
    })
}

function updateFavorite(id) {

    recipes = recipes.map(recipe => {
        if(recipe.id === id) {
            recipe.favorite = !recipe.favorite;
        }
        return recipe;
    })

    favRecipes = recipes.filter(recipe => recipe.favorite);
    
    save(recipes, favRecipes);

    recipeUI(recipes);
    favoriteUI(favRecipes);
}

function editRecipe(id) {
    window.alert("Please remember to save your recipe after making any changes")
    recipes.forEach(recipe => {
        if(recipe.id === id) {
            recipeName.value = recipe.name;
            ingredients.value = recipe.ingredients;
            steps.value = recipe.steps;
        }
    })
    deleteRecipe(id);
}

function deleteRecipe(id) {
    recipes = recipes.filter(recipe => recipe.id !== id);
    favRecipes = favRecipes.filter(recipe => recipe.id !== id);

    console.log(recipes, favRecipes);
    
    save(recipes, favRecipes);

    recipeUI(recipes);
    favoriteUI(favRecipes);
}

search.addEventListener("input", function() {
    console.log(search.value);
    searchRecipe(search.value);
});

function searchRecipe(val) {
    val = val.toLowerCase();

    let searchedRecipe = recipes.filter(recipe => {
        if(recipe.name.toLowerCase().includes(val) || recipe.ingredients.toLowerCase().includes(val)) return recipe;
    });

    recipeUI(searchedRecipe);
}