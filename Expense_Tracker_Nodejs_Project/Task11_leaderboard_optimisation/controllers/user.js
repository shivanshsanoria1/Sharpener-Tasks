const path = require('path');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

function generateAccessToken(id, name, isPremiumUser){
    return jwt.sign({userId: id, username: name, isPremiumUser}, process.env.SECRETKEY);
}

exports.generateAccessToken = generateAccessToken;

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

    bcrypt.hash(password, 10, async (err, hash) =>{
        if(err){
            console.log('PASSWORD HASH ERROR');
            res.status(500).json({ error: err, msg: 'something went wrong!' });
            return;
        }
        try{
            const user = await User.create({
                username: username,
                email: email,
                password: hash,
                isPremiumUser: false
            });
            res.status(201).json({ userData: user, msg: 'User added successfuly!' });
        }catch(err){
            console.log('POST USER SIGNIN ERROR');
            if(err.name === 'SequelizeUniqueConstraintError'){
                res.status(400).json({ error: err, msg: 'Email is already registered!' });
                return;
            }
            res.status(500).json({ error: err, msg: 'Could not add user!' });
        }
    });
};

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
};

exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(400).json({ msg: 'All fields are required!' });
        return;
    }
    
    try{
        const user = await User.findOne({ where: { email: email } });
        if(!user){
            res.status(404).json({ msg: 'Email not registered!' });
            return;
        }
        const hash = user.password;
        bcrypt.compare(password, hash, (err, result) => {
            if(err){
                console.log('PASSWORD COMPARE HASH ERROR');
                res.status(500).json({ error: err, msg: 'something went wrong!' });
                return;
            }
            if(result === false){
                res.status(401).json({ msg: 'Incorrect Password!' });
            }else{
                res.status(200).json({ msg: 'User logged in successfully!', 
                token: generateAccessToken(user.id, user.username, user.isPremiumUser) });
            }
        });
    }catch(err){
        console.log('POST USER LOGIN ERROR');
        res.status(500).json({ error: err, msg: 'Could not fetch user!' });
    }
};

/* exports.getUserInfo = (req, res) => {
    const username = req.user.username;
    const isPremiumUser = req.user.isPremiumUser;
    res.status(200).json({username: username, isPremiumUser: isPremiumUser});
} */