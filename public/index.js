'use strict';

let MOCK_RECIPES = {
    "recipes": [
        {
            "id": 0000,
            "name": "Beef Noodle Soup",
            "type": "Food",
            "ingredients": ["1.5 lbs cubed beef shank", "3 tomatoes", "2 onions", "1 starnise", "2 cloves garlic", "1 jar spicy bean sauce", "1/2 bunch cilantro", "1/2 cup soy sauce"],
            "servings": 6-8,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang"
        },
        {
            "id": 0001,
            "name": "Aiyu Jelly",
            "type": "Dessert",
            "ingredients": ["1 can aiyu jelly", "5 lemons", "4 cups water", "1 cup honey"],
            "servings": 5-6,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang"
        },
        {
            "id": 0002,
            "name": "Zha Jiang Mian",
            "type": "Food",
            "ingredients": ["1.5 lbs ground pork", "1 can sweet bean sauce", "1 onion, diced", "1/2 large carrot, diced", "1 pack bean curd, diced (larger than carrot and onion dices)", "1 tbsp dou ban jiang", "1/2 cup chopped cucumbers"],
            "servings": 4-5,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang"
        },
        {
            "id": 0003,
            "name": "Coconut Mochi Cake",
            "type": "Dessert",
            "ingredients": ["1 box mochi flour", "1 cup sugar", "1/4 tsp salt", "2 cans coconut milk", "3 eggs", "1 tbsp baking powder", "1 pack coconut flakes"],
            "servings": 10-12,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang"
        },
        {
            "id": 0004,
            "name": "Pork Spare Ribs",
            "type": "Food",
            "ingredients": ["2 lbs pork spareribs", "3 shallots", "2 tbsp spare rib sauce", "1/2 cup sugar"],
            "servings": 3-4,
            "directions": ["1. Do this", "2. Do that"],
            "author": "shirleykiang"
        },
    ]
}

let MOCK_USERS = {
    "users": [
        {
            "id": 2222,
            "username": "shirleykiang",
            "password": "secretpassword",
            "expiration": "expirationdate",
            "notes": [
                {
                    "id": 1111,
                    "dish": 0000,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111,
                    "dish": 0001,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111,
                    "dish": 0002,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }
            ]
        }, 
        {
            "id": 2222,
            "username": "hanapark",
            "password": "secretpassword",
            "expiration": "expirationdate",
            "notes": [
                {
                    "id": 1111,
                    "dish": 0000,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111,
                    "dish": 0001,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111,
                    "dish": 0002,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }
            ]
        }, 
        {
            "id": 2222,
            "username": "janicekim",
            "password": "secretpassword",
            "expiration": "expirationdate",
            "notes": [
                {
                    "id": 1111,
                    "dish": 0000,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111,
                    "dish": 0001,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }, 
                {
                    "id": 1111,
                    "dish": 0002,
                    "content": "Made this on 5/20, add spicy bean sauce gradually"
                }
            ]
        }
    ]
}

// GENERATE HTML FUNCTIONS
function generateRecipes() {
    // do something
}

function generateUsername() {
    // do something
}

function generateUserNotes() {
    // do something
}


// HELPER FUNCTIONS
function getUserId() {
    // do something
}

function getRecipeFromClick() {
    // do something
}


// EVENT LISTENERS AND HANDLERS

function handleSignupSubmit() {
    // do something
}

function handleLoginSubmit() {
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
    // do something
}

