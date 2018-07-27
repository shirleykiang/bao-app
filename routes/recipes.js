"use strict";

const express = require("express");

const Recipe = require("../models/recipe");

const router = express.Router();

router.get("/", (req, res, next) => {

  Recipe.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Recipe.findOne({ _id: id })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;