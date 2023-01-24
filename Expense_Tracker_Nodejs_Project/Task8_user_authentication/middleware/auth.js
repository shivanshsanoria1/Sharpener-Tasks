const jwt = require('jsonwebtoken');

const User = require('../models/user');

const SECRETKEY = 'xyzabc123';

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token, SECRETKEY);
    User.findByPk(user.userId)
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => console.log(err));
};