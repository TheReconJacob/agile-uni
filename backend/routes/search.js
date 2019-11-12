const routes = require('express').Router();
const mysql = require('mysql')
const fs = require('fs')
const config = require('../_config');
const connection=mysql.createPool(config.mysqlConfig);

var Tasks = { 
  searchWithLocation:function(searchTerm, location, callback) {
    let sql = `SELECT * 
              FROM courses 
              INNER JOIN sites on courses.site_id = sites.id
              WHERE courses.title LIKE ? AND sites.name = ?`
    let queryParameters = ['%'.concat(searchTerm, '%'), location]
    return connection.query(sql, queryParameters, callback)
  },
  
  searchNoLocation:function(searchTerm, callback) {
    let sql = `SELECT * 
              FROM courses 
              INNER JOIN sites on courses.site_id = sites.id
              WHERE courses.title LIKE ?`
    let queryParameters = ['%'.concat(searchTerm, '%')]
    return connection.query(sql, queryParameters, callback)    
  }
}

//In postman, call as /search?searchTerm=ddddd&location=gggg
routes.get('/', (req, res) => {
  //console.log(req.query.location)
  if(req.query.location === "") {
    Tasks.searchNoLocation(req.query.searchTerm, function(err, rows){
      handleResponse(res, err, rows);
    }
  );
  } else {
    Tasks.searchWithLocation(req.query.searchTerm, req.query.location, function(err, rows){
        handleResponse(res, err, rows);
    }
  );
  }

});

function handleResponse(res, err, rows) {
  if(err) {
    res.json(err);
  } else {
    res.json(rows);
  }  
}
  
module.exports = routes;