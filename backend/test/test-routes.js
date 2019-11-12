//app.settings.env = 'test';
const expect  = require('chai').expect;
const request = require('request');
const search = require('../routes/search.js')
let server; 



describe('Running app and testing data routes', function () {
	//Used to have a timeout, now default before_all is set to 10000
	before( done => {
		server = require('../server.js');
		server.on( "app_started", function() {
			done()
		})
	});

	describe('Dummy tests', function() {
		it('Dummy test', function(done) {
			request('http://localhost:5000' , function(error, response, body) {
				expect(body).to.equal('Hello World');
				done();
			});
		});

		//Testing json returned by db
		it('Columns of employee data are correct', function(done) {
			request('http://localhost:5000/employees' , function(error, response, body) {
				const rows = JSON.parse(body)['employees']['responseJson'];
				expect(rows[0]).to.have.all.keys('id', 'name', 'object_id', 'email');
				done();
			});
		});

		it('Columns of courses data are correct', function(done) {
			request('http://localhost:5000/courses' , function(error, response, body) {
				const rows = JSON.parse(body)['courses']['responseJson'];
				expect(rows[0]).to.have.all.keys('course_id', 'title', 'description', 'start_date', 'end_date', 'attendees_max', 'attendees_booked', 'location', 'site_id', 'instructor_id');
				done();
			});
		});
	});

	//Uses real database
	describe('Search functions', function() {
		it('Location: Osterley, Search: agile, should return stuff', function(done) {
			request('http://localhost:5000/search?searchTerm=agile&location=Osterley' , function(error, response, body) {
				//console.log(body);
				expect(JSON.parse(body)[0])/// What do we expect? Mocked data, temporary database?
				done();
			});
		});
	})
	

	after(done => {
		delete require.cache[require.resolve( '../server.js' )]
		server.closeServer();
        done()
	});
});
