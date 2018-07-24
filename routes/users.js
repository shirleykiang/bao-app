"use strict";

const express = require("express");

const User = require("../models/user");

const router = express.Router();

const createAuthToken = require("../utils/auth");

router.post("/", (req, res, next) => {
  console.log('post request made to api/users');
  const requiredFields = ["username", "password"];
  const missingField = requiredFields.find(field => !(field in req.body));
  let { username, password = "" } = req.body;

  if (missingField) {
    const err = new Error(`Missing '${missingField}'`);
    err.status = 422;
    return next(err);
  }

  const explicityTrimmedFields = ["username", "password"];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    const err = new Error(`Field: '${nonTrimmedField}' cannot start or end with whitespace`);
    err.status = 422;
    return next(err);
  }

  const sizedFields = {
    username: { min: 3 },
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field => "min" in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );

  if (tooSmallField) {
    const min = sizedFields[tooSmallField].min;
    const err = new Error(`Field: '${tooSmallField}' must be at least ${min} characters long`);
    err.status = 422;
    return next(err);
  }

  const tooLargeField = Object.keys(sizedFields).find(
    field => "max" in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooLargeField) {
    const max = sizedFields[tooLargeField].max;
    const err = new Error(`Field: '${tooLargeField}' must be at most ${max} characters long`);
    err.status = 422;
    return next(err);
  }



  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest
      };
      return User.create(newUser);
    })
    .then(user => {
      return createAuthToken(user);
    })
    .then(token => {
      console.log(token);
      return res.status(201).json(token);
    })
    .catch(err => {
      console.log(err);
      if (err.code === 11000) { // mongodb native code for existing username
        err = new Error("Sorry, this username is already taken.");
        err.status = 400;
      }
      next(err);
    });
});



module.exports = router;
