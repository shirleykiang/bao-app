"use strict";

const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const db = require("../db/mongoose");
const { TEST_MONGODB_URI } = require("../config");

const User = require("../models/user");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Bao API - Users", function () {
  const username = "exampleUser";
  const password = "examplePass";

  before(function () {
    return db.connect(TEST_MONGODB_URI)
      .then(() => db.dropDatabase());
  });

  beforeEach(function () {
    return User.createIndexes();
  });

  afterEach(function () {
    return db.dropDatabase();
  });

  after(function () {
    return db.disconnect();
  });

describe("POST /api/users", function () {

    it("Should create a new user and return token", function () {
      let res;
      return chai
        .request(app)
        .post("/api/users")
        .send({ username, password })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
        });
    });


    it("Should reject users with non-trimmed username", function () {
      return chai
        .request(app)
        .post("/api/users")
        .send({ username: ` ${username} `, password })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal("Field: 'username' cannot start or end with whitespace");
        });
    });
});

    it("Should reject users with non-trimmed password", function () {
      return chai
        .request(app)
        .post("/api/users")
        .send({ username, password: ` ${password}` })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal("Field: 'password' cannot start or end with whitespace");
        });
    });

    it("Should reject users with password less than 8 characters", function () {
      return chai
        .request(app)
        .post("/api/users")
        .send({ username, password: "asdfghj" })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal("Field: 'password' must be at least 8 characters long");
        });
    });

    it("Should reject users with password greater than 72 characters", function () {
      return chai
        .request(app)
        .post("/api/users")
        .send({ username, password: new Array(73).fill("a").join("") })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal("Field: 'password' must be at most 72 characters long");
        });
    });

    it("Should reject users with duplicate username", function () {
      return User
        .create({
          username,
          password
        })
        .then(() => {
          return chai
            .request(app)
            .post("/api/users")
            .send({ username, password });
        })

        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("The username already exists");
        });
    });

});

