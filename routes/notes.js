"use strict";

const express = require("express");

const Note = require("../models/note");
const router = express.Router();

router.get("/", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then(result => 
        res.json(result)
    )
    .catch(err => {
      next(err);
    });
});

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

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;