const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const signupRoutes = require('./routes/signup');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.json({ extended: false } ));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', signupRoutes);
app.use(errorController.get404);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));