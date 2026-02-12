const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const conn = require('./database');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


function setupDatabase() {

    // ลบตารางทิ้งก่อน
    const dropSQL = `DROP TABLE IF EXISTS albums`;

    const createSQL = `
    CREATE TABLE albums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        song VARCHAR(255),
        artist VARCHAR(255),
        album VARCHAR(255),
        year INT,
        genre VARCHAR(100),
        album_cover TEXT
    )
    `;

    conn.query(dropSQL, (err) => {
        if (err) throw err;

        conn.query(createSQL, (err) => {
            if (err) throw err;

            console.log("Table recreated");

            // อ่าน CSV
            const data = fs.readFileSync('albums.csv', 'utf8');

            // รองรับทั้ง Windows/Linux
            const lines = data.split(/\r?\n/);

            // ลบ header
            lines.shift();

            lines.forEach(line => {

                if (!line || line.trim() === '') return;

                // CSV split ที่ถูกต้อง (รองรับ comma ใน "")
                const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

                if (values.length !== 6) {
                    console.log("Skipped line:", line);
                    return;
                }

                const cleaned = values.map(v =>
                    v.replace(/^"|"$/g, '').trim()
                );

                const insertSQL = `
                INSERT INTO albums 
                (song, artist, album, year, genre, album_cover)
                VALUES (?, ?, ?, ?, ?, ?)
                `;

                conn.query(insertSQL, cleaned);
            });

            console.log("Import Complete (Fresh Data)");
        });
    });
}



setupDatabase();

// ===============================
// Route แสดงผล
// ===============================
app.get('/', (req, res) => {

    conn.query("SELECT * FROM albums", (err, results) => {
        if (err) throw err;
        res.render('show', { albums: results });
    });
});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
