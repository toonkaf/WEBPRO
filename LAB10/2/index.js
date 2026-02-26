const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('todos.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Static resource
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/todos", (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/api/todos", (req, res) => {
    const { title, description, deadline } = req.body;

    db.run(
        "INSERT INTO todos (title, description, deadline, status) VALUES (?, ?, ?, 0)",
        [title, description, deadline],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.redirect("/");
        }
    );
});

app.put("/api/todos/:id", (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    db.run(
        "UPDATE todos SET status = ? WHERE id = ?",
        [status, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Status updated" });
        }
    );
});

app.get('/', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            return res.send('Error fetching todos');
        }
        res.render('home', { todos: rows });
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});