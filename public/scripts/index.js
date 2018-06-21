'use strict';

let MOCK_RECIPES = {
    "recipes": [
        {
            "id": 1111111,
            "name": "Beef Noodle Soup",
            "category": "Food",
            "ingredients": ["1.5 lbs cubed beef shank", "3 tomatoes", "2 onions", "1 starnise", "2 cloves garlic", "1 jar spicy bean sauce", "1/2 bunch cilantro", "1/2 cup soy sauce"],
            "servings": 6-8,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang",
            "image": "http://res.cloudinary.com/shirleykiang/image/upload/v1529516949/beef-noodle-soup.jpg"
        },
        {
            "id": 1111111,
            "name": "Aiyu Jelly",
            "category": "Dessert",
            "ingredients": ["1 can aiyu jelly", "5 lemons", "4 cups water", "1 cup honey"],
            "servings": 5-6,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang",
            "image": "http://res.cloudinary.com/shirleykiang/image/upload/v1529516949/beef-noodle-soup.jpg"
        },
        {
            "id": 1111111,
            "name": "Zha Jiang Mian",
            "category": "Food",
            "ingredients": ["1.5 lbs ground pork", "1 can sweet bean sauce", "1 onion, diced", "1/2 large carrot, diced", "1 pack bean curd, diced (larger than carrot and onion dices)", "1 tbsp dou ban jiang", "1/2 cup chopped cucumbers"],
            "servings": 4-5,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang",
            "image": "http://res.cloudinary.com/shirleykiang/image/upload/v1529516949/beef-noodle-soup.jpg"
        },
        {
            "id": 1111111,
            "name": "Coconut Mochi Cake",
            "category": "Dessert",
            "ingredients": ["1 box mochi flour", "1 cup sugar", "1/4 tsp salt", "2 cans coconut milk", "3 eggs", "1 tbsp baking powder", "1 pack coconut flakes"],
            "servings": 10-12,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang",
            "image": "http://res.cloudinary.com/shirleykiang/image/upload/v1529516949/beef-noodle-soup.jpg"
        },
        {
            "id": 1111111,
            "name": "Pork Spare Ribs",
            "type": "Food",
            "ingredients": ["2 lbs pork spareribs", "3 shallots", "2 tbsp spare rib sauce", "1/2 cup sugar"],
            "servings": 3-4,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang",
            "image": "http://res.cloudinary.com/shirleykiang/image/upload/v1529516949/beef-noodle-soup.jpg"
        },
    ]
}

let MOCK_USERS = {
    "users": [
        {
            "id": 1111112,
            "username": "currentshirleykiang",
            "password": "secretpassword",
            "expiration": "expirationdate",
            "notes": [
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/29, add spicy bean sauce gradually"
                }
            ]
        }, 
        {
            "id": 1111111,
            "username": "hanapark",
            "password": "secretpassword",
            "expiration": "expirationdate",
            "notes": [
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }
            ]
        }, 
        {
            "id": 1111111,
            "username": "janicekim",
            "password": "secretpassword",
            "expiration": "expirationdate",
            "notes": [
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111111,
                    "dish": 1111111,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }
            ]
        }
    ]
}

// function to redirect create a recipe button to login if user not logged in yet 

// write a function for when user clicks on a recipe image,
// leads them to recipe page 
// and loads user's notes if logged in

// write a function for when user clicks on add note button,
// opens up note to write 

// write a function for when user clicks on submit note button,
// adds the note to the user database 

// write a function for when user clicks on 'create a recipe'
// button, leads to recipe form page 

// write a function for when user clicks submit recipe 
// form, update recipe db, lead back to home page

// write a function for when user clicks on logo
// lead back to home page 


// GENERATE HTML FUNCTIONS
function generateRecipes(data) {
    console.log('generateRecipes running');
    console.log(`this is data.recipes[0].name: ${data.recipes[0].name}`);
    for (let i=0; i<data.recipes.length; i++) {
        $(".recipes-index").append(
            `<span>${data.recipes[i].name}</span><br>
            <img alt="${data.recipes[i].name}" src="${data.recipes[i].image}" class="recipe-image" index="${i}" style="width: 200px; height: 200px;">
            <br>`
        )};
}

