'use strict';

const express = require("express");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRY } = require("../config");


const createAuthToken = function (user) {
    return new Promise(function (resolve, reject) {
      jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRY }, function (err, token) {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  };

  module.exports = createAuthToken;