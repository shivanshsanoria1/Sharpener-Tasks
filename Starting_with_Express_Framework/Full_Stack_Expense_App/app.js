const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const expensesRoutes = require('./routes/expenses');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/expenses', expensesRoutes);
app.use(errorController.get404);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));
