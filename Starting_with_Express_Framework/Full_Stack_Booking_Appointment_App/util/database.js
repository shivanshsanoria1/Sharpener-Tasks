const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking_appointment_app', 'root', 'abcd1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
