const routes = require('express').Router();
const mysql = require('mysql')
const fs = require('fs')
const connection = mysql.createConnection({
  host: `agileuni-db.c0i93hgwoofe.us-east-1.rds.amazonaws.com`,
  port: '3306',
  user: 'admin',
  password: fs.readFileSync('../dbPassword', 'UTF-8'),
  database: 'AGILEUNI'
})

routes.get('/', (req, res) => {
    let sql = `SELECT * 
                FROM courses 
                LEFT JOIN sites on courses.site_id = sites.id
                WHERE sites.name = ? AND courses.title LIKE ?`
    connection.query(sql, [req.query.location, '%'.concat(req.query.searchTerm, '%')], function(err, rows, fields) {
      if (err) throw err;
      res.send(rows)
    })
  });
  
module.exports = routes;