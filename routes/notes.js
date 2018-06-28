"use strict";

const express = require("express");
const mongoose = require("mongoose");

const Note = require("../models/note");
// const User = require("../models/user"); // don't know if I need this

const router = express.Router();


/* ========== GET/READ ALL ITEMS ========== */
router.get("/", (req, res, next) => {
  //const { searchTerm, folderId, tagId } = req.query;
  const userId = req.user.id;

  let filter = { userId };

  Note.find(filter)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
//   const userId = req.user.id;

  Note.findOne({ _id: id })
    .then(result => 
        res.json(result)
    )
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post("/", (req, res, next) => {
  const { dishId, content } = req.body;
  const userId = req.user.id;
  const newNote = { dishId, userId, content };

  Note.create(newNote)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => 
      next(err)
    );
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { dishId, content } = req.body;
  const userId = req.user.id;
  const updateNote = { dishId, userId, content };

Note.findByIdAndUpdate(id, updateNote, { new: true })
    .then(result => {
        res.json(result);
      })
    .catch(err => {
        console.error(err);
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findOneAndRemove({ _id: id })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;