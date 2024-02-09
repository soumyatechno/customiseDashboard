import { db } from './config.js';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

db.connect((error) => {
	if (error) {
		console.log(error);
		return;
	}
	console.log('Connected to MySQL database');
});

// Get all users
app.get('/users', (req, res) => {
	db.query('SELECT * FROM users', (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
	const { id } = req.params;
	const sql = `SELECT * FROM users WHERE id = ${id}`;
	db.query(sql, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

// Create a new user
app.post('/users', (req, res) => {
	console.log(req.body, 'data');
	const { name, email } = req.body;
	const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
	const values = [name, email];
	db.query(sql, values, (err, result) => {
		if (err) throw err;
		res.json({ message: 'User added successfully', id: result.insertId });
	});
});

// Update a user
app.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;
	const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
	const values = [name, email, id];
	db.query(sql, values, (err) => {
		if (err) throw err;
		res.json({ message: 'User updated successfully' });
	});
});

// Delete a user
app.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	const sql = 'DELETE FROM users WHERE id = ?';
	db.query(sql, [id], (err) => {
		if (err) throw err;
		res.json({ message: 'User deleted successfully' });
	});
});

app.listen(PORT, () => console.log('Server is listening to port' + PORT));
