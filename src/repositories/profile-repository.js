const { UsersModel } = require("../models/users-model");

exports.loadMyProfile = async (userId) => {
    return await UsersModel.findOne({
        where: { id: userId },
        include: {
            association: 'posts',
            attributes: ['text', 'date'],
            order: [['date', 'DESC']]
        },
    });
};

exports.loadProfile = async (username) => {
    return await UsersModel.findOne({
        where: { username },
        include: {
            association: 'posts',
            attributes: ['text', 'date'],
            order: [['date', 'DESC']]
        },
        attributes: { exclude: ['password'] }
    });
};