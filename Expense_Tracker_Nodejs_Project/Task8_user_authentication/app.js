const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const errorController = require('./controllers/error');
const User = require('./models/user');
const Expense = require('./models/expense');

const app = express();

app.use(bodyParser.json({ extended: false } ));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use(errorController.get404);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch((err) => console.log(err));