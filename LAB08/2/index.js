const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const conn = require('./database');

// static
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// หน้า login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const query = `
        SELECT * FROM Users
        WHERE username = ? OR email = ?
    `;

    conn.query(query, [username, username], (err, results) => {
        if (err) {
            console.error(err);
            return res.redirect('/?error=dberror');
        }

        // ไม่พบบัญชี
        if (results.length === 0) {
            return res.redirect('/?error=nouser');
        }

        const user = results[0];

        // รหัสผ่านผิด
        if (user.password !== password) {
            return res.redirect('/?error=wrongpass');
        }

        // สำเร็จ → redirect
        res.redirect(`/profile/${user.username}`);
    });
});

// profile
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;

    const sql = "SELECT * FROM Users WHERE username = ?";
    conn.query(sql, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.send("ไม่พบข้อมูลผู้ใช้");
        }

        res.render('profile', { user: results[0] });
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
