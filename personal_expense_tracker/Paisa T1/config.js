const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'paisa_tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const isValidPassword = await bcrypt.compare(password, results[0].password);
            if (isValidPassword) {
                res.send('Login successful!');
            } else {
                res.send('Invalid username or password.');
            }
        } else {
            res.send('Invalid username or password.');
        }
    });
});

app.post('/add-expense', (req, res) => {
    const { expense_name, expense_amount, expense_category, user_id } = req.body;
    db.query('INSERT INTO expenses (expense_name, expense_amount, expense_category, user_id) VALUES (?, ?, ?, ?)', 
    [expense_name, expense_amount, expense_category, user_id], (err, result) => {
        if (err) throw err;
        res.send('Expense added successfully!');
    });
});

app.get('/expenses/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.query('SELECT * FROM expenses WHERE user_id = ?', [user_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
