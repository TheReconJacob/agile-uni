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

Data.searchCoursesNoSite = (searchTerm, callback) => {
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

Data.searchCoursesWithSite = (searchTerm, siteId, callback) => {
  connection.query(
    `SELECT * FROM courses INNER JOIN sites on courses.site_id = sites.id WHERE courses.title LIKE ? AND sites.id = ?`,
    ["%".concat(searchTerm, "%"), siteId],
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
    "UPDATE courses SET title = ?, description = ?, start_date = ?, end_date = ?, attendees_max = ?, location = ?, site_id = ?, instructor_name = ? WHERE course_id = ?",
    inputs,
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200 });
    }
  );
};

Data.addCourse = (inputs, callback) => {
  // Site id used instead of name
  // Instructor id change to instructor name
  console.log(inputs);
  connection.query(
    "INSERT INTO courses (title, description, start_date, end_date, attendees_max, location, site_id, instructor_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    inputs,
    function(err, rows, fields) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.deleteCourse = (courseId, callback) => {
  connection.query(
    "DELETE FROM courses WHERE courses.course_id = ?",
    [courseId],
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.addEmployee = (inputs, callback) => {
  connection.query(
    "INSERT INTO employees (name, object_id, email) VALUES (?, ?, ?)",
    inputs,
    function(err, rows, fields) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.addAttendee = (courseid, employeeid, callback) => {
  connection.query(
    "INSERT INTO course_attendees (courses.course_id, employees.employee_id, attended) VALUES (?, ?, 0)",
    [courseid, employeeid],
    function(err, rows, fields) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
  // connection.query(
  //   "UPDATE courses SET attendees_booked = attendees_booked + 1 WHERE course_id = ?",
  //   [course_id],
  //   function(err, rows, fields) {
  //     if (err) {
  //       return callback(err)
  //     }
  //     callback(null, { status: 200, responseJson: rows})
  //   }
  // )
};

module.exports = Data;
