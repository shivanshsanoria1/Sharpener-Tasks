const express = require('express');

const expenseController = require('../controllers/expense');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/add-expense', expenseController.getAddExpense);
router.post('/add-expense', userAuthentication.authenticate, expenseController.postAddExpense);

router.get('/get-expenses', userAuthentication.authenticate, expenseController.getAllExpenses);

router.post('/delete-expense/:expenseId', userAuthentication.authenticate, expenseController.postDeleteExpense);

router.get('/edit-expense/:expenseId', userAuthentication.authenticate, expenseController.getEditExpense);

module.exports = router;