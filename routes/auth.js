"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");

const localAuth = require("../middleware/local-auth");
const jwtAuth = require("../middleware/jwt-auth");

// const { JWT_SECRET, JWT_EXPIRY } = require("../config");

const router = express.Router();

router.post("/login", localAuth, (req, res, next) => {
  createAuthToken(req.user)
    .then(authToken => {
      res.json({ authToken }); // es6 shortcut for { authToken: authToken }
    })
    .catch(err => {
      next(err);
    });
});

router.post("/refresh", jwtAuth, (req, res, next) => {
  createAuthToken(req.user)
    .then(authToken => {
      res.json({ authToken });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router; 