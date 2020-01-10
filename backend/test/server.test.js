const chai = require("chai"),
  expect = require("chai").expect,
  request = require("request"),
  chaiHttp = require("chai-http");
const addCourseWithId = require("../routes/addWithId").addCourseWithId;
const deleteEmployeeTestFunction = require("../routes/deleteEmployee")
  .deleteEmployeeTestFunction;
const addEmployee = require("../routes/addEmployee").addEmployee;
const addEmployeeToCourse = require("../routes/addEmployeeToCourse")
  .addEmployeeToCourse;
const deleteCourse = require("../routes/deleteCourse").deleteCourse;
chai.use(chaiHttp);

let server;

describe("Integration tests: Running app and testing data routes", function() {});
before(done => {
  server = require("../server.js");
  server.on("app_started", function() {
    done();
  });
});

describe("Dummy tests", function() {
  it("Dummy test", function(done) {
    request(
      "http://localhost:5000",
      {
        auth: {
          bearer: process.env.AUTHTOKEN
        }
      },
      function(error, response, body) {
        expect(body).to.equal("Hello World");
        done();
      }
    );
  });
  it("Columns of courses data are correct", function(done) {
    request(
      "http://localhost:5000/search", //change "search" to "courses" once changed in the database
      {
        auth: {
          bearer: process.env.AUTHTOKEN
        }
      },
      function(error, response, body) {
        const rows = JSON.parse(body)["courses"]["responseJson"];
        expect(rows[0]).to.have.all.keys(
          "id",
          "title",
          "description",
          "start_date",
          "end_date",
          "attendees_max",
          "location",
          "site_id",
          "instructor_name"
        );
        done();
      }
    );
  });

  it("Columns of sites data are correct", function(done) {
    request(
      "http://localhost:5000/sites",
      {
        auth: {
          bearer: process.env.AUTHTOKEN
        }
      },
      function(error, response, body) {
        const rows = JSON.parse(body)["sites"]["responseJson"];
        expect(rows[0]).to.have.all.keys("id", "name", "address");
        done();
      }
    );
  });

  describe("Display courses routes", function() {
    describe("Search functions", function() {
      it("courseTitleFragment: Course 1, site_id: 1, should return one course", function(done) {
        request(
          "http://localhost:5000/search?courseTitleFragment=Course%201&site_id=1",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          function(error, response, body) {
            expect(
              JSON.parse(body)["courses"]["responseJson"][0]
            ).to.have.all.keys(
              "id",
              "title",
              "description",
              "start_date",
              "end_date",
              "attendees_max",
              "location",
              "site_id",
              "instructor_name",
              "name",
              "address"
            );
            done();
          }
        );
      });
    });
  });

  describe("Course admin routes", function() {
    describe("Add a course", function() {
      it("Course should be added successfully", function(done) {
        chai
          .request("http://localhost:5000/")
          .post("/addCourse")
          .set("Authorization", "Bearer " + process.env.AUTHTOKEN)
          .send({
            title: "test15",
            description: "Things",
            start_date: "0000-00-00 00:00:00",
            end_date: "0000-00-00 00:00:00",
            attendees_max: 100,
            location: "theHub",
            site_id: 1,
            instructor_name: "Alex Drage"
          })
          .end(function(error, response, body) {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

    describe("Update a course", function() {
      it("Course should be updated successfully", function(done) {
        chai
          .request("http://localhost:5000/")
          .post("/editCourse")
          .set("Authorization", "Bearer " + process.env.AUTHTOKEN)
          .send({
            title: "test15",
            description: "New things",
            start_date: "0000-00-00 00:00:00",
            end_date: "0000-00-00 00:00:01",
            attendees_max: 200,
            location: "theHub",
            site_id: 1,
            instructor_name: "Alex Drage"
          })
          .end(function(error, response, body) {
            expect(response).to.have.status(200);
            done();
          });
      });
    });
    describe("Delete a course", function() {
      it("Deleting a course should return right response from server", function(done) {
        addCourseWithId();

        function sleep(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }
        sleep(8000).then(() => {
          request(
            "http://localhost:5000/deleteCourse?courseId=2",
            {
              auth: {
                bearer: process.env.AUTHTOKEN
              }
            },
            function(error, response, body) {
              const rows = JSON.parse(response.body)["courses"]["responseJson"];
              expect(rows[1]["affectedRows"]).to.equal(1);
              expect(rows[1]["changedRows"]).to.equal(0);
              expect(JSON.parse(response.body)["courses"]["status"]).to.equal(
                200
              );
              done();
            }
          );
        });
      });
    });

    describe("Add an attendee", function() {
      it("Adding an attendee to course", function(done) {
        addCourseWithId();
        addEmployee();
        function sleep(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }
        sleep(8000).then(() => {
          request(
            "http://localhost:5000/addAttendee?course_id=1&azure_oid=1",
            {
              auth: {
                bearer: process.env.AUTHTOKEN
              }
            },
            function(error, response, body) {
              const rows = JSON.parse(response.body)["combinedResponse"][0][
                "course_attendees"
              ]["responseJson"];
              expect(rows["affectedRows"]).to.equal(1);
              expect(rows["changedRows"]).to.equal(1);
              expect(
                JSON.parse(response.body)["combinedResponse"][0][
                  "course_attendees"
                ]["status"]
              ).to.equal(200);
              const rowsCourses = JSON.parse(response.body)[
                "combinedResponse"
              ][0]["courses"]["responseJson"];
              expect(rowsCourses["affectedRows"]).to.equal(1);
              expect(rowsCourses["changedRows"]).to.equal(0);
              expect(
                JSON.parse(response.body)["combinedResponse"][0][
                  "course_attendees"
                ]["status"]
              ).to.equal(200);
              done();
            }
          );
        });
      });
      deleteCourse();
    });

    describe("Delete an attendee", function() {
      it("Deleting an attendee from course", function(done) {
        addCourseWithId();
        addEmployee();
        addEmployeeToCourse();
        function sleep(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }
        sleep(8000).then(() => {
          request(
            "http://localhost:5000/deleteAttendee?course_id=1&attendee_id=1",
            {
              auth: {
                bearer: process.env.AUTHTOKEN
              }
            },
            function(error, response, body) {
              const rows = JSON.parse(response.body)["combinedResponse"][0][
                "course_attendees"
              ]["responseJson"];
              expect(rows["affectedRows"]).to.equal(1);
              expect(rows["changedRows"]).to.equal(1);
              expect(
                JSON.parse(response.body)["combinedResponse"][0][
                  "course_attendees"
                ]["status"]
              ).to.equal(200);
              const rowsCourses = JSON.parse(response.body)[
                "combinedResponse"
              ][0]["courses"]["responseJson"];
              expect(rowsCourses["affectedRows"]).to.equal(0);
              expect(rowsCourses["changedRows"]).to.equal(0);
              expect(
                JSON.parse(response.body)["combinedResponse"][0][
                  "course_attendees"
                ]["status"]
              ).to.equal(200);
              done();
            }
          );
        });
      });
      deleteCourse();
    });
  });
  describe("Attendees", function() {
    it("Gets attendees on a specific course ID", function(done) {
      request(
        "http://localhost:5000/attendees?course_id=1", //change "search" to "courses" once changed in the database
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          },
          function(error, response, body) {
            const rows = JSON.parse(response.body)["combinedResponse"][0][
              "course_attendees"
            ]["responseJson"];
            expect(rowsCourses["affectedRows"]).to.equal(1);
            expect(rowsCourses["changedRows"]).to.equal(0);
            expect(
              JSON.parse(response.body)["combinedResponse"][0][
                "course_attendees"
              ]["status"]
            ).to.equal(200);
            done();
          }
        }
      );
    });
  });
  describe("Total attendees", function() {
    it("Gets the number of total attendees on a specific course ID", function(done) {
      request(
        "http://localhost:5000/totalAttendees?course_id=1", //change "search" to "courses" once changed in the database
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          },
          function(error, response, body) {
            const rows = JSON.parse(response.body)["combinedResponse"][0][
              "course_attendees"
            ]["responseJson"];
            expect(rowsCourses["affectedRows"]).to.equal(1);
            expect(rowsCourses["changedRows"]).to.equal(0);
            expect(
              JSON.parse(response.body)["combinedResponse"][0][
                "course_attendees"
              ]["status"]
            ).to.equal(200);
            done();
          }
        }
      );
    });
  });

  describe("Return if booked"),
    function() {
      it('Returns "true" if booked', function(done) {
        request(
          "http://localhost:5000/returnIfBooked?course_id=1&employee_id=1",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          function(error, response, body) {
            expect(body).to.equal("true");
            done();
          }
        );
      });
    };

  describe("Find course by ID", function() {
    it("Finds a course by it's ID", function(done) {
      request(
        "http://localhost:5000/findCourseById?course_id=1", //change "search" to "courses" once changed in the database
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          },

          function(error, response, body) {
            expect(
              JSON.parse(body)["courses"]["responseJson"][0]
            ).to.have.all.keys(
              "id",
              "title",
              "description",
              "start_date",
              "end_date",
              "attendees_max",
              "location",
              "site_id",
              "instructor_name",
              "name",
              "address"
            );
            done();
          }
        }
      );
    });
  });
});
