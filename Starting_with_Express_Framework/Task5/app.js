const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const loginRoutes = require('./routes/login.js');
const homeRoutes = require('./routes/home.js');

app.use(bodyParser.urlencoded({extended: false}));

app.use(loginRoutes);
app.use(homeRoutes);
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found :(</h1>');
});

app.listen(3000);
