const path = require('path');

const User = require('../models/user');

exports.getAddUser = (req, res, next)=> {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

exports.postAddUser = (req, res, next)=> {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    if(!username || !email || !phoneNumber){
        throw Error('All fields are required');
    }
    User.create({
        username: username,
        email: email,
        phoneNumber: phoneNumber
    })
    .then((user) => {
        res.redirect('/users/add-user');
    })
    .catch((err) => {
        console.log('POST ADD USER ERROR');
        res.status(500).json({error: err});
    });
}

exports.getAllUsers = (req, res, next)=> {
    User.findAll()
    .then((users) => {
        res.json(users);
    })
    .catch((err) => {
        console.log('GET ALL USERS ERROR');
        res.status(500).json({error: err});
    });
}

exports.postDeleteUser = (req, res, next)=> {
    const userId = req.params.userId;
    User.findByPk(userId)
    .then((user) => {
        user.destroy();
        res.redirect('/users/add-user');
    })
    .catch((err) => {
        console.log('DELETE USER ERROR');
        res.status(500).json({error: err});;
    });
};