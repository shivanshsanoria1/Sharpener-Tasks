const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

exports.getLeaderboard = async (req, res) => {
    try{
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
    }
}
