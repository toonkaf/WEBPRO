const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Set EJS as templating engine
app.set('view engine', 'ejs');
// Static resource
app.use(express.static('public'));

app.get('/', (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/books';

    fetch(endpoint)
        .then(response => response.json())
        .then(data => res.render('home', { books: data }))
        .catch(error => console.log('Error fetching data:', error));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});