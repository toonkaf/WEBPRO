const express = require('express');
const app = express();
const port = 3000;


const path = require('path');

// Set EJS as templating engine
app.set('view engine', 'ejs');
// Static resource
app.use(express.static('public'));

// Routing path
app.get('/', (req, res) => {
    const endpoint = "http://webdev.it.kmitl.ac.th:4000/restaurant";

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            res.render('home', { foods: data }); 
        })
        .catch(error =>console.log(error));
});

app.get('/food/:id', (req, res) => {
    const foodId = req.params.id;
    const endpoint = `http://webdev.it.kmitl.ac.th:4000/detail/${foodId}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            res.render('menu', { food: data });
        })
        .catch(error => console.log(error));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});