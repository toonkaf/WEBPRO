// database.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "webdev.it.kmitl.ac.th",
    user: "s67070150",
    password: "SIY40XLG36H", 
    database: "s67070150"
});

// open the MySQL connection
conn.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = conn;