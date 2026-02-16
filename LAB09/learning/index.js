const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employees.db', (err) => {
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
    res.render('home');


});

app.get('/create', function (req, res) {
    // create table 
    let sql = ` CREATE TABLE IF NOT EXISTS employees (
    EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    LastName NVARCHAR(20)  NOT NULL,
    FirstName NVARCHAR(20)  NOT NULL,
    Title NVARCHAR(30),
    Phone NVARCHAR(24),
    Email NVARCHAR(60));`;

    db.run(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Table created successfully.");
    });
    res.redirect('/');
});

app.get('/show', function (req, res) {
    const query = 'SELECT * FROM employees';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.render('show', { data: rows });
    });
});

app.get('/delete/:id', function (req, res) {
    const deleteSql = 'DELETE FROM employees WHERE EmployeeId = ?';
    const employeeId = req.params.id;
    db.run(deleteSql, [employeeId], function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Employee with ID ${employeeId} deleted.`);
        res.redirect('/show');
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/formget', function (req, res) {
    const {id, Firstname, Lastname, Title, Phone, Email} = req.query;
    console.log(req.query);
    const insertSql = `INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(insertSql, [id, Firstname, Lastname, Title, Phone, Email], function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Employee inserted with ID ${id}`);
        res.redirect('/show');
    });
});

// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});