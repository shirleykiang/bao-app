'use strict';

// let MOCK_RECIPES = {
//     "recipes": [
//         {
//             "id": 00000000000,
//             "name": "Beef Noodle Soup",
//             "type": "Food",
//             "ingredients": ["1.5 lbs cubed beef shank", "3 tomatoes", "2 onions", "1 starnise", "2 cloves garlic", "1 jar spicy bean sauce", "1/2 bunch cilantro", "1/2 cup soy sauce"],
//             "servings": 6-8,
//             "directions": ["1. Do this", "2. Do that"],
//             "author": "shirleykiang",
//             "image": "imageurl"
//         },
//         {
//             "id": 00000000000,
//             "name": "Aiyu Jelly",
//             "type": "Dessert",
//             "ingredients": ["1 can aiyu jelly", "5 lemons", "4 cups water", "1 cup honey"],
//             "servings": 5-6,
//             "directions": ["1. Do this", "2. Do that"],
//             "author": "shirleykiang",
//             "image": "imageurl"
//         },
//         {
//             "id": 00000000000,
//             "name": "Zha Jiang Mian",
//             "type": "Food",
//             "ingredients": ["1.5 lbs ground pork", "1 can sweet bean sauce", "1 onion, diced", "1/2 large carrot, diced", "1 pack bean curd, diced (larger than carrot and onion dices)", "1 tbsp dou ban jiang", "1/2 cup chopped cucumbers"],
//             "servings": 4-5,
//             "directions": ["1. Do this", "2. Do that"],
//             "author": "shirleykiang",
//             "image": "imageurl"
//         },
//         {
//             "id": 00000000000,
//             "name": "Coconut Mochi Cake",
//             "type": "Dessert",
//             "ingredients": ["1 box mochi flour", "1 cup sugar", "1/4 tsp salt", "2 cans coconut milk", "3 eggs", "1 tbsp baking powder", "1 pack coconut flakes"],
//             "servings": 10-12,
//             "directions": ["1. Do this", "2. Do that"],
//             "author": "shirleykiang",
//             "image": "imageurl"
//         },
//         {
//             "id": 00000000000,
//             "name": "Pork Spare Ribs",
//             "type": "Food",
//             "ingredients": ["2 lbs pork spareribs", "3 shallots", "2 tbsp spare rib sauce", "1/2 cup sugar"],
//             "servings": 3-4,
//             "directions": ["1. Do this", "2. Do that"],
//             "author": "shirleykiang",
//             "image": "imageurl"
//         },
//     ]
// }

// let MOCK_USERS = {
//     "users": [
//         {
//             "id": 00000000000,
//             "username": "shirleykiang",
//             "password": "secretpassword",
//             "expiration": "expirationdate",
//             "notes": [
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }, 
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }, 
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }
//             ]
//         }, 
//         {
//             "id": 00000000000,
//             "username": "hanapark",
//             "password": "secretpassword",
//             "expiration": "expirationdate",
//             "notes": [
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }, 
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }, 
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }
//             ]
//         }, 
//         {
//             "id": 00000000000,
//             "username": "janicekim",
//             "password": "secretpassword",
//             "expiration": "expirationdate",
//             "notes": [
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }, 
//                 {
//                     "id": 00000000000,
//                     "dish": 00000000000,
//                     "content": "Made this on 5/20, add spicy bean sauce gradually"
//                 }
//             ]
//         }
//     ]
// }



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
    for (index in data.recipes) {
        $("recipes-index").append(
            `<img alt="${data.recipes[index].name.text} src="${data.recipes[index].image}">`
        )
    }
}

function generateUsername() {
    // do something
}

function generateNotes() {
    // do something
}


// HELPER FUNCTIONS
function getUser() {
    setTimeout(function() {
        callbackFn(MOCK_USERS)
    }, 1);
}

function getRecipeFromClick() {
    setTimeout(function() {
        callbackFn(MOCK_RECIPES)
    }, 1);
}

function getRecipes(callbackFn) {
    setTimeout(function() {
        callbackFn(MOCK_RECIPES)
    }, 1);
}

function getNotes() {
    setTimeout(function() {
        callbackFn(MOCK_USERS)
    }, 1);
}

// EVENT LISTENERS AND HANDLERS

function handleDisplayRecipes() {
    getRecipes(generateRecipes);
}

function handleDisplayNotes() {
    getNotes(generateNotes);
}

function handleDisplayUser() {
    getUser(generateUsername);
}


// write a function for when user clicks on log in button, lead to
// login page
function handleLoginClick() {
 

    $(".nav-item-login").on("click", function() {
        console.log('clicking login button');
        $("body").html(`

        <div class="session-page">
        <a class="session-home-link">
            <img src="" alt="bao-logo">
        </a>
        <div class="form-div">
            <form class="session-form">
                <fieldset>
                <legend class="form-title">Login to Bao</legend>
                <div class="login-form">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="peterparker" class="js-username-entry" value >

                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="password" class="js-password-entry" value >
                    
                    <button type="submit" class="login-button">Sign Up</button>
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

    // toggle form-title
    $("body").on("click", ".switch-form-button", function() {
        // console.log('switch button getting clicked');
        // console.log($(".switch-form-button").text());
        $(".switch-form-button").text($(".switch-form-button").text() == 'New to Bao? Signup instead' ? 'Have an account? Login' : 'New to Bao? Signup instead');
    });

    // toggle login-button
    $("body").on("click", ".switch-form-button", function() {
        // console.log('switch button getting clicked');
        // console.log($(".switch-form-button").text());
        $(".switch-form-button").text($(".switch-form-button").text() == 'New to Bao? Signup instead' ? 'Have an account? Login' : 'New to Bao? Signup instead');
    });

     // toggle switch-form-button
    $("body").on("click", ".switch-form-button", function() {
    // console.log('switch button getting clicked');
    // console.log($(".switch-form-button").text());
    $(".switch-form-button").text($(".switch-form-button").text() == 'New to Bao? Signup instead' ? 'Have an account? Login' : 'New to Bao? Signup instead');
 });
}

function handleLoginSubmit() {
    $("form").on("submit", function(event) {
        console.log("am iw roking");
        event.preventDefault();
    })
}

function handleSignupSubmit() {
    // do something
}




function handleRecipeClick() {
    // do something
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

function handleHomeClick() {
    // do something
}


function bindEventListeners() {
    console.log('page has loaded');
    handleFormToggle();
    handleLoginClick();
    //generateRecipes();
    //handleDisplayRecipes();
    //getRecipes();
    // display all recipe data
    // run all the functions from above
}


$(bindEventListeners);