"use strict";

const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const jwt = require("jsonwebtoken"); 

const db = require("../db/mongoose");
const { TEST_MONGODB_URI, JWT_SECRET } = require("../config");


const User = require("../models/user");
const Recipe = require("../models/recipe");
const Note = require("../models/note");

const seedRecipes = require("../db/seed/recipes"); 
const seedUsers = require("../db/seed/users");
const seedNotes = require("../db/seed/notes");

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
      Note.insertMany(seedNotes)
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


  describe("GET /api/notes", function () {

    it("should return the correct number of notes", function () {
      const dbPromise = Note.find( {userId: user.id} );
      const apiPromise = chai.request(app)
        .get("/api/notes")
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
      const dbPromise = Note.find( {userId: user.id} ); 
      const apiPromise = chai.request(app)
        .get("/api/notes")
        .set("Authorization", `Bearer ${token}`)

      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body).to.have.length(data.length);
          res.body.forEach(function (item) {
            expect(item).to.be.a("object");
            expect(item).to.include.all.keys("id", "dishId", "userId", "createdAt", "updatedAt", "content");
          });
        });
    });
  });

  describe("GET /api/notes/:id", function () {

    it("should return correct note", function () {
      let data;

      return Note.findOne() 
        .then(_data => {
          data = _data;

          return chai.request(app)
            .get(`/api/notes/${data.id}`)
            .set("Authorization", `Bearer ${token}`)
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.all.keys("id", "dishId", "userId", "createdAt", "updatedAt", "content");
          expect(res.body.id).to.equal(data.id);
        });
    });
  });

  describe("POST /api/notes", function () {

    it("should create and return a new item when provided valid data", function () {
      const newItem = {
        "userId": "333333333333333333333300",
        "dishId": "000000000000000000000000",
        "content": "Made this on 5/29, add spicy bean sauce gradually"
      };

      let res;
      return chai.request(app)
        .post("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .send(newItem)
        .then(function (_res) {
          res = _res;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.all.keys("id", "dishId", "userId", "createdAt", "updatedAt", "content");

          return Note.findOne({ _id: res.body.id });
        })
        .then(data => {
          expect(res.body.content).to.equal(data.content);
        });
    });

  });


  describe("PUT /api/notes/:id", function () {

    it("should update the note", function () {
      const updateItem = {
        "userId": "333333333333333333333300",
        "dishId": "000000000000000000000000",
        "content": "Made this on 5/29, add spicy bean sauce gradually"
      };
      let data;
      return Note.findOne()
        .then(_data => {
          data = _data;
          return chai.request(app)
            .put(`/api/notes/${data.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updateItem);
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.all.keys("id", "dishId", "createdAt", "updatedAt", "userId", "content");
          expect(res.body.id).to.equal(data.id);
          expect(res.body.content).to.equal(updateItem.content);
        });
    });
  });


  describe("DELETE /api/notes/:id", function () {

    it("should delete an item by id", function () {
      let data;
      return Note.findOne()
        .then(_data => {
          data = _data;
          return chai.request(app)
            .delete(`/api/notes/${data.id}`)
            .set("Authorization", `Bearer ${token}`);
        })
        .then(function (res) {
          expect(res).to.have.status(204);
          expect(res.body).to.be.empty;
          return Note.findById(data.id);
        })
        .then((item) => {
          expect(item).to.be.null;
        });
    });

  });

});

