const routes = require('express').Router();
const mysql = require('mysql')
const fs = require('fs')
const config = require('../data/_config');
const connection=mysql.createPool(config.mysqlConfig); 

var sql = "INSERT INTO courses (course_id, title, description, start_date, end_date, attendees_max, attendees_booked, location, site_id, instructor_id) VALUES (2, 'Bananas', 'cheese', '0000-00-00 00:00:00', 'null', '100', '0', 'The Hub', '1', '1')";

Data = {}

Data.addCourseWithId = () => {
    connection.query(sql, function (err, result) {
        if (err) throw err;
        return result;
    });
}

module.exports = Data;