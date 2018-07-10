'use strict';

// GENERATE HTML FUNCTIONS
function generateRecipes(data) {
    console.log('generateRecipes running');
    console.log(`this is data[0].name: ${data[0].name}`);
    for (let i=0; i<data.length; i++) {
        $(".recipes-index").append(
            `<span>${data[i].name}</span><br>
            <img alt="${data[i].name}" src="${data[i].image}" class="recipe-image" index="${i}" data-id="${data[i].id}" style="width: 200px; height: 200px;">
            <br>`
        )};
}

function generateNotes(data) {

    // console.log('generateNotes running');
    // console.log(`this is the data ${data}`);
    // const currentUserIndex = data.users.findIndex( user => user.username === loadUsername());
    // console.log(`this is the currentuser index: ${currentUserIndex}`);
    // console.log(`this is the current user: ${data.users[currentUserIndex].username}`);
    // const currentUser = loadUsername();
    // console.log(currentUser);
    const currentDish = loadCurrentDish();
    // console.log(currentDish);
    for (let i=0; i<data.length; i++) {
        if (data[i].dishId === currentDish) {
            // console.log(`this is data[i]._id: ${data[i].id}`);
            $(".notes-contents").append(`
                <div id="note-${i}">
                    <div id="note-text-${i}" data-id="${data[i].id}" index="${i}" onclick="toggleNoteEditor(${i})">
                        ${data[i].content}
                    </div>
                    <div class="note-editor" id="note-editor-${i}"> 
                        <textarea id="ta-${i}" rows="10" cols="50" onblur="doEditNote(${i})"></textarea><br>
                    </div>
                    <button id="note-delete" onclick="doDeleteNote(${i})">
                    </button>
                </div>
                `)};
        }
    };

function doDeleteNote(index) {
    console.log('doDeleteNote is running');
    let currentText = document.getElementById(`note-text-${index}`);
    let noteId = currentText.dataset.id;
    api.remove(`/api/notes/${noteId}`);
    $(`#note-${index}`).remove();
}

function toggleNoteEditor(index) {
    console.log('toggleNoteEditor running');
    let currentText = document.getElementById(`note-text-${index}`);
    let editedText = document.getElementById(`ta-${index}`);
    let editorArea = document.getElementById(`note-editor-${index}`);

    let subject = currentText.innerHTML;
    editedText.value = subject;

    currentText.style.display = 'none';
    editorArea.style.display = 'inline';
}

function doEditNote(index) {
    console.log('doEditNote running');
    let currentText = document.getElementById(`note-text-${index}`);
    let editedText = document.getElementById(`ta-${index}`);
    let editorArea = document.getElementById(`note-editor-${index}`);
    let noteId = currentText.dataset.id;
    let dishId = loadCurrentDish();
    let content = editedText.value;

    console.log(`this is the noteId: ${noteId}`);
  
    const updatedNote = { dishId, content };

    console.log(`this is the updatedNote: ${updatedNote}`);

    api.update(`/api/notes/${noteId}`, updatedNote); // give catch error? 

    var subject = editedText.value;
    currentText.innerHTML = subject;
  
    currentText.style.display = 'inline';
    editorArea.style.display = 'none';
}

// HELPER FUNCTIONS

function getRecipes(callbackFn) {
    console.log('getRecipes ran');

    api.details("/api/recipes")
    .then(recipes =>
    callbackFn(recipes));
}

function getRecipeIndexFromClick(target) {
    console.log('getRecipeFromClick ran');
    //console.log(`this is the index: ${target.attr("index")}`);
    return target.attr("index");
}

function getNotes(callbackFn) {

    console.log('getNotes running');

    api.details("/api/notes") //only gets the ones with userId val equivalent to current user's 
    .then(response => {
        // console.log(`this is the note response ${response}`);
        callbackFn(response);
    });
}

// EVENT LISTENERS AND HANDLERS

function handleRecipeClick() {
    //console.log('handlerRecipeClick ran');
    $(".recipes-index").on("click", ".recipe-image", function(event) {
        console.log('clicked on recipe-image');
        let recipe_index = getRecipeIndexFromClick($(event.target));

        console.log(`this is the index: ${recipe_index}`);
        getOneRecipe(recipe_index);
        
    });
}

function getOneRecipe(recipeIndex) {
    console.log(`function getOneRecipe ran`);
    api.details('api/recipes')
    .then(recipes => 
        recipes[recipeIndex])
    .then(recipe => {
        console.log(recipe);
        handleDisplayOneRecipe(recipe);
    });
}

function handleDisplayOneRecipe(recipe) {
    // console.log('handleDisplayOneRecipe running');
    let recipe_object = recipe;
    // console.log(`this is the displaying recipe object: ${recipe_object}`);
    clearCurrentDish();
    saveCurrentDish(recipe_object.id);
    console.log(`this is the id of the current dish showing: ${loadCurrentDish()}`);
    $('main').html(`
        <div class="recipe-page">
            <div class="recipe-page-title">
                <h1 class="recipe-title">${recipe_object.name}</h1>
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
            ${recipe_object.directions}
            </div>
            <div class="recipe-page-notes">
            </div>
        </div>
    `);
    handleDisplayNotes();
}

function handleDisplayRecipes() {
    console.log('handleDisplayRecipes ran')
    getRecipes(generateRecipes);
}

