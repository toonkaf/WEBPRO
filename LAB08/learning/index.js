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
    res.send(`
        <center><h1><a href="/create">Create Table</a></h1></center>
        <center><h1><a href="/insert">Insert Data</a></h1></center>
        <center><h1><a href="/showdata">Show Data</a></h1></center>
        <center><h1><a href="/form">Instructor Form</a></h1></center>
        
        `);
});

app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM instructor;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { data: result });
    });
});

app.get('/create',  (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE IF NOT EXISTS instructor (
        ID VARCHAR(5),
        name VARCHAR(255) NOT NULL,
        dept_name VARCHAR(255) NOT NULL,
        salary FLOAT NOT NULL,
        PRIMARY KEY (ID)
        );
    `;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table    

});

app.get('/insert', (req, res) => {
    const sql = `INSERT INTO instructor (ID, name, dept_name, salary) VALUES ?`;
    const values = [
        ['10001', 'Srinivasan', 'Comp. Sci.', 65000],
        ['10002', 'Wu', 'Finance', 90000],
        ['10003', 'Yao', 'History', 85000],
        ['10004', 'Mozart', 'Music', 75000],
        ['10005', 'Einstein', 'Physics', 95000],
        ['10006', 'Newton', 'Physics', 95000],
        ['10007', 'Hawking', 'Physics', 105000],
        ['10008', 'Edison', 'Elec. Eng.', 110000],
        ['10009', 'Bell', 'Elec. Eng.', 115000],
        ['10010', 'Turing', 'Comp. Sci.', 130000]
    ];
    conn.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get('/formget', (req, res) => {
    // read data from query string 
    // const id = req.query.id;
    // const name = req.query.name;
    // const deptname = req.query.deptname;
    // const salary = req.query.salary;
    const {id, name, deptname, salary} = req.query;

    console.log(id, name, deptname, salary);
    
    const insertSql = "INSERT INTO instructor (ID, name, dept_name, salary) VALUES (?, ?, ?, ?)";
    conn.query(insertSql,[id, name, deptname, salary], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 