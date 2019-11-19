const routes = require('express').Router();
const mysql = require('mysql')
const fs = require('fs')
const config = require('../data/_config');
const connection=mysql.createPool(config.mysqlConfig); 

var sql = "DELETE FROM employees WHERE employees.id = ?";

Data = {}

Data.deleteEmployeeTestFunction = (id) => {
    connection.query(sql, id, function (err, result) {
        if (err) throw err;
        return result;
    });
}

module.exports = Data;