const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database'); 

// static resourse
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
    const sql = `CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    email VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    age INT,
    address TEXT,
    phone VARCHAR(20))`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created or already exists");
    });
    const sqlselect = 'SELECT * FROM Users;';
    conn.query(sqlselect, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { users: result });
    });
});

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add.html'));
});

app.post('/add', (req, res) => {
    const { username, password, email, firstname, lastname, age, address, phone } = req.body;
    const sql = 'INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [username, password, email, firstname, lastname, age, address, phone];
    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Data inserted successfully");
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});