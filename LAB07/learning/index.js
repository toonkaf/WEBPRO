const express = require('express')
const app = express()
const port = 3000

const path = require('path');

// create directory 'public'
app.use(express.static('public'));
app.use(express.static('images'));

// Without middleware
app.get('/', function(req, res) {
    // console.log(path.join(__dirname, 'public/home.html'));
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/submitform', (req, res) => {
  // Access query parameters using req.query
    // const { fname, lname } = req.query;
    res.sendFile(path.join(__dirname, 'public/form.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})