function handleDisplayNotes() {
    console.log('handleDisplayNotes running');

    if (loadUsername()) {
        $(".recipe-page-notes").append(`
            <div class="notes-header">
                <h3>Notes</h3>
            </div>
            <div class="notes-contents">
            </div>
            <div class="add-note-section">
                <button class="add-note-button">+</button>
            </div>`);
        getNotes(generateNotes);
        handleAddNoteClick();
    }
}


function handleLoginClick() {
 
    $(".nav-item-login").on("click", function() {
        console.log('clicking login button');
        handleDisplayLoginPage();
    });
}

function handleDisplayLoginPage() {
    $("body").html(`

        <div class="session-page">
        <a href="javascript:window.location.reload(true)" class="session-home-link">
            <img src="" alt="bao-logo" class="session-home-link">
        </a>
        <div class="form-div">
            <form id="session-form" data-login="true">
                <fieldset>
                <legend class="form-title">Login to Bao</legend>
                <div class="login-form">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="peterparker" class="username-entry" value >

                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="password" class="password-entry" value >
                    
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
        `);
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
    
    $("#session-form").attr("data-login", $("#session-form").attr("data-login")=="true" ? "false" : "true");

    console.log($("#session-form").attr("data-login"));
    if ($("#recipe-form").attr("data-login")) {
        handleLoginSubmit();
    } else {
        handleSignupSubmit();
    }
});
}

function handleLoginSubmit() {
    console.log('handle login submit running');
    $("body").on("submit", "#session-form", function(event) {
        event.preventDefault();
        const userForm = $(event.currentTarget);
        const usernameInput = userForm.find(".username-entry").val();
        const passwordInput = userForm.find(".password-entry").val(); 
        const loginUser = { username: usernameInput, password: passwordInput };

        api.create("/api/login", loginUser)
        .then(response => {
            saveAuthToken(response);
            saveUsername(usernameInput);
            location.reload();
        });
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

function handleSignupSubmit() {
    $("body").on("submit", "form", function(event) {
        event.preventDefault();
        // console.log(`event current target username input: ${$(event.currentTarget).find(".username-entry").val()}`);
        
        const userForm = $(event.currentTarget);
        const username = userForm.find(".username-entry").val();
        const password = userForm.find(".password-entry").val();
        console.log(username);
        console.log(password);
        
        const newUser = { username: username, password: password };
        

        api.create("/api/users", newUser)
        .then(token => {
            saveAuthToken(token);
            saveUsername(username);
            location.reload();
        });
        // .catch(handleErrors); 

    });
}

function handleCreateRecipe() {

    $(".nav-item-create").on("click", function() {
        if (!(loadUsername())) {
            console.log('there is no user logged in currently');
            handleDisplayLoginPage();
        } else {
            handleDisplayRecipeForm();
        }
    });
}

function handleDisplayRecipeForm() {
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
                <input type="text" id="recipe-image" placeholder="Image url" class="recipe-image" value required>
            
                <button type="submit" form="recipe-form" class="submit-recipe-form">CREATE</button>
            </form>
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
    console.log('handleRecipeSubmit running');
    $("main").on("submit", "#recipe-form", function(event) {
        event.preventDefault();
        console.log('submitted a new recipe');
        // if user not logged in redirect them to log in page 
        //console.log(`event current target name input: ${$(event.currentTarget).find(".recipe-name").val()}`);
        const recipeForm = $(event.currentTarget);
        const newRecipe = {
            name: recipeForm.find(".recipe-name").val(),
            category: recipeForm.find(".recipe-category").val(),
            image: recipeForm.find(".recipe-image").val(), 
            ingredients: recipeForm.find(".recipe-ingredients").val(),
            servings: recipeForm.find(".recipe-servings").val(),
            directions: recipeForm.find(".recipe-directions").val(),
            author: loadUsername()
        };

        console.log(`this is the new recipe: ${newRecipe}`);

        api.create("api/recipes", newRecipe)
        .then(response => handleDisplayOneRecipe(response));

    });
}

function handleDisplayNoteForm() {
    console.log(`handleDisplayNoteForm running`);
    $("main").html(`
        <div class="note-form-page">
            <div class="note-form-contents">
                <div class="note-form-head">
                    <h1>New Note</h1>
                </div>
                <form id="note-form">
                    <textarea class="note-content" rows="10" cols="30"></textarea>
                    <button type="submit" form="note-form" class="submit-note-form">ADD</button>
                </form>
    </div>
    `);
}

function handleAddNoteClick() {
    console.log('handleAddNoteClick running');
    $("main").unbind().on("click", ".add-note-button", function() {

        console.log('user clicked add note button');
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
    console.log('handlesubmitnote running');
    $("main").on("submit", "#note-form", function(event) {
        console.log('user submitted new note to note form');
        event.preventDefault();
        const dishId = loadCurrentDish();
        console.log(`this is current dishId when i submit note: ${dishId}`);
        const content = $(event.currentTarget).find("textarea").val();
        //console.log(`this is the usernote: ${noteContent}`);
        const newNote = {
            dishId: dishId,
            content: content
        };
        api.create("/api/notes", newNote)
        .then(response => {
            console.log(response);
            console.log(`/api/recipes/${dishId}`);
            return api.details(`/api/recipes/${dishId}`)
        })
        .then(response => {
            console.log(response);
            handleDisplayOneRecipe(response);
        });

    })
}

function bindEventListeners() {
    handleFormToggle();
    handleRecipeClick();
    handleDisplayRecipes();
    handleCreateRecipe();
    handleLoginClick();
    handleLoginSubmit();
    handleLogOutDisplay();
}


$(bindEventListeners);