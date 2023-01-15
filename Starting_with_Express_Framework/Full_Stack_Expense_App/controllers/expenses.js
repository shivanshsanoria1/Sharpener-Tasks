const path = require('path');

const Expense = require('../models/expense');

exports.getAddExpense = (req, res, next) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

exports.postAddExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    if(!amount || !description || !category){
        throw Error('All fields are required');
    }

    if(expenseId === 'null'){ //add a new item 
        Expense.create({
            amount: amount,
            description: description,
            category: category
        })
        .then((expense) => {
            res.status(200).json(expense);
        })
        .catch((err) => {
            console.log('POST ADD EXPENSE ERROR');
            res.status(500).json({error: err});
        });
    }else{ //update an already existing item
        Expense.findByPk(expenseId)
        .then((expense) => {
            expense.amount = amount;
            expense.description = description;
            expense.category = category
            expense.save();
            res.status(200).json(expense);
        })
        .catch((err) => {
            console.log('POST EDIT EXPENSE ERROR');
            res.status(500).json({error: err});
        });
    }
}

exports.getAllExpenses = (req, res, next) => {
    Expense.findAll()
    .then((expenses) => {
        res.json(expenses);
    })
    .catch((err) => {
        console.log('GET ALL EXPENSES ERROR');
        res.status(500).json({error: err});
    });
}

exports.postDeleteExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    Expense.findByPk(expenseId)
    .then((expense) => {
        expense.destroy();
        res.status(200).json(expense);
    })
    .catch((err) => {
        console.log('POST DELETE EXPENSE ERROR');
        res.status(500).json({error: err});
    });
};

exports.getEditExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    Expense.findByPk(expenseId)
    .then((expense) => {
        res.json(expense);
    })
    .catch((err) => {
        console.log('GET EDIT EXPENSE ERROR');
        res.status(500).json({error: err});
    });
}
