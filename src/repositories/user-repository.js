const { UserTypes, UserSex } = require("../enums/user-types");
const { UsersModel } = require("../models/users-model");
const md5 = require('md5');

exports.createAdmin = async () => {
    try {
        const user = {
            name: 'admin',
            username: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            date_birth: '1990-01-01',
            sex: UserSex.OUTRO,
            type: UserTypes.ADMINISTRATOR,
        };

        if (await this.getByUsername(user.username)) {
            return;
        }

        await this.create(user);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
},

    exports.create = (user) => {
        const { name, username, email, password, date_birth, sex, type } = user;
        const newUser = UsersModel.create({
            name,
            username,
            email,
            password: md5(password),
            date_birth,
            sex,
            type
        });
        return newUser;
    };

exports.getByUsername = (username) => {
    const user = UsersModel.findOne({ where: { username } });
    return user;
};

exports.getByEmail = (email) => {
    const user = UsersModel.findOne({ where: { email } });
    return user;
};

exports.emailExists = async (email) => {
    const user = await this.getByEmail(email);
    return user ? true : false;
};

exports.usernameExists = async (username) => {
    const user = await this.getByUsername(username);
    return user ? true : false;
};
