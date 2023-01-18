const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/add-user', usersController.getAddUser);
router.post('/add-user', usersController.postAddUser);

router.get('/get-users', usersController.getAllUsers);

router.post('/delete-user/:userId', usersController.postDeleteUser);

module.exports = router;
