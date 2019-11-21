const routes = require("express").Router();
const mysql = require("mysql");
const fs = require("fs");
const config = require("../data/_config");
const connection = mysql.createPool(config.mysqlConfig);

var sql =
  "INSERT INTO employees (id, name, object_id, email) VALUES (999, 'John Doe', 'null', 'john.doe@sky.uk') ON DUPLICATE KEY UPDATE course_id = course_id";

Data = {};

Data.addCourseWithId = () => {
  connection.query(sql, function(err, result) {
    if (err) throw err;
    return result;
  });
};

module.exports = Data;
