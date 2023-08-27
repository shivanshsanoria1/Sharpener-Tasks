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
        res.status(400).json({ msg: 'All fields are required!' });
        return;
    }

    User.create({
        username: username,
        email: email,
        password: password
    })
    .then((user) => {
        res.status(201).json({ userData: user, msg: 'User added successfuly!' });
    })
    .catch((err) => {
        console.log('POST ADD USER ERROR');
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).json({ error: err, msg: 'Email id is already taken!' });
            return;
        }
        res.status(500).json({ error: err, msg: 'Could not add user!' });
    });
};

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
};

exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(400).json({ msg: 'All fields are required!' });
        return;
    }
    
    console.log(email, password);
    res.status(200).json({msg: 'User logged in successfuly!' });
};