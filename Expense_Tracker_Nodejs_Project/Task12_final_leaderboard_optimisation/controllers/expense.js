const path = require('path');

const Expense = require('../models/expense');
const User = require('../models/user');

exports.getAddExpense = (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','expense.html'));
}

exports.postAddExpense = async (req, res) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user.id;

    if(!amount || !description || !category){
        res.status(400).json({ msg: 'All fields are required' });
        return;
    }

    try{
        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: userId
        });

        const user = await User.findOne({ where: {id: userId} });
        user.balance += parseInt(amount);
        await user.save();
        
        res.json(expense);
    }catch(err){
        console.log('POST ADD EXPENSE ERROR');
        res.status(500).json({ error: err });
    }
}

exports.getAllExpenses = (req, res) => {
    Expense.findAll({ where: {userId: req.user.id} })
    .then((expenses) => {
        res.json(expenses);
    })
    .catch((err) => {
        console.log('GET ALL EXPENSES ERROR');
        res.status(500).json({ error: err });
    });
}

exports.postDeleteExpense = async (req, res) => {
    const expenseId = req.params.expenseId;
    const userId = req.user.id;

    try{
        const expense = await Expense.findOne({ where: {userId: userId, id: expenseId} });
        if(!expense){
            res.status(404).json({ msg: 'Item not found!' });
            return;
        }
        const amount = expense.amount;
        expense.destroy();

        const user = await User.findOne({ where: {id: userId} });
        user.balance -= parseInt(amount);
        await user.save();

        res.json(expense);
    }catch(err){
        console.log('POST DELETE EXPENSE ERROR');
        res.status(500).json({ error: err });
    }
};
