"use strict";

const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);


describe("Express static", () => {

    it('GET request "/" should return the index page', () => {
        return chai.request(app)
        .get("/")
        .then(function (res) {
            expect(res).to.exist;
            expect(res).to.have.status(200);
            expect(res).to.be.html;
        });
    });
});