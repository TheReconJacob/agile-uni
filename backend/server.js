const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: `agileuni-db.c0i93hgwoofe.us-east-1.rds.amazonaws.com`,
  port: '3306',
  user: 'admin',
  password: '',
  database: 'AGILEUNI'
})

connection.connect(function(err) {
    if (err) {
		throw err;
	} else {
		console.log('connection successful')
	}
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/test', (req, res) => {
	connection.query('SELECT * FROM employee', function(err, rows, fields) {
		if (err) throw err;
		res.send(rows)
	})
})


app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})