function generateUsername() {
    // do something
}

function generateNotes(data) {
    const currentUserIndex = data.users.findIndex( user => user.id === store.id);
    const currentUserNotes = data.users[currentUserIndex].notes
    console.log(`this is the current user: ${data.users[currentUserIndex].username}`);
    if (currentUserNotes) {
        for (let i=0; i<currentUserNotes.length; i++) {
            if (currentUserNotes[i].id === store.currentDish) {
                $(".notes-contents").append(`
                <div index="${i}">${currentUserNotes[i].content}</div>
                `
                )};
    }
    }
}


// HELPER FUNCTIONS
function getUser() {
    setTimeout(function() {
        callbackFn(MOCK_USERS)
    }, 1);
}

function getRecipes(callbackFn) {
    console.log('getRecipes ran');
    console.log(`This is the db: ${MOCK_RECIPES}`);
    setTimeout(function() {
        callbackFn(MOCK_RECIPES)
    }, 1);
}

function getRecipeIndexFromClick(target) {
    console.log('getRecipeFromClick ran');
    //console.log(`this is the index: ${target.attr("index")}`);
    return target.attr("index");
}

function getNotes(callbackFn) {
    setTimeout(function() {
        callbackFn(MOCK_USERS)
    }, 1);
}

// EVENT LISTENERS AND HANDLERS

function handleRecipeClick() {
    console.log('handlerRecipeClick ran');

    $(".recipes-index").on("click", ".recipe-image", function(event) {
        console.log('clicked on recipe-image');
        let recipe_index = getRecipeIndexFromClick($(event.target));
        console.log(`this is the index: ${recipe_index}`);
        let recipe_object = MOCK_RECIPES.recipes[recipe_index];
        store.currentDish = recipe_object.id;
        //console.log(`this is the id of the currentdish: ${store.currentDish}`);
        $('main').html(`
            <div class="recipe-page">
                <div class="recipe-page-title">
                <h1 class="recipe-title">${recipe_object.name}</h1>
                </div>
                <div class="recipe-page-author">
                <h2 class="recipe-author">${recipe_object.author}</h2>
                </div>
                <br>
                <span class="recipe-page-category">
                ${recipe_object.category}
                </span>
                <br>
                <img src="${recipe_object.image}" alt="${recipe_object.name}" style="width:200px; height:200px;">
                <div class="recipe-page-ingredients">
                ${recipe_object.ingredients}
                </div>
                <div class="recipe-page-directions">
                ${recipe_object.directions}</div>
                <div class="recipe-page-notes">
                </div>
            </div>
    `);
        handleDisplayNotes();
    });
}



function handleDisplayRecipes() {
    console.log('handleDisplayRecipes ran')
    getRecipes(generateRecipes);
}

function handleDisplayNotes() {
    //if user is logged in
    if (store.authToken) {
        $(".recipe-page-notes").append('<div class="notes-header"><h3>Notes</h3></div><div class="notes-contents"></div><div class="add-note-section><button class="add-note-button"></div>');
        getNotes(generateNotes);
    }
}


// write a function for when user clicks on log in button, lead to
// login page
function handleLoginClick() {
 
    $(".nav-item-login").on("click", function() {
        console.log('clicking login button');
        $("body").html(`

        <div class="session-page">
        <a href="javascript:window.location.reload(true)" class="session-home-link">
            <img src="" alt="bao-logo" class="session-home-link">
        </a>
        <div class="form-div">
            <form id="session-form">
                <fieldset>
                <legend class="form-title">Login to Bao</legend>
                <div class="login-form">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="peterparker" class="js-username-entry" value >

                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="password" class="js-password-entry" value >
                    
                    <button type="submit" form="session-form" class="login-button">Log In</button>
                </div>
                </fieldset>
                <div class="session-foot">
                    <div>
                    <span>
                        <span class="switch-form-button">New to Bao? Signup instead</span>
                    </span>
                    </div>
                </div>
            </form>
        </div>
        </div>
        `)
    })
}

