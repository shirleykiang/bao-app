"use strict";

const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const jwt = require("jsonwebtoken"); 

const db = require("../db/mongoose");
const { TEST_MONGODB_URI, JWT_SECRET } = require("../config");


const User = require("../models/user");
const Recipe = require("../models/recipe");

const seedRecipes = require("../db/seed/recipes"); 
const seedUsers = require("../db/seed/users");

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
      User.insertMany(seedUsers),
      Recipe.insertMany(seedRecipes),
    ])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({ user }, JWT_SECRET);
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
      const dbPromise = Recipe.find();
      const apiPromise = chai.request(app)
        .get("/api/recipes");

      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.length(data.length);
        });
    });

    it("should return a list with the correct right fields", function () {
      const dbPromise = Recipe.find(); 
      const apiPromise = chai.request(app)
        .get("/api/recipes")

      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.length(data.length);
          res.body.forEach(function (item) {
            expect(item).to.be.a("object");
            expect(item).to.include.all.keys("id", "name", "category", "createdAt", "updatedAt", "servings", "image", "ingredients", "directions", "author");
          });
        });
    });
  });

  describe("GET /api/recipes/:id", function () {

    it("should return correct recipe", function () {
      let data;

      return Recipe.findOne() 
        .then(_data => {
          data = _data;

          return chai.request(app)
            .get(`/api/recipes/${data.id}`)
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.all.keys("id", "name", "category", "createdAt", "updatedAt", "servings", "image", "ingredients", "directions", "author");
          expect(res.body.id).to.equal(data.id);
        });
    });
  });

  describe("POST /api/recipes", function () {

    it("should create and return a new item when provided valid data", function () {
      const newItem = {
        "name": "Beef Noodle Soup",
        "category": "Meal",
        "servings": 6,
        "image": "http://res.cloudinary.com/shirleykiang/image/upload/v1529516949/beef-noodle-soup.jpg",
        "ingredients": ["ingredients", "more ingredients", "more ingredients"],
        "directions": ["1. do this]", "2. do that"]
      };
      let res;

      return chai.request(app)
        .post("/api/recipes")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem)
        .then(function (_res) {
          res = _res;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.all.keys("id", "name", "category", "ingredients", "createdAt", "updatedAt", "directions", "servings", "image", "author");

          return Recipe.findOne({ _id: res.body.id });
        })
        .then(data => {
          expect(res.body.name).to.equal(data.name);
        });
    });

  });


});

