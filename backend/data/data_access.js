const mysql = require("mysql");
(fs = require("fs")), (config = require("./_config"));

const connection = mysql.createConnection(config.mysqlConfig);

const Data = {};

// connection.connect(function(err) {
//     if (err) {
// 		throw err;
// 	} else {
// 		console.log('db connection successful')
// 	}
// });

Data.getAllCourses = callback => {
  connection.query("SELECT * FROM courses", function(err, rows, fields) {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: rows });
  });
};

Data.getAllEmployees = callback => {
  connection.query("SELECT * FROM employees", function(err, rows, fields) {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: rows });
  });
};

Data.getAllSites = callback => {
  connection.query("SELECT * FROM sites", function(err, rows, fields) {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: rows });
  });
};

Data.searchCoursesNoLocation = (searchTerm, callback) => {
  connection.query(
    `SELECT * FROM courses INNER JOIN sites on courses.site_id = sites.id WHERE courses.title LIKE ?`,
    "%".concat(searchTerm, "%"),
    function(err, rows, fields) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.searchCoursesWithLocation = (searchTerm, location, callback) => {
  connection.query(
    `SELECT * FROM courses INNER JOIN sites on courses.site_id = sites.id WHERE courses.title LIKE ? AND sites.name = ?`,
    ["%".concat(searchTerm, "%"), location],
    function(err, rows, fields) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.listAllCourses = callback => {
  connection.query(
    "SELECT * FROM courses INNER JOIN sites ON courses.site_id = sites.id",
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.editCourse = (inputs, callback) => {
  connection.query(
    "UPDATE courses SET title = ?, description = ?, start_date = ?, end_date = ?, attendees_max = ?, location = ?, site_id = ?, instructor_id = ? WHERE course_id = ?",
    inputs,
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200 });
    }
  );
};

Data.addCourse = (data, callback) => {
	// Site id used instead of name
	// Instructor id change to instructor name
	connection.query("INSERT INTO courses (title, description, start_date, end_date, attendees_max, location, site_id, instructor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
	[data.title, data.description, data.startDate, data.endDate, data.attendeesMax, data.location, data.site_id, data.instructor_id], function(err, rows, fields) {
		console.log(err)
		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})
}

Data.deleteCourse = (courseId, callback) => {
	connection.query("DELETE FROM courses WHERE courses.course_id = ?", [courseId], function(err, rows) {

		if (err) {
			return callback(err)
		}
		callback(null, { status: 200, responseJson: rows})
	})	
}

module.exports = Data;
