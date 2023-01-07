const express = require('express');

const router = express.Router();

// /admin/add-product  ->  GET
router.get('/add-product', (req, res, next) => {
    res.send(`
    <form action="/admin/add-product" method="POST">
        <label for="title">Product:</label>
        <input type="text" id="title" name="title"><br>
        <label for="size">Size:</label>
        <input type="number" id="size" name="size"><br>
        <button type="submit">Add Product</button>
    </form>
    `);
});

// /admin/add-product  ->  POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/shop');
});

module.exports = router;