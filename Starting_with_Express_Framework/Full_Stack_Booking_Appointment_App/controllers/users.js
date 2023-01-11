const path = require('path');

const User = require('../models/user');

exports.getAddUser = (req, res, next)=> {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

exports.postAddUser = (req, res, next)=> {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    User.create({
        username: username,
        email: email,
        phoneNumber: phoneNumber
    })
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => console.log(err));
}

exports.getAllUsers = (req, res, next)=> {
    User.findAll()
    .then((users) => {
        res.json(users);
    })
    .catch((err) => console.log(err));
}

exports.postDeleteUser = (req, res, next)=> {
    const prodId = req.params.prodId;
    User.findByPk(prodId)
    .then((user) => {
        user.destroy();
        res.redirect('/');
    })
    .catch((err) => console.log(err));
};