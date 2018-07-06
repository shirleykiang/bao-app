"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");

const localAuth = require("../middleware/local-auth");
const jwtAuth = require("../middleware/jwt-auth");

const createAuthToken = require("../utils/auth");

const router = express.Router();

router.post("/login", localAuth, (req, res, next) => {
  createAuthToken(req.user)
    .then(authToken => {
      res.json({ authToken });
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