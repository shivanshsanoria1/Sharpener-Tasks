const path = require('path');

const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database'); 

exports.getAddExpense = (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','expense.html'));
}

exports.postAddExpense = async (req, res) => {
    const t = await sequelize.transaction();

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
        }, { transaction: t });

        const updatedBalance = parseInt(req.user.balance) + parseInt(amount);
        
        await User.update({balance: updatedBalance}, {where: {id: userId}, transaction: t});
        
        await t.commit();
        res.json(expense);
    }catch(err){
        console.log('POST ADD EXPENSE ERROR');
        await t.rollback();
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
    const t = await sequelize.transaction();

    const expenseId = req.params.expenseId;
    const userId = req.user.id;

    try{
        const expense = await Expense.findOne({ where: {id: expenseId, userId: userId}, transaction: t });
        if(!expense){
            await t.rollback();
            res.status(404).json({ msg: 'Item not found!' });
            return;
        }

        const amount = expense.amount;
        const updatedBalance = parseInt(req.user.balance) - parseInt(amount);

        await User.update({balance: updatedBalance}, {where: {id: userId}, transaction: t});

        expense.destroy();
        await t.commit();
        res.json(expense);
    }catch(err){
        console.log('POST DELETE EXPENSE ERROR');
        await t.rollback();
        res.status(500).json({ error: err });
    }
};
