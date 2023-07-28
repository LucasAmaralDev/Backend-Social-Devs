const md5 = require("md5");
const HttpException = require("../controllers/exceptions/http.exception");
const userRepository = require("../repositories/user-repository");

exports.login = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new HttpException(400, "Dados não enviados");
    }

    const user = await userRepository.getByEmail(email);

    if (!user) {
        throw new HttpException(404, "Usuário não encontrado");
    }

    if (user.password !== md5(password)) {
        throw new HttpException(400, "Senha incorreta");
    }

    return user;
};