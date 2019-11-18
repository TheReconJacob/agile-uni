const expect = require("chai").expect;
const { assert } = require("chai");
const request = require("request");
const chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);
let server;

var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("Running app and testing data routes", function() {
  //Used to have a timeout, now default before_all is set to 10000
  before(done => {
    server = require("../server.js");
    server.on("app_started", function() {
      done();
    });
  });

  describe("Dummy tests", function() {
    it("Dummy test", function(done) {
      request("http://localhost:5000", function(error, response, body) {
        expect(body).to.equal("Hello World");
        done();
      });
    });

    it("Columns of employee data are correct", function(done) {
      request("http://localhost:5000/employees", function(
        error,
        response,
        body
      ) {
        const rows = JSON.parse(body)["employees"]["responseJson"];
        expect(rows[0]).to.have.all.keys("id", "name", "object_id", "email");
        done();
      });
    });

    it("Columns of courses data are correct", function(done) {
      request("http://localhost:5000/courses", function(error, response, body) {
        const rows = JSON.parse(body)["courses"]["responseJson"];
        expect(rows[0]).to.have.all.keys(
          "course_id",
          "title",
          "description",
          "start_date",
          "end_date",
          "attendees_max",
          "attendees_booked",
          "location",
          "site_id",
          "instructor_id"
        );
        done();
      });
    });

    it("Columns of sites data are correct", function(done) {
      request("http://localhost:5000/sites", function(error, response, body) {
        const rows = JSON.parse(body)["sites"]["responseJson"];
        expect(rows[0]).to.have.all.keys("id", "name", "address");
        done();
      });
    });
  });

  describe("Search functions", function() {
    it("Location: Osterley, Search: agile, should return stuff", function(done) {
      request(
        "http://localhost:5000/search?searchTerm=agile&location=Osterley",
        function(error, response, body) {
          expect(
            JSON.parse(body)["courses"]["responseJson"][0]
          ).to.have.all.keys(
            "course_id",
            "title",
            "description",
            "start_date",
            "end_date",
            "attendees_max",
            "attendees_booked",
            "location",
            "site_id",
            "instructor_id",
            "id",
            "address",
            "name"
          );
          done();
        }
      );
    });
  });

  describe("Search functions", function() {
    it("Location: Osterley, Search: agile, should return stuff", function(done) {
      request(
        "http://localhost:5000/search?searchTerm=agile&site=Osterley",
        function(error, response, body) {
          expect(JSON.parse(body)["courses"]["responseJson"][0]).to.have.all.keys(
          "course_id",
          "title",
          "description",
          "start_date",
          "end_date",
          "attendees_max",
          "attendees_booked",
          "location",
          "site_id",
          "instructor_id",
          "id",
          "name",
          "address"
          );
          done();
      });
    });
  });

  describe("Update a course", function() {
    it("Fields for one row of the course table should be updated with new data", function(done) {
      chai
        .request("http://localhost:5000")
        .post("/editCourse")
        .send({
          id: 3,
          title: "test15",
          description: "%thhnjnk%",
          start_date: "0000-00-00 00:00:00",
          end_date: null,
          attendees_max: 100,
          location: "Osterley",
          site_id: 1,
          instructor_id: 1
        })
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          done();
        });
describe("List all courses", function() {
  it("List all courses should match the specificed keys", function(done) {
    request("http://localhost:5000/listAllCourses", function(
      error,
      response,
      body
    ) {
		const rows = JSON.parse(body)["courses"]["responseJson"];
		expect(rows[0]).to.have.all.keys(
		  "course_id",
		  "title",
		  "description",
		  "start_date",
		  "end_date",
		  "attendees_max",
		  "attendees_booked",
		  "location",
		  "site_id",
		  "instructor_id",
		  "id",
		  "name",
		  "address"
		);
      done();
    });
  });

describe("Add a course", function() {
	it("Course should be added to database", function(done) {
	  chai.request("http://localhost:5000")
	  .post("/addCourse")
	  .send({
		'title': 'test15',
		'location': 'theHub',
		'site': 'Osterley',
		'startDate': 0,
		'endDate': 0,
		'attendeesMax': 100,
		'description': 'Things'
	  }).end(function(
		error,
		response,
		body) {
		expect(response).to.have.status(200);
		done();
	  });
  });
});

after(done => {
  delete require.cache[require.resolve("../server.js")];
  server.closeServer();
  done();
});
