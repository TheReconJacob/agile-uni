const routes = require("express").Router();
const mysql = require("mysql");
const fs = require("fs");
const config = require("../data/_config");
const connection = mysql.createPool(config.mysqlConfig);

var sql =
  "INSERT INTO course_attendees (course_id, employee_id, attended) VALUES (2, 999, 0) ON DUPLICATE KEY UPDATE id = id; UPDATE courses SET attendees_booked = attendees_booked + 1 WHERE course_id = 2";
Data = {};

Data.addEmployeeToCourse = () => {
  connection.query(sql, function(err, result) {
    if (err) throw err;
    return result;
  });
};

module.exports = Data;
