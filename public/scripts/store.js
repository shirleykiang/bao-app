'use strict';



// local storage functions for auth token
function loadAuthToken() {
    return localStorage.getItem('authToken') || null;
};

function saveAuthToken(authToken) {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

 function clearAuthToken() {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};


// local storage functions for current dish
function loadCurrentDish() {
    return localStorage.getItem('currentDish') || null;
};

function saveCurrentDish(currentDish) {
    try {
        localStorage.setItem('currentDish', currentDish);
    } catch (e) {}
};

 function clearCurrentDish() {
    try {
        localStorage.removeItem('currentDish');
    } catch (e) {}
};


// local storage functions for username
function loadUsername() {
    return localStorage.getItem('username') || null;
};

function saveUsername(username) {
    try {
        localStorage.setItem('username', username);
    } catch (e) {}
};

 function clearUsername() {
    try {
        localStorage.removeItem('username');
    } catch (e) {}
};

//old code
// const store = (function () {

//     return {
//         authToken: "fake_token",
//         username: "",
//         currentDish: null
//     };
// }());
