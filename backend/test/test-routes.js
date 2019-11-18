const expect = require("chai").expect;
const request = require("request");
const fs = require("fs");


//BEST PRACTICE - GET THIS WORKING but wer were having issues with the audience claim in the JWT token so we are manually passing a token
// const AuthenticationContext = require('adal-node').AuthenticationContext;
// const authorityUrl = 'https://login.microsoftonline.com/68b865d5-cf18-4b2b-82a4-a4eddb9c5237';
// const applicationId = 'c0fb79ba-b72c-47c1-912c-48ee6cbac972'
// const clientSecret = fs.readFileSync('../clientSecret', 'UTF-8')
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

    it('Columns of employee data are correct', function (done) {
    	request('http://localhost:5000/employees', {
    		auth: {
    			'bearer': process.env.AUTHTOKEN
    		}
    	}, function (error, response, body) {
    		const rows = JSON.parse(body)['employees']['responseJson'];
    		expect(rows[0]).to.have.all.keys('id', 'name', 'object_id', 'email');
    		done();
    	});
    });

    it("Columns of courses data are correct", function(done) {
      request(
        "http://localhost:5000/courses",
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          }
        },
        function(error, response, body) {
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
  });

  describe("Search functions", function() {
    it("Location: Osterley, Search: agile, should return stuff", function(done) {
      request(
        "http://localhost:5000/search?searchTerm=agile&location=Osterley",
        {
          auth: {
            bearer: process.env.AUTHTOKEN
          }
        },
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

  after(done => {
    delete require.cache[require.resolve("../server.js")];
    server.closeServer();
    done();
  });
});