function handleFormToggle() {
    //console.log('handleFormToggle ran');


    $("body").on("click", ".switch-form-button", function() {
    // console.log('switch button getting clicked');
    // console.log($(".switch-form-button").text());

    // toggle form-title
    $(".form-title").text($(".form-title").text() == 'Login to Bao' ? 'Create an Account' : 'Login to Bao');

    // toggle login-button
    $(".login-button").text($(".login-button").text() == 'Log In' ? 'Sign Up' : 'Log In');

     // toggle switch-form-button
    $(".switch-form-button").text($(".switch-form-button").text() == 'New to Bao? Signup instead' ? 'Have an account? Login' : 'New to Bao? Signup instead');
    

});
}

function handleLoginSubmit() {
    // $("body").on("submit", ".login-button", function() {
    //     console.log("handleloginsubmit ran");
    //     event.preventDefault();
    // })
}

function handleSignupSubmit() {
    // do something
}

function handleCreateRecipe() {
    $(".nav-item-create").on("click", function() {
        $("main").html(`
            <div class="recipe-form-page">
                <div class="recipe-form-contents">
                    <div class="recipe-form-head">
                        <h1>New Recipe</h1>
                    </div>
                </div>
                <form id="recipe-form">

                    <label for="recipe-name">Dish Name</label>
                    <input type="text" id="recipe-name" placeholder="Beef Noodle Soup" class="recipe-name" value required>
                
                    <label for="recipe-category">Category</label>
                    <select id="recipe-category" class="recipe-category" value required>
                        <option value="Food">Food</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                    <label for="recipe-servings">Servings</label>
                    <input type="text" id="recipe-servings" placeholder="5" class="recipe-servings" value required>

                    <label for="recipe-ingredients">Ingredients</label>
                    <input type="text" id="recipe-ingredients" placeholder="Beef, Noodle, Soup" class="recipe-ingredients" value required>
                    
                    <label for="recipe-directions">Directions</label>
                    <input type="text" id="recipe-directions" placeholder="Mix, eat, enjoy" class="recipe-directions" value required>
                    
                    <label for="recipe-image">Image</label>
                    <div class="recipe-image" id="dropzone" style="width: 200px; height: 200px; border-width: 2px; border-color: rgb(102, 102, 102); border-style: dashed; border-radius: 5px;">
                        <p>Drop an image or click to select a file to upload</p>
                        
                        <input type="file" accept="image/*" style="display: none;">
                    </div>
                    <button type="submit" form="recipe-form" class="submit-recipe-form">CREATE</button>
                </form>
            </div>

        `)
    });
    handleRecipeSubmit();
}

// QUESTION how to target form element
function handleRecipeSubmit(callbackFn) {
    console.log('handleRecipeSubmit running');
    $("main").on("submit", "form", function(event) {
        event.preventDefault();
        console.log('submitted a new recipe');
        //console.log(`event current target name input: ${$(event.currentTarget).find(".recipe-name").val()}`);
        const recipeForm = $(event.currentTarget);
        const newRecipe = {
            name: recipeForm.find(".recipe-name").val(),
            category: recipeForm.find(".recipe-category").val(),
            image: recipeForm.find(".recipe-image").val(),
            ingredients: recipeForm.find(".recipe-ingredients").val(),
            servings: recipeForm.find(".recipe-servings").val(),
            directions: recipeForm.find(".recipe-directions").val(),
            //author: recipeForm.find(".recipe-author").val()
        };

        console.log(newRecipe);

        //post newRecipe to db
        //setTimeout(function(newRecipe) {callbackFn(newRecipe, MOCK_RECIPES)});
    });
}

function handleAddNoteClick() {
    // do something
}

function handleEditNoteClick() {
    // do something
}

function handleDeleteNoteClick() {
    // do something
}

function bindEventListeners() {
    console.log('page has loaded');
    handleFormToggle();
    handleLoginClick();
    handleRecipeClick();
    handleDisplayRecipes();
    handleCreateRecipe();

    // run all the functions from above
}


$(bindEventListeners);