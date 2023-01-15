const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const expensesRoutes = require('./routes/expenses');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/expenses', expensesRoutes);
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));
