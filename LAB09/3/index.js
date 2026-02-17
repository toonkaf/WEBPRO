const path = require('path');

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('tracking.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.get('/', (req, res) => {
    const query = 'SELECT * FROM tracking';
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error fetching tracking data:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('home', { orders: rows });
        }
    });
});

app.post('/add', (req, res) => {
    const {customer, product, address, tel } = req.body;
    const query = 'INSERT INTO tracking (customer, product, address, tel, status) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [customer, product, address, tel, 'รอดำเนินการ'], function (err) {
        if (err) {
            console.error('Error adding order:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});

app.post('/update/:id', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    const query = 'UPDATE tracking SET status = ? WHERE id = ?';
    db.run(query, [status, orderId], function (err) {
        if (err) {
            console.error('Error updating order status:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});