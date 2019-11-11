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

//In postman, call as /search?searchTerm=ddddd&location=gggg
routes.get('/', (req, res) => {
  console.log(req.query.location)
  let sql = `SELECT * 
              FROM courses 
              INNER JOIN sites on courses.site_id = sites.id
              WHERE courses.title LIKE ?`
  let queryParameters = ['%'.concat(req.query.searchTerm, '%'), ]
  if(req.query.location !== "") {
    sql = sql.concat(`AND sites.name = ?`)
    queryParameters = ['%'.concat(req.query.searchTerm, '%'), req.query.location]
    console.log("A location")
  }

  connection.query(sql, queryParameters, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows)
  })
});
  
module.exports = routes;