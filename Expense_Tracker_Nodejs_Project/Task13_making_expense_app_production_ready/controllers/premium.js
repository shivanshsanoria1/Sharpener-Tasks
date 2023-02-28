const User = require('../models/user');

exports.getLeaderboard = async (req, res) => {
    const users = await User.findAll({
        attributes: ['username', 'balance'],
        order: [['balance', 'DESC']]
    });
    res.status(200).json(users.slice(0,5));
}
