var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:5000' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});


// How to test the json
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
        expect(JSON.parse(body)[0]).to.have.all.keys('course_id', 'name', 'description', 'start_date', 'end_date', 'attendees_max', 'attendees_booked', 'location', 'site_id', 'instructor_id');
        done();
    });
});


