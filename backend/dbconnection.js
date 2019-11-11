const mysql=require('mysql');
const fs = require('fs')
var connection=mysql.createPool({
 
    host: `agileuni-db.c0i93hgwoofe.us-east-1.rds.amazonaws.com`,
    port: '3306',
    user: 'admin',
    password: fs.readFileSync('../dbPassword', 'UTF-8'),
    database: 'AGILEUNI'
 
});

module.exports=connection;