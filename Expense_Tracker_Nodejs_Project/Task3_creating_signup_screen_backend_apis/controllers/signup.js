const path = require('path');

const User = require('../models/user');

exports.getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
};

exports.postSignup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if(!username || !email || !password){
        res.status(500).json({ msg: 'All fields are required!' });
        return;
    }

    User.create({
        username: username,
        email: email,
        password: password
    })
    .then((user) => {
        res.json({ userData: user, msg: 'User added successfuly!' });
    })
    .catch((err) => {
        console.log('POST ADD USER ERROR');
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(500).json({ error: err, msg: 'Email id is already taken!' });
            return;
        }
        res.status(500).json({ error: err, msg: 'Could not add user!' });
    });
};