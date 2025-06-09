const catchAsync = require('../utils/catchAsync.js');
const user = require('../db/models/user.js');
const { Sequelize } = require('sequelize');

const getAllUser = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: '0'
            }
        },
        attributes: { exclude: ['password'] }
    });

    return res.status(200).json({
        status:'success',
        data: users
    });
});

module.exports = { getAllUser }