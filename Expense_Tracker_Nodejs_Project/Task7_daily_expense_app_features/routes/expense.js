const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/add-expense', expenseController.getAddExpense);
router.post('/add-expense', expenseController.postAddExpense);

router.get('/get-expenses', expenseController.getAllExpenses);

router.post('/delete-expense/:expenseId', expenseController.postDeleteExpense);

module.exports = router;