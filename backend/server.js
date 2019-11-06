const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql')
const fs = require('fs')


const connection = mysql.createConnection({
  host: `agileuni-db.c0i93hgwoofe.us-east-1.rds.amazonaws.com`,
  port: '3306',
  user: 'admin',
  password: fs.readFileSync('../dbPassword', 'UTF-8'),
  database: 'AGILEUNI'
})

connection.connect(function(err) {
    if (err) {
		throw err;
	} else {
		console.log('db connection successful')
	}
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World')
})

//'SELECT * FROM users WHERE id = ?', [userId]
app.get('/employees', (req, res) => {
	connection.query('SELECT * FROM employees LIMIT 1', function(err, rows, fields) {
		if (err) throw err;
		console.log(rows);
		res.send(rows)
	})
})

app.get('/courses', (req, res) => {
	connection.query('SELECT * FROM courses LIMIT 1', function(err, rows, fields) {
		if (err) throw err;
		res.send(rows)
	})
})

app.get('/sites', (req, res) => {
	connection.query('SELECT * FROM sites LIMIT 1', function(err, rows, fields) {
		if (err) throw err;
		console.log(rows);
		res.send(rows)
	})
})


app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})

//export const connection;