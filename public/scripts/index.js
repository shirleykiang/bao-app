'use strict';


function showFailureMessage(message) {
    $(".js-error-msg").text(message).show();
    setTimeout(() => $(".js-error-msg").fadeOut("slow"), 3000);
}

function handleErrors(err) {
    showFailureMessage(err.responseJSON.message);
}
// GENERATE HTML FUNCTIONS
function generateRecipes(data) {
    for (let i=0; i<data.length; i++) {
        $(".recipes-index").append(
            `<div class="recipe-container">
            <img alt="${data[i].name}" src="${data[i].image}" class="recipe-image" index="${i}" data-id="${data[i].id}">
            <div class="recipe-hover-title">
                <span class="recipe-category">${data[i].category}</span>
                <span class="recipe-name">${data[i].name}</span>
            </div>
            </div>`
        )};
}

function generateNotes(data) {

    const currentDish = loadCurrentDish();
    
    for (let i=0; i<data.length; i++) {
        if (data[i].dishId === currentDish) {
            
            $(".recipe-page.notes").prepend(`
                <div class="note-wrapper" id="note-wrapper-${i}">
                    <div id="note-text-${i}" class="note-text" data-id="${data[i].id}" index="${i}">${data[i].content}</div>
                    <div class="note-hover-container">
                        <button class="note-editor-button" onclick="toggleNoteEditor(${i})">EDIT</button>
                        <button class="note-delete" onclick="doDeleteNote(${i})">
                        DEL
                        </button>
                        <div class="note-editor" id="note-editor-${i}"> 
                            <textarea id="ta-${i}" rows="10" cols="50" onblur="doEditNote(${i})"></textarea>
                        </div>
                    </div>
                </div>
                `)};
        }
    };

function doDeleteNote(index) {
    
    let currentText = document.getElementById(`note-text-${index}`);
    let noteId = currentText.dataset.id;
    api.remove(`/api/notes/${noteId}`);
    $(`#note-wrapper-${index}`).remove();
}

function toggleNoteEditor(index) {
    
    let currentText = document.getElementById(`note-text-${index}`);
    let editedText = document.getElementById(`ta-${index}`);
    let editorArea = document.getElementById(`note-editor-${index}`);

    let subject = currentText.innerHTML;
    editedText.value = subject;

    //currentText.style.display = 'none';
    editorArea.style.display = 'inline';
    $(".note-delete, .note-editor-button").addClass("hide");

}

function doEditNote(index) {
    
    let currentText = document.getElementById(`note-text-${index}`);
    let editedText = document.getElementById(`ta-${index}`);
    let editorArea = document.getElementById(`note-editor-${index}`);
    let noteId = currentText.dataset.id;
    let dishId = loadCurrentDish();
    let content = editedText.value;

    
  
    const updatedNote = { dishId, content };

    

    api.update(`/api/notes/${noteId}`, updatedNote); 

    var subject = editedText.value;
    currentText.innerHTML = subject;
  
    editorArea.style.display = 'none';
    $(".note-delete, .note-editor-button").removeClass("hide");
}

// HELPER FUNCTIONS

function getRecipes(callbackFn) {
    

    api.details("/api/recipes")
    .then(recipes =>
    callbackFn(recipes));
}

function getRecipeIndexFromClick(target) {
    
    
    return target.attr("index");
}

function getNotes(callbackFn) {

    

    api.details("/api/notes") 
    .then(response => {
        
        callbackFn(response);
    });
}

// EVENT LISTENERS AND HANDLERS

function handleRecipeClick() {
    
    $(".recipes-index").on("click", ".recipe-image", function(event) {
        
        let recipe_index = getRecipeIndexFromClick($(event.target));

        
        getOneRecipe(recipe_index);
        
    });
}

function getOneRecipe(recipeIndex) {
    
    api.details('api/recipes')
    .then(recipes => 
        recipes[recipeIndex])
    .then(recipe => {
        
        handleDisplayOneRecipe(recipe);
    });
}

function handleDisplayOneRecipe(recipe) {
    
    let recipe_object = recipe;
    
    clearCurrentDish();
    saveCurrentDish(recipe_object.id);
    
    $('html').css("background-color", "white");
    $('main').html(`
        <div class="recipe-page-container">
            <span class="recipe-page-heading category">
            ${recipe_object.category}
            </span>
            <h1 class="recipe-page title">${recipe_object.name}</h1>
            <div class="recipe-image-container">
                <img src="${recipe_object.image}" alt="${recipe_object.name}" class="recipe-page image">
            </div>
            <div class="recipe-page-heading servings">
                Serves
            </div>
            <div class="recipe-page servings">
                ${recipe_object.servings}
            </div>
            <div class="recipe-page-heading ingredients">
                Ingredients
            </div>
            <div class="recipe-page ingredients">
                <ul class="ingredients-list"></ul>
            </div>
            <div class="recipe-page-heading directions">
            Directions
            </div>
            <div class="recipe-page directions">
                <ol class="directions-list"></ol>
            </div>
            <div class="recipe-page-heading notes">
            </div>
            <div class="recipe-page notes">
            </div>
        </div>
    `);

    for (let i=0; i<recipe_object.ingredients.length; i++) {
        $('.ingredients-list').append(`
        <li>${recipe_object.ingredients[i]}</li>
        `);
    };

    for (let i=0; i<recipe_object.directions.length; i++) {
        $('.directions-list').append(`
        <li>${recipe_object.directions[i]}</li>
        `);
    }

    handleDisplayNotes();
}

