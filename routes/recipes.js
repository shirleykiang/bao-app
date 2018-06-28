"use strict";

const express = require("express");
const mongoose = require("mongoose");

const Recipe = require("../models/recipe");

const router = express.Router();


/* ========== GET/READ ALL ITEMS ========== */
router.get("/", (req, res, next) => {
//   const userId = req.user.id;

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


module.exports = router;