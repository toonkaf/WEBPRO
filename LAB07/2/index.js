const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.static('images'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/recipe00', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/recipe00.html'));
});

app.get('/recipe01', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/recipe01.html'));
});

app.get('/recipe02', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/recipe02.html'));
});

app.get('/recipe03', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/recipe03.html'));
});

app.get('/recipe04', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/recipe04.html'));
});

app.get('/recipe05', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/recipe05.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})