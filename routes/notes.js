"use strict";

const express = require("express");
const mongoose = require("mongoose");

const Note = require("../models/note");
const User = require("../models/user");

const router = express.Router();

// TAKEN FROM NOTEFUL   DON'T KNOW how i should update my notes... didn't add that in my client side

/* ========== GET/READ A SINGLE ITEM ========== */
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    /***** Never trust users - validate input *****/
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("The `id` is not valid");
      err.status = 400;
      return next(err);
    }
  
    Note.findOne({ _id: id, userId })
      .populate("tags")
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  });
  
  /* ========== POST/CREATE AN ITEM ========== */
  router.post("/", (req, res, next) => {
    const { title, content, folderId, tags } = req.body;
    const userId = req.user.id;
    const newNote = { title, content, userId, folderId, tags };
  
    /***** Never trust users - validate input *****/
    if (!title) {
      const err = new Error("Missing `title` in request body");
      err.status = 400;
      return next(err);
    }
  
    Promise.all([
      validateFolderId(folderId, userId),
      validateTagIds(tags, userId)
    ])
      .then(() => Note.create(newNote))
      .then(result => {
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => {
        if (err === "InvalidFolder") {
          err = new Error("The folder is not valid");
          err.status = 400;
        }
        if (err === "InvalidTag") {
          err = new Error("The tag is not valid");
          err.status = 400;
        }
        next(err);
      });
  });

  
/* ========== PUT/UPDATE A SINGLE NOTE ========== */
router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const { title, content, folderId, tags } = req.body;
    const userId = req.user.id;
    const updateNote = { title, content, userId, folderId, tags };
  
    /***** Never trust users - validate input *****/
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("The `id` is not valid");
      err.status = 400;
      return next(err);
    }
  
    if (!title) {
      const err = new Error("Missing `title` in request body");
      err.status = 400;
      return next(err);
    }
  
    if (mongoose.Types.ObjectId.isValid(folderId)) {
      updateNote.folderId = folderId;
    }
  
    Promise.all([
      validateFolderId(folderId, userId),
      validateTagIds(tags, userId)
    ])
      .then(() => {
        return Note.findByIdAndUpdate(id, updateNote, { new: true })
          .populate("tags");
      })
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => {
        if (err === "InvalidFolder") {
          err = new Error("The folder is not valid");
          err.status = 400;
        }
        if (err === "InvalidTag") {
          err = new Error("The tag is not valid");
          err.status = 400;
        }
        next(err);
      });
  });
  
  
  // TAKEN FROM NOTEFUL 
  /* ========== DELETE/REMOVE A SINGLE ITEM ========== */
  router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    /***** Never trust users - validate input *****/
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("The `id` is not valid");
      err.status = 400;
      return next(err);
    }
  
    Note.findOneAndRemove({ _id: id, userId })
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        next(err);
      });
  });