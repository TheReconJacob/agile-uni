const mysql = require("mysql");
const config = require("../config");
const connection = mysql.createConnection(config.mysqlConfig);
const Data = {};

Data.getAllEmployees = callback => {
  connection.query("SELECT * FROM employees", (err, rows, fields) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: rows });
  });
};

Data.getAllSites = callback => {
  connection.query("SELECT * FROM sites", (err, rows, fields) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: rows });
  });
};

Data.addEmployee = (inputs, callback) => {
  connection.query(
    "INSERT INTO employees (name, object_id, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), name=VALUES(name), email=VALUES(email); ",
    inputs,
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.addAttendee = (employeeid, courseid, callback) => {
  let courseAttendeeResponse, course_attendeesr, employeer;

  connection.query(
    "INSERT INTO course_attendees (employee_id, course_id, attended) VALUES (?, ?, 0)",
    [employeeid, courseid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      courseAttendeeResponse = { status: 200, responseJson: rows };
    }
  );
  connection.query(
    "UPDATE courses SET attendees_booked = Coalesce(attendees_booked, 0) + 1 WHERE course_id = ?",
    [courseid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      course_attendeesr = { status: 200, responseJson: rows };
    }
  );

  connection.query(
    "SELECT email, name FROM employees WHERE id = ?",
    [employeeid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      employeer = { status: 200, responseJson: rows };
    }
  );
  connection.query(
    "SELECT title, start_date, end_date, location FROM courses WHERE course_id= ?",
    [courseid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      callback(null, [
        {
          courses: courseAttendeeResponse,
          course_attendees: course_attendeesr,
          employees: employeer,
          course_content: { status: 200, responseJson: rows }
        }
      ]);
    }
  );
};

Data.deleteAttendee = (employeeid, courseid, callback) => {
  let courseAttendeeResponse, course_attendeesr, employeer;

  connection.query(
    "DELETE FROM course_attendees WHERE course_attendees.course_id = ? AND course_attendees.employee_id = ?",
    [employeeid, courseid],
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      courseAttendeeResponse = { status: 200, responseJson: rows };
    }
  );
  connection.query(
    "UPDATE courses SET attendees_booked = attendees_booked - 1 WHERE course_id = ?",
    [courseid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      course_attendeesr = { status: 200, responseJson: rows };
    }
  );
  connection.query(
    "SELECT email, name FROM employees WHERE id = ?",
    [employeeid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      employeer = { status: 200, responseJson: rows };
    }
  );
  connection.query(
    "SELECT title, start_date, end_date, location FROM courses WHERE course_id= ?",
    [courseid],
    (err, rows, fields) => {
      if (err) {
        return callback(err);
      }
      callback(null, [
        {
          courses: courseAttendeeResponse,
          course_attendees: course_attendeesr,
          employees: employeer,
          course_content: { status: 200, responseJson: rows }
        }
      ]);
    }
  );
};

Data.returnIfBooked = (employee_id, course_id, callback) => {
  connection.query(
    `SELECT EXISTS(SELECT * FROM AGILEUNI.course_attendees WHERE employee_id = ? AND course_id = ?)`,
    [course_id, employee_id],
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

Data.findCourseById = (course_id, callback) => {
  console.log(course_id);
  connection.query(
    "SELECT * FROM courses INNER JOIN sites ON courses.site_id = sites.id WHERE course_id = ?",
    course_id,
    function(err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: rows });
    }
  );
};

module.exports = Data;
