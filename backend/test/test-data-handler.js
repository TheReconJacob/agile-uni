const expect = require("chai").expect;
const Data = require("./fake-data-access.js");
const dataHandler = require("../data/dataHandler.js");
const { mockRequest, mockResponse } = require("mock-req-res");
const dataAgileOsterley = require("./fake-data/search-agile-osterley");
const dataOsterley = require("./fake-data/search-osterley");
const dataAgile = require("./fake-data/search-agile");
const dataNoParams = require("./fake-data/search-no-parameters");
const dataDelete = require("./fake-data/delete-result.json");
const dataAddAttendee = require("./fake-data/dataAddAttendee.json");

//const req = mockRequest({ query: { searchTerm: 'agile', site: 'Osterley' }})
const req = mockRequest();
const res = mockResponse();

const request = mockRequest();

describe("Unit tests: data handler", function() {

  describe("Testing listAllCourses", function() {
    describe("listAllCourses", function() {
      it("should return a list of all courses with their sites", function(done) {
        dataHandler.listAllCourses(Data)(request, (err, result) => {
          if (err) {
            res.status(500);
            res.json({ message: err.message });
          }
          res.status(result.status);
          res.json(result.responseJson);
          expect(dataNoParams).equal(result.responseJson.courses.responseJson);
        });
        done();
      });
    });
  });

  describe("Testing search", function() {
    it("search term = agile, site = Osterley returns correct data", function(done) {
      const req = mockRequest({
        query: { searchTerm: "agile", siteId: "Osterley" }
      });
      dataHandler.searchCourses(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
        expect(dataAgileOsterley).equal(
          result.responseJson.courses.responseJson
        );
      });
      done();
    });
    it("search term empty, site = Osterley returns correct data", function(done) {
      const req = mockRequest({
        query: { searchTerm: "", siteId: "Osterley" }
      });
      dataHandler.searchCourses(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
        expect(dataOsterley).equal(result.responseJson.courses.responseJson);
      });
      done();
    });
    it("search term = agile, site is empty returns correct data", function(done) {
      const req = mockRequest({ query: { searchTerm: "agile" } });
      dataHandler.searchCourses(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
        expect(dataAgile).equal(result.responseJson.courses.responseJson);
      });
      done();
    });
    it("search term is empty, site is empty returns correct data", function(done) {
      const req = mockRequest({ query: {} });
      dataHandler.searchCourses(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
        expect(dataNoParams).equal(result.responseJson.courses.responseJson);
      });
      done();
    });
  });
  describe("Testing deleteCourse", function() {
    it("deletes course by courseId", function(done){
      const req = mockRequest({ query: { courseId:"11"} })
      dataHandler.deleteCourse(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
        expect(dataDelete).equal(
          result.responseJson.courses.responseJson
        );
      });
      done();
    });
  });
  describe("Testing addAttendee", function() {
    it("adds attendee to attendees table and increases number of attendees on courses table", function(done){
      const req = mockRequest({ query: { courseid:"1", employeeid:"1"} })
      dataHandler.addAttendee(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
        expect(dataAddAttendee).equal(
          result.responseJson.courses.responseJson
        );
      });
      done();
    });
  });
});
