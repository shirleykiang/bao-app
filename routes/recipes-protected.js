"use strict";

const express = require("express");

const Recipe = require("../models/recipe");

const router = express.Router();

router.post("/", (req, res, next) => {
    const { name, category, servings, image, ingredients, directions } = req.body;
    const author = req.user.id; 
    const newRecipe = { name, category, servings, image, ingredients, directions , author };
  
    Recipe.create(newRecipe)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
          console.error(err);
          next(err);
        });
  });
  
  module.exports = router;