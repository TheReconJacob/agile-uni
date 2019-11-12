const mysql = require('mysql')
	  fs = require('fs'),
	  config = require('./_config');

const connection = mysql.createConnection(config.mysqlConfig);

const Data = {};

// connection.connect(function(err) {
//     if (err) {
// 		throw err;
// 	} else {
// 		console.log('db connection successful')
// 	}
// });

Data.getAllCourses = (callback) => {
	connection.query('SELECT * FROM courses LIMIT 1', function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})// is this it?
	})	
}

Data.getAllEmployees = (callback) => {
	connection.query('SELECT * FROM employees LIMIT 1', function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})// is this it?
	})	
}

Data.getAllSites = (callback) => {
	connection.query('SELECT * FROM sites LIMIT 1', function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})// is this it?
	})	
}

module.exports = Data;