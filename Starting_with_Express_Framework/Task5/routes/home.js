const fs = require('fs');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    fs.readFile('./chats.txt', 'utf8', (err,data) => {
        res.send(`
        <div>${data}</div>
        <form action="/" method="POST"
        onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <input type="hidden" id="username" name="username">
            <label for="message">Message:</label>
            <input type="text" id="message" name="message" placeholder="message"><br>
            <button type="submit">Send</button>
        </form>
        `);
    });
});

router.post('/', (req, res, next) => {
    fs.appendFile('./chats.txt', `${req.body.username} : ${req.body.message}; `, (err) => {
        if(err) throw err;
    });
    res.redirect('/');
});

module.exports = router;