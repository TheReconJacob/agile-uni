const expect  = require('chai').expect;
const request = require('request');
//const mysql = require('mysql');
let server; 



describe('Testing routes', function () {
	//this.timeout(10000);////////////// This is so the db is connected before the tests start running....
	before( done => {
		server = require('../server.js');
		server.on( "app_started", function() {
			done()
		})
	});

	it('Main page content', function(done) {
		request('http://localhost:5000' , function(error, response, body) {
			expect(body).to.equal('Hello World');
			done();
		});
	});

	//How to test the json
	it('Employees request columns', function(done) {
		request('http://localhost:5000/employees' , function(error, response, body) {
			console.log(body);
			expect(JSON.parse(body)[0]).to.have.all.keys('id', 'name', 'object_id', 'email');
			done();
		});
	});

	it('Courses request columns', function(done) {
		request('http://localhost:5000/courses' , function(error, response, body) {
			console.log(body);
			expect(JSON.parse(body)[0]).to.have.all.keys('course_id', 'title', 'description', 'start_date', 'end_date', 'attendees_max', 'attendees_booked', 'location', 'site_id', 'instructor_id');
			done();
		});
	});

	after(done => {
		delete require.cache[require.resolve( '../server.js' )]
		server.closeServer();
        done()
	});
});

// var express = require('express'); // (npm install --save express)
// var request = require('supertest');

// function createApp() {
//   app = express();

//   var router = express.Router();
//   router.route('/').get(function(req, res) {
//     return res.json({goodCall: true});
//   });

//   app.use(router);

//   return app;
// }

// describe('Our server', function() {
// 	var app;
  
// 	// Called once before any of the tests in this block begin.
// 	before(function(done) {
// 	  app = createApp();
// 	  app.listen(function(err) {
// 		if (err) { return done(err); }
// 		done();
// 	  });
// 	});
  
// 	it('should send back a JSON object with goodCall set to true', function(done) {
// 	  request(app)
// 		.get('/')
// 		.set('Content-Type', 'application/json')
// 		.expect('Content-Type', /json/)
// 		.expect(200, function(err, res) {
// 		  if (err) { return done(err); }
// 		  callStatus = res.body.goodCall;
// 		  expect(callStatus).to.equal(true);
// 		  // Done
// 		  done();
// 		});
// 	});
// });
