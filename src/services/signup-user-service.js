const HttpException = require("../controllers/exceptions/http.exception.js");
const { UsersModel } = require("../models/users-model.js");
const userRepository = require("../repositories/user-repository.js");

exports.signup = async (user) => {
    const { name, username, email, password, date_birth, sex } = user;

    if (!name || !username || !email || !password || !date_birth || !sex) {
        throw new HttpException(400, 'Dados não enviados');
    }

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!regexEmail.test(email)) {
        throw new HttpException(400, 'Email inválido');
    }

    if (username.includes(' ')) {
        throw new HttpException(400, 'Usuário não pode conter espaços');
    }

    const usernameExists = await UsersModel.findOne({ where: { username } })
    if (usernameExists) {
        throw new HttpException(400, 'Usuário já existe');
    }

    if (username.length < 6 || username.length > 20) {
        throw new HttpException(400, 'Usuário deve ter entre 6 e 20 caracteres');
    }

    // if (emailExists) {
    //     return res.status(400).json({ error: 'Email já existe' })
    // }

    const today = new Date();
    const birth = new Date(date_birth);
    const idade = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 365));

    if (idade < 13) {
        throw new HttpException(400, 'Usuário deve ter mais de 13 anos');
    }

    if (sex !== 'masc' && sex !== 'fem' && sex !== 'outro') {
        throw new HttpException(400, 'Sexo deve ser masc, fem ou outro');
    }

    if (password.length < 6 || password.length > 20) {
        throw new HttpException(400, 'Senha deve ter entre 6 e 20 caracteres');
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/g
    if (!regexPassword.test(password)) {
        throw new HttpException(400, 'Senha deve ter pelo menos 1 letra maiuscula, 1 minuscula e 1 numero');
    }

    const newUser = await userRepository.create(user);

    return newUser;
};