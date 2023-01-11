const path = require('path');

const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAddUser);
router.post('/', usersController.postAddUser);

router.get('/users', usersController.getAllUsers);

router.post('/delete-user/:prodId', usersController.postDeleteUser);

module.exports = router;