"use strict";

const express = require("express");

const localAuth = require("../middleware/local-auth");

const createAuthToken = require("../utils/auth");

const router = express.Router();

router.post("/login", localAuth, (req, res, next) => {
  createAuthToken(req.user)
    .then(authToken => {
      res.json( authToken );
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router; 