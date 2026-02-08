const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.static('images'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/kanto', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/kanto.html'));
});

app.get('/johto', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/johto.html'));
});

app.get('/hoenn', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/hoenn.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})