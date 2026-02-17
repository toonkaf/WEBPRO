const path = require('path');

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database('questions.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.get('/', (req, res) => {
    const query = 'SELECT * FROM questions';
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error fetching questions:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('ques', { questions: rows });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});