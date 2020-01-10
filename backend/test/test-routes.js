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

//BEST PRACTICE - GET THIS WORKING but wer were having issues with the audience claim in the JWT token so we are manually passing a token
// const AuthenticationContext = require('adal-node').AuthenticationContext;
// const authorityUrl = 'https://login.microsoftonline.com/68b865d5-cf18-4b2b-82a4-a4eddb9c5237';
// const applicationId = 'c0fb79ba-b72c-47c1-912c-48ee6cbac972'
// const clientSecret = require("../../clientSecret.json")[token]
// const resource = '00000003-0000-0000-c000-000000000000'
// const context = new AuthenticationContext(authorityUrl, true, null, null);
// let server;

// let tokenResponse;

// context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, function (err, data) {
// 	if (err) {
// 		console.log('well that didn\'t work: ' + err.stack);
// 	} else {
// 		tokenResponse = data
// 		console.log(tokenResponse);
// 	}
// });

// console.log(tokenResponse)
// console.log('outside')

describe("Integration tests: Running app and testing data routes", () => {
  //Used to have a timeout, now default before_all is set to 10000
  before(done => {
    server = require("../server.js");
    server.on("app_started", () => {
      done();
    });
  });

  describe("Dummy tests", () => {
    it("Dummy test", done => {
      request(
        "http://localhost:5000",
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          }
        },
        (error, response, body) => {
          expect(body).to.equal("Hello World");
          done();
        }
      );
    });

    it("Columns of employee data are correct", done => {
      request(
        "http://localhost:5000/employees",
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          }
        },
        (error, response, body) => {
          const rows = JSON.parse(body)["employees"]["responseJson"];
          expect(rows[0]).to.have.all.keys("id", "name", "object_id", "email");
          done();
        }
      );
    });

    it("Columns of courses data are correct", done => {
      request(
        "http://localhost:5000/courses",
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          }
        },
        (error, response, body) => {
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
            "instructor_name"
          );
          done();
        }
      );
    });

    it("Columns of sites data are correct", done => {
      request(
        "http://localhost:5000/sites",
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          }
        },
        (error, response, body) => {
          const rows = JSON.parse(body)["sites"]["responseJson"];
          expect(rows[0]).to.have.all.keys("id", "name", "address");
          done();
        }
      );
    });
  });

  describe("Display courses routes", () => {
    describe("Search functions", () => {
      it("Site: Osterley, Search: agile, should return stuff", done => {
        request(
          "http://localhost:5000/search?searchTerm=agile&site=Osterley",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          (error, response, body) => {
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
              "instructor_name",
              "id",
              "address",
              "name"
            );
            done();
          }
        );
      });
    });

    describe("List all courses", () => {
      it("List all courses should match the specificed keys", done => {
        request(
          "http://localhost:5000/listAllCourses",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          (error, response, body) => {
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
              "instructor_name",
              "id",
              "name",
              "address"
            );
            done();
          }
        );
      });
    });
  });

  describe("Course admin routes", () => {
    describe("Add a course", () => {
      it("Course should be added successfully", done => {
        chai
          .request("http://localhost:5000")
          .post("/addCourse")
          .set("Authorization", "Bearer " + process.env.AUTHTOKEN)
          .send({
            title: "test15",
            location: "theHub",
            site_id: 1,
            start_date: "0000-00-00 00:00:00",
            end_date: "0000-00-00 00:00:00",
            attendees_max: 100,
            description: "Things",
            instructor_name: "Alex Drage"
          })
          .end((error, response, body) => {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

    describe("Update a course", () => {
      it("Course should be edited successfully", done => {
        chai
          .request("http://localhost:5000")
          .post("/editCourse")
          .set("Authorization", "Bearer " + process.env.AUTHTOKEN)
          .send({
            course_id: 131,
            title: "test15",
            description: "%thhnjnk%",
            start_date: "0000-00-00 00:00:00",
            end_date: "0000-00-00 00:00:00",
            attendees_max: 100,
            location: "Osterley",
            site_id: 1,
            instructor_name: "Alex Drage"
          })
          .end(function(error, res) {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });

    describe("Add an employee", () => {
      it("Employee should be added successfully", done => {
        chai
          .request("http://localhost:5000")
          .post("/addEmployee")
          .set("Authorization", "Bearer " + process.env.AUTHTOKEN)
          .send({
            name: "Employee test 13",
            object_id: "adoasjdoa",
            email: "employee@sky.uk"
          })
          .end((error, response, body) => {
            deleteEmployeeTestFunction(
              response.body.employees.responseJson.insertId
            );
            expect(response).to.have.status(200);
            function sleep(time) {
              return new Promise(resolve => setTimeout(resolve, time));
            }
            sleep(8000).then(() => {
              done();
            });
          });
      });
    });
  });

  describe("Add an attendee", () => {
    it("Adding an attendee to course", done => {
      addCourseWithId();
      addEmployee();
      function sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      sleep(8000).then(() => {
        request(
          "http://localhost:5000/addAttendee?courseid=2&employeeid=999",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          (error, response, body) => {
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

  describe("Delete an attendee", () => {
    it("Deleting an attendee from course", done => {
      addCourseWithId();
      addEmployee();
      addEmployeeToCourse();
      function sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      sleep(8000).then(() => {
        request(
          "http://localhost:5000/deleteAttendee?courseid=2&employeeid=999",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          (error, response, body) => {
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

  describe("Delete a course", () => {
    it("Deleting a course should return right response from server", done => {
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
          (error, response, body) => {
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

  describe("Find course by ID", () => {
    describe("Search courses by ID", () => {
      it("Course should be returned based on ID", done => {
        request(
          "http://localhost:5000/findCourseById?course_id=1",
          {
            auth: {
              bearer: process.env.AUTHTOKEN
            }
          },
          (error, response, body) => {
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
              "instructor_name",
              "id",
              "name",
              "address"
            );
            done();
          }
        );
      });
    });
  });

  describe("Display if employee is booked on a course", () => {
    describe("Display if booked", () => {
      it("Should return a boolean value of 0 or 1", done => {
        addCourseWithId();
        addEmployee();
        addEmployeeToCourse();
        function sleep(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }
        sleep(10000).then(() => {
          request(
            "http://localhost:5000/returnIfBooked?employee_id=999&course_id=2",
            {
              auth: {
                bearer: process.env.AUTHTOKEN
              }
            },
            (error, response, body) => {
              console.log(body);
              expect(
                JSON.parse(body)["course_attendees"]["responseJson"][0][
                  "EXISTS(SELECT * FROM AGILEUNI.course_attendees WHERE employee_id = '999' AND course_id = '2')"
                ]
              ).to.equal(1);
              done();
            }
          );
        });
      });
    });

    deleteCourse();
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    sleep(15000).then(() => {
      deleteEmployeeTestFunction("999");
    });
  });

  after(done => {
    delete require.cache[require.resolve("../server.js")];
    server.closeServer();
    done();
  });
});
