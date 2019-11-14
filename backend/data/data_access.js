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
		callback(null, { status: 200, responseJson: rows})
	})	
}

Data.getAllEmployees = (callback) => {
	connection.query('SELECT * FROM employees LIMIT 1', function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})	
}

Data.getAllSites = (callback) => {
	connection.query('SELECT * FROM sites LIMIT 1', function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})	
}

Data.searchCoursesNoLocation = (searchTerm, callback) => {
	connection.query(`SELECT * FROM courses INNER JOIN sites on courses.site_id = sites.id WHERE courses.title LIKE ?`, '%'.concat(searchTerm, '%'), function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})	
}

Data.searchCoursesWithLocation = (searchTerm, location, callback) => {
	connection.query(`SELECT * FROM courses INNER JOIN sites on courses.site_id = sites.id WHERE courses.title LIKE ? AND sites.name = ?`, ['%'.concat(searchTerm, '%'), location], function(err, rows, fields) {
		
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})	
}

Data.listAllCourses = (callback) => {
	connection.query("SELECT * FROM courses INNER JOIN sites ON courses.site_id = sites.id", function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})	
}

Data.addCourse = (title, location, startDate, endDate, attendeesMax, description, callback) => {
	connection.query("INSERT INTO courses (title, location, start_date, end_date, attendees_max, description)", ['%'.concat(title, '%'), location, startDate, endDate, attendeesMax, '%'.concat(description, '%')], function(err, rows, fields) {
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})
}

module.exports = Data;