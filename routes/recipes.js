"use strict";

const express = require("express");
const mongoose = require("mongoose");

// const Note = require("../models/note"); don't think i require this
const Recipe = require("../models/recipe");

const router = express.Router();


/* ========== GET/READ ALL ITEMS ========== */
router.get("/", (req, res, next) => {
//   const { searchTerm, folderId, tagId } = req.query;
//   const userId = req.user.id;

//   let filter = { userId };

//   if (searchTerm) {
//     // filter.title = { $regex: searchTerm };
//     filter.$or = [{ "title": { $regex: searchTerm } }, { "content": { $regex: searchTerm } }];
//   }

//   if (folderId) {
//     filter.folderId = folderId;
//   }

//   if (tagId) {
//     filter.tags = tagId;
//   }

  Recipe.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// /* ========== GET/READ A SINGLE ITEM ========== */
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  //const userId = req.user.id;

  Recipe.findOne({ _id: id })
    .then(result => 
        res.json(result)
    )
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post("/", (req, res, next) => {
  const { name, category, servings, image, ingredients, directions } = req.body;
//   console.log(req.body);
  const userId = req.user.id; // how to return json so that userid will be accessible? 
  console.log(req.user.id);
  const newRecipe = { name, category, servings, image, ingredients, directions , userId };

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