const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.SECRETKEY);
    User.findByPk(user.userId)
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => console.log(err));
};