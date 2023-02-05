const Expense = require('../models/expense');
const User = require('../models/user');

exports.getLeaderboard = async (req, res) => {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const leaderboardDetails = [];
    const temp = [];
    temp[0] = 0;
    users.forEach((user) => {
        temp[user.id] = 0;
    });
    expenses.forEach((expense) => {
        temp[expense.userId] += expense.amount; 
    });
    users.forEach((user) => {
        const leaderboardDetail = {};
        leaderboardDetail.name = user.username;
        leaderboardDetail.amount = temp[user.id];
        leaderboardDetails.push(leaderboardDetail);
    });
    leaderboardDetails.sort((a,b) => b.amount - a.amount);
    res.status(200).json(leaderboardDetails.slice(0,5));
}
