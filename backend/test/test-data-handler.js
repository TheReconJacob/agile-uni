<<<<<<< HEAD
const expect  = require('chai').expect;
const Data = require('./fake-data-access.js')
const dataHandler = require('../data/dataHandler.js')
const { mockRequest, mockResponse } = require('mock-req-res')
=======
const expect = require("chai").expect;
const Data = require("./fake-data-access.js");
const dataHandler = require("../data/dataHandler.js");
const { mockRequest, mockResponse } = require("mock-req-res");
const dataAgileOsterley = require("./fake-data/search-agile-osterley");
const dataOsterley = require("./fake-data/search-osterley");
const dataAgile = require("./fake-data/search-agile");
const dataNoParams = require("./fake-data/search-no-parameters");
>>>>>>> cf198bd7b4ee54bf8ad8af23e13ad98bc6b69096

//const req = mockRequest({ query: { searchTerm: 'agile', location: 'Osterley' }})
const req = mockRequest();
const res = mockResponse();

const request = mockRequest();
<<<<<<< HEAD

describe('Testing data handler', function () { 
    describe('getCourses', function () { 
        it('should return all courses', function (done) { 
            
            dataHandler.getCourses(Data)(req, (err, result) => {
                
                if (err) {
                  res.status(500)
                  res.json({ message: err.message })
                }
                res.status(result.status)
                res.json(result.responseJson)
            })
            expect(true);     
            done();    
        });
    });
});

describe('Testing listAllCourses', function () { 
    describe('listAllCourses', function () { 
        it('should return a list of all courses with their locations', function (done) { 
            
            dataHandler.listAllCourses(Data)(request, (err, result) => {
                
                if (err) {
                  res.status(500)
                  res.json({ message: err.message })
                }
                res.status(result.status)
                res.json(result.responseJson)
            })
            expect(true);     
            done();    
        });
    });
});

=======

describe("Testing data handler", function() {
  describe("getCourses", function() {
    it("should return all courses", function(done) {
      dataHandler.getCourses(Data)(req, (err, result) => {
        if (err) {
          res.status(500);
          res.json({ message: err.message });
        }
        res.status(result.status);
        res.json(result.responseJson);
      });
      expect(true); ////////////
      done();
    });
  });
>>>>>>> cf198bd7b4ee54bf8ad8af23e13ad98bc6b69096

  describe("Testing listAllCourses", function() {
    describe("listAllCourses", function() {
      it("should return a list of all courses with their locations", function(done) {
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

  describe("search", function() {
    it("search term = agile, location = Osterley returns correct data", function(done) {
      const req = mockRequest({
        query: { searchTerm: "agile", location: "Osterley" }
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
    it("search term empty, location = Osterley returns correct data", function(done) {
      const req = mockRequest({
        query: { searchTerm: "", location: "Osterley" }
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
    it("search term = agile, location is empty returns correct data", function(done) {
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
    it("search term is empty, location is empty returns correct data", function(done) {
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
});
