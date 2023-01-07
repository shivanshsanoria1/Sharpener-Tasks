const express = require('express');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send(`
    <form action="/login" method="POST"
    onsubmit="localStorage.setItem('username', document.getElementById('username').value)"  >
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="username"><br>
        <button type="submit">Login</button>
    </form>
    `);
});

router.post('/login', (req, res, next) => {
    res.redirect('/');
});

module.exports = router;