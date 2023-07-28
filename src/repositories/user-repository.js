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

exports.getByEmail = (email) => {
    const user = UsersModel.findOne({ where: { email } });
    return user;
};

exports.emailExists = async (email) => {
    const user = await this.getByEmail(email);
    return user ? true : false;
};
