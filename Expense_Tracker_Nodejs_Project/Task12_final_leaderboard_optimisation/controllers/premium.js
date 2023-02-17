const User = require('../models/user');

exports.getLeaderboard = async (req, res) => {
    const users = await User.findAll({
        attributes: ['username', 'balance']
    });
    users.sort((a,b) => b.balance - a.balance);
    res.status(200).json(users.slice(0,5));
    /* try{
        const leaderboardOfUsers = await User.findAll({
            attributes: ['id', 'username', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['users.id'],
            order: [['total_cost', 'DESC']]
        });
        res.status(200).json(leaderboardOfUsers.slice(0,5));
    }catch(err){
        console.log('GET LEADERBOARD ERROR');
        res.status(500).json('Could not fetch leaderboard');
    } */

    /* const users = await User.findAll();
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
    res.status(200).json(leaderboardDetails.slice(0,5)); */
}
