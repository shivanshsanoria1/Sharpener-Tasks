const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_app', 'root', 'abcd1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
