const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('userdata.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', function (req, res) {
    const query = 'SELECT * FROM users';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.render('home', { users: rows });
    });
});

app.get('/user/:id', function (req, res) {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.log(err.message);
        }
        console.log(row);
        res.render('user', { user: row });
    });
});



// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});