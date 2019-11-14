const routes = require('express').Router();
const mysql = require('mysql')
const fs = require('fs')
const config = require('../data/_config');
const connection=mysql.createPool(config.mysqlConfig); 

var sql = "SELECT * FROM courses";

connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    return result;
});