function handleDisplayRecipes() {
    
    getRecipes(generateRecipes);
}

function handleDisplayNotes() {
    

    if (loadUsername()) {
        $(".recipe-page-heading.notes").append(`
            Notes`);
        $(".recipe-page.notes").prepend(`
                <button class="add-note-button">+</button>`);
        getNotes(generateNotes);
        handleAddNoteClick();
    }
}


function handleLoginClick() {
 
    $(".nav-item-login").on("click", function() {
        
        handleDisplayLoginPage();
    });
}

function handleDisplayLoginPage() {
    $("html").css("background-color", "black");
    $("body").html(`
        <div class="session-page">
            <a href="javascript:window.location.reload(true)" class="single-nav-logo">
            <img src="https://res.cloudinary.com/shirleykiang/image/upload/v1531329497/bao_logo.png" alt="bao-logo" class="home-link">
            </a>
            <div class="form-div">
                <form id="session-form" data-login=true>
                    <fieldset>
                    <legend class="form-title">Login to Bao</legend>
                    <div class="login-form">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="jeremylin" class="username-entry">

                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="password" class="password-entry">
                        
                        <div class="js-error-msg"></div>
                        <button type="submit" form="session-form" id="login-button" class="login-button">Log In</button>
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
        `);
}

function handleFormToggle() {

    $("body").on("click", ".switch-form-button", function() {
    $(".form-title").text($(".form-title").text() == 'Login to Bao' ? 'Create an Account' : 'Login to Bao');

    // toggle login-button
    $(".login-button").text($(".login-button").text() == 'Log In' ? 'Sign Up' : 'Log In');

     // toggle switch-form-button
    $(".switch-form-button").text($(".switch-form-button").text() == 'New to Bao? Signup instead' ? 'Have an account? Login' : 'New to Bao? Signup instead');
    
    // $(".rightnav").attr("data-login", $(".rightnav").attr("data-login")=="true" ? "false" : "true");
    $("#login-button").attr("class", $("#login-button").attr("class")=="login-button" ? "signup-button" : "login-button");

});
}

function handleLoginSubmit() {
        $("body").on("click", ".login-button", function(event) {
            event.preventDefault();
            const userForm = $("#session-form");
            const usernameInput = userForm.find(".username-entry").val();
            const passwordInput = userForm.find(".password-entry").val(); 
            const loginUser = { username: usernameInput, password: passwordInput };
            $(".password-entry").val("");
    
            api.create("/api/login", loginUser)
            .then(response => {
                saveAuthToken(response);
                saveUsername(usernameInput);
                // location.reload();
            })
            .catch(handleErrors);
        });
    }

function handleSignupSubmit() {
    $("body").on("click", ".signup-button", function(event) {
        event.preventDefault();
        const userForm = $("#session-form");
        const username = userForm.find(".username-entry").val();
        const password = userForm.find(".password-entry").val();
        $(".password-entry").val("");
        const newUser = { username: username, password: password };

        api.create("/api/users", newUser)
        .then(token => {
            saveAuthToken(token);
            saveUsername(username);
            location.reload();
        })
        .catch(handleErrors);

    });
    }


function handleLogOutDisplay() {
    if (loadUsername()) {
        $(".nav-item-login").html('LOG OUT'); 
        $(".nav-item-login").on("click", function() {
            handleLogout();
        });
    }
}

function handleLogout() {
    clearUsername();
    clearAuthToken();
    clearCurrentDish();
    location.reload();
}

function handleCreateRecipe() {

    $(".nav-item-create").on("click", function() {
        if (!(loadUsername())) {
            handleDisplayLoginPage();
        } else {
            handleDisplayRecipeForm();
        }
    });
}

function handleDisplayRecipeForm() {
    $("html").css("background-color", "#f6f7f8");
    $("main").html(`
        <div class="recipe-form-page">
            <div class="recipe-form-content">
                <div class="recipe-form-head">
                    <h1>NEW RECIPE</h1>
                </div>
                <form id="recipe-form" onsubmit="return confirm('Are you sure you want to create this recipe?');">

                    <label for="recipe-name" class="recipe-title">DISH NAME</label>
                    <input type="text" id="recipe-name" placeholder="e.g. Beef Noodle Soup" class="recipe-name" value required>
                
                    <label for="recipe-category">CATEGORY</label>
                    <select id="recipe-category" class="recipe-category" value required>
                        <option value="Food">Food</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                    <label for="recipe-servings">SERVINGS</label>
                    <input type="text" id="recipe-servings" placeholder="e.g. 5" class="recipe-servings" value required>
                    
                    <label for="recipe-ingredients">INGREDIENTS</label>
                    <textarea id="recipe-ingredients" class="recipe-ingredients" rows="1" placeholder="Beef, Noodle, Soup (separated by commas)" value required></textarea>
                
                    <label for="recipe-directions">DIRECTIONS</label>
                    <textarea id="recipe-directions" class="recipe-directions" rows="1" placeholder="Mix, eat, enjoy (separated by commas)" value required></textarea>
                    
                    <label for="recipe-image">IMAGE URL</label>
                    <input type="text" id="recipe-image" placeholder="www.google.com/image" class="recipe-image" value required>
                
                    <button type="submit" form="recipe-form" class="submit-recipe-form">CREATE</button>
                </form>
            </div>
        </div>

    `);

    //code for image drop zone, re-implement back when figure out html 
    // <label for="recipe-image">Image</label>
    // <div class="recipe-image" id="dropzone" style="width: 200px; height: 200px; border-width: 2px; border-color: rgb(102, 102, 102); border-style: dashed; border-radius: 5px;">
    // <p>Drop an image or click to select a file to upload</p>
    
//     <input type="file" accept="image/*" style="display: none;">
// </div>

    handleRecipeSubmit();

}

function handleRecipeSubmit() {

    $("main").on("submit", "#recipe-form", function(event) {
        event.preventDefault();

        const recipeForm = $(event.currentTarget);
        
        const newRecipe = {
            name: recipeForm.find(".recipe-name").val(),
            category: recipeForm.find(".recipe-category").val(),
            image: recipeForm.find(".recipe-image").val(), 
            servings: recipeForm.find(".recipe-servings").val(),
            ingredients: recipeForm.find(".recipe-ingredients").val().split(","),
            directions: recipeForm.find(".recipe-directions").val().split(","),
            author: loadUsername()
        };

        api.create("api/recipes", newRecipe)
        .then(response => handleDisplayOneRecipe(response));

    });
}

function handleDisplayNoteForm() {
    
    $("html").css("background-color", "#f6f7f8");
    $("main").html(`
        <div class="note-form-page">
            <div class="note-form-content">
                <div class="note-form-head">
                    <h1>NEW NOTE</h1>
                    <h2>Write a brief note on your learnings to improve this dish for future reps.</h2>
                </div>
                <form id="note-form">
                    <h3 class="note-form-title">
                    CONTENT
                    </h3>
                    <textarea class="note-content" rows="2" cols="30" placeholder="i.e. Made on 7/11, be sure to add spicy beans sauce gradually"></textarea>
                    <button type="submit" form="note-form" class="submit-note-form">CREATE</button>
                </form>
            </div>
        </div>
    `);
}

function handleAddNoteClick() {
    
    $("main").unbind().on("click", ".add-note-button", function() {

        
        handleDisplayNoteForm();
        handleSubmitNote();
    });
}

// function handleEditNoteClick() {
//     // do something
// }

// function handleDeleteNoteClick() {
//     // do something
// }

function handleSubmitNote() {
    $("main").on("submit", "#note-form", function(event) {
        event.preventDefault();
        const dishId = loadCurrentDish();
        const content = $(event.currentTarget).find("textarea").val();
        const newNote = {
            dishId: dishId,
            content: content
        };
        api.create("/api/notes", newNote)
        .then(response => {
            console.log(response);
            return api.details(`/api/recipes/${dishId}`)
        })
        .then(response => {
            console.log(response);
            handleDisplayOneRecipe(response);
        });

    })
}

function handleDemoClick() {
    if (loadUsername()) {
        $(".nav-demo-login").remove();
    };

    $(".nav-demo-login").on("click", function(event) {

        const loginUser = { username: "testuser", password: "testuserpassword" };

        api.create("/api/login", loginUser)
        .then(response => {
            saveAuthToken(response);
            saveUsername("testuser");
            location.reload();
        });
    });
}

function bindEventListeners() {
    handleFormToggle();
    handleRecipeClick();
    handleDisplayRecipes();
    handleCreateRecipe();
    handleDemoClick();
    handleLoginClick();
    handleLogOutDisplay();
    handleLoginSubmit();
    handleSignupSubmit();
}


$(bindEventListeners);