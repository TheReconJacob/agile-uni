var expect  = require('chai').expect;
var request = require('request');
const mysql = require('mysql')
//var connection = require('connection');

// const connection = mysql.createConnection({
//     host: `agileuni-db.c0i93hgwoofe.us-east-1.rds.amazonaws.com`,
//     port: '3306',
//     user: 'admin',
//     password: 'agileuniversity',
//     database: 'AGILEUNI'
//   })

it('Main page content', function(done) {
    request('http://localhost:5000' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});


// it('connection.connect should ...', function(done) {
//     connection.connect(function(err, result) {
//         if(err){
//             done(err);
//             return;
//         }
//         expect(result).to.equal("SQL CONNECT SUCCESSFUL.");
//         done();
//     });
// });

// describe('Access to DB', function(){
//     describe('eh?', function(){
//          it('should connect', function(done){
//              var connection = mysql.createConnection({
//                 host: `agileuni-db.c0i93hgwoofe.us-east-1.rds.amazonaws.com`,
//                 port: '3306',
//                 user: 'admin',
//                 password: 'agileuniversity',
//                 database: 'AGILEUNI'
//              });
//              connection.connect(done);
//          });
//      })
//  });

// How to test the json
it('Main page content', function(done) {
    request('http://localhost:5000/test' , function(error, response, body) {
        console.log(body);
        expect(JSON.parse(body)[0]).to.have.all.keys('id', 'name', 'object_id', 'email');
        done();
    });
});


