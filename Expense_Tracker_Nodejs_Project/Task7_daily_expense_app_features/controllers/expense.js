const path = require('path');

const Expense = require('../models/expense');

exports.getAddExpense = (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','expense.html'));
}

exports.postAddExpense = (req, res) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    if(!amount || !description || !category){
        res.status(400).json({ msg: 'All fields are required' });
        return;
    }

    Expense.create({
        amount: amount,
        description: description,
        category: category
    })
    .then((expense) => {
        res.json(expense);
    })
    .catch((err) => {
        console.log('POST ADD EXPENSE ERROR');
        res.status(500).json({ error: err });
    });
}

exports.getAllExpenses = (req, res) => {
    Expense.findAll()
    .then((expenses) => {
        res.json(expenses);
    })
    .catch((err) => {
        console.log('GET ALL EXPENSES ERROR');
        res.status(500).json({ error: err });
    });
}

exports.postDeleteExpense = (req, res) => {
    const expenseId = req.params.expenseId;
    Expense.findByPk(expenseId)
    .then((expense) => {
        expense.destroy();
        res.json(expense);
    })
    .catch((err) => {
        console.log('POST DELETE EXPENSE ERROR');
        res.status(500).json({ error: err });
    });
};
