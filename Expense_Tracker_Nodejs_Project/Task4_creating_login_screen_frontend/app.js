const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.json({ extended: false } ));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);
app.use(errorController.get404);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));