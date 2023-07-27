const { UsersModel } = require("../models/users-model");
const md5 = require('md5');

exports.create = (user) => {
    const { name, username, email, password, date_birth, sex } = user;

    const newUser = UsersModel.create({
        name,
        username,
        email,
        password: md5(password),
        date_birth,
        sex,
    });

    return newUser;
}
