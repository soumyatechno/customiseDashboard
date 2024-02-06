const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 4000;
app.get('/', (req, res) => {
	res.send('Hello World');
});

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root@123',
	database: 'employeesdb',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

pool.query('SELECT * FROM employees', function (error, results, fields) {
	if (error) console.log(error);
	console.log(results);
});

app.listen(PORT, () => console.log('Server is listening to port' + PORT));
