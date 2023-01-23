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
        console.log('POST USER SIGNIN ERROR');
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).json({ error: err, msg: 'Email is already taken!' });
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
    
    User.findOne({ where: { email: email } })
    .then((user) => {
        if(!user){
            res.status(404).json({ msg: 'Email not registered!' });
            return;
        }
        if(user.password !== password){
            res.status(401).json({ msg: 'Incorrect Password!' });
            return;
        }
        res.status(200).json({ msg: 'User logged in successfully!' });
    })
    .catch((err) => {
        console.log('POST USER LOGIN ERROR');
        res.status(500).json({ error: err, msg: 'Could not fetch user!' });
    });
};