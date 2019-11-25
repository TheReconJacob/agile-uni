const routes = require("express").Router();
const mysql = require("mysql");
const fs = require("fs");
const config = require("../data/_config");
const connection = mysql.createPool(config.mysqlConfig);

var sql =
  "DELETE FROM course_attendees WHERE course_attendees.course_id = 2 AND course_attendees.employee_id = 999; UPDATE courses SET attendees_booked = attendees_booked - 1 WHERE course_id = 2";

Data = {};

Data.deleteAttendee = id => {
  connection.query(sql, id, function(err, result) {
    if (err) throw err;
    return result;
  });
};

module.exports = Data;
