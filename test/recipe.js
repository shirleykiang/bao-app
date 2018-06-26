"use strict";

const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const jwt = require("jsonwebtoken"); // may not need?

const db = require("../db/mongoose");
const { TEST_MONGODB_URI, JWT_SECRET } = require("../config");

const Recipe = require("../models/recipe");
const User = require("../models/user");

const seedRecipes = require("../db/seed/recipes"); // haven't created yet 

const expect = chai.expect;

chai.use(chaiHttp);

describe("Bao API - Recipes", function () {

  let user = {};
  let token;

  before(function () {
    return db.connect(TEST_MONGODB_URI)
      .then(() => db.dropDatabase());
  });

  beforeEach(function () {
    return Promise.all([
      Recipe.insertMany(seedRecipes),
    ])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return db.dropDatabase();
  });

  after(function () {
    return db.disconnect();
  });

  describe("GET /api/recipes", function () {

    it("should return the correct number of recipes", function () {
      const dbPromise = Recipe.find({ id: user.id }); // don't know where user comes from , and what's point of db promise?
      const apiPromise = chai.request(app)
        .get("/api/recipes")
        .set("Authorization", `Bearer ${token}`);

      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.length(data.length);
        });
    });

    it("should return a list with the correct right fields", function () {
      const dbPromise = Recipe.find({ id: user.id }); // don't know where user.id came from 
      const apiPromise = chai.request(app)
        .get("/api/recipes")
        .set("Authorization", `Bearer ${token}`);

      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.length(data.length);
          res.body.forEach(function (item) {
            expect(item).to.be.a("object");
            expect(item).to.include.all.keys("id", "name", "image", "servings", "category", "ingredients", "directions", "author");
          });
        });
    });


  describe("GET /api/recipes/:id", function () {

    it("should return correct recipe", function () {
      let data;

      return Recipe.findOne({ id: user.id }) // DON'T KNOW where user.id came from 
        .then(_data => {
          data = _data;

          return chai.request(app)
            .get(`/api/recipes/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.all.keys("id", "name", "category", "servings", "image", "ingredients", "directions", "author");
          expect(res.body.id).to.equal(data.id);
          expect(res.body.name).to.equal(data.name);
        });
    });

    it("should respond with a 400 for an invalid id", function () {
      const badId = "NOT-A-VALID-ID";

      return chai.request(app)
        .get(`/api/recipes/${badId}`)
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eq("The `id` is not valid");
        });
    });

    it("should respond with a 404 for an non existent id", function () {
      // "DOESNOTEXIST" is 12 byte string which is a valid Mongo ObjectId()
      return chai.request(app)
        .get("/api/recipes/DOESNOTEXIST")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

  describe("POST /api/recipes", function () {

    it("should create and return a new item when provided valid data", function () {
      const newItem = {
        "title": "The best article about cats ever!",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
      };
      let res;

      return chai.request(app)
        .post("/api/recipes")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem)
        .then(function (_res) {
          res = _res;
          expect(res).to.have.status(201);
          expect(res).to.have.header("location");
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.all.keys("id", "name", "category", "ingredients", "directions", "servings", "image", "author");

          return Recipe.findOne({ _id: res.body.id });
        })
        .then(data => {
          expect(res.body.name).to.equal(data.name);
        });
    });

  });


  it("should respond with 204 when document does not exist", function () {
    return chai.request(app)
      .delete("/api/recipes/DOESNOTEXIST")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(204);
      });
  });

});

});
