const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { name, surname, username, password } = req.body;
    db.query('INSERT INTO users (name, surname, username, password) VALUES (?, ?, ?, ?)', [name, surname, username, password], (err, result) => {
        if (err) {
            console.error('Error registering user: ', err);
            res.status(500).json({ message: 'Error registering user' });
            return;
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            console.error('Error logging in: ', err);
            res.status(500).json({ message: 'Error logging in' });
            return;
        }
        if (result.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        res.status(200).json({ message: 'Login successful' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
