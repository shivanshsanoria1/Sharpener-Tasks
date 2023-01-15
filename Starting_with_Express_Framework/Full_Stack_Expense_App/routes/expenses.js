const express = require('express');

const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/add-expense', expensesController.getAddExpense);
router.post('/add-expense/:expenseId', expensesController.postAddExpense);

router.get('/get-expenses', expensesController.getAllExpenses);

router.post('/delete-expense/:expenseId', expensesController.postDeleteExpense);

router.get('/edit-expense/:expenseId', expensesController.getEditExpense);

module.exports = router;