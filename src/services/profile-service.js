const HttpException = require("../controllers/exceptions/http.exception");
const userRepository = require("../repositories/user-repository");

exports.editProfile = async (id, data) => {
    if (!data.email || !data.username) {
        throw new HttpException(400, "Dados não enviados");
    }

    if (data.username.length < 6 || data.username.length > 20) {
        throw new HttpException(400, "Usuário deve ter entre 6 e 20 caracteres");
    }

    const userExists = await userRepository.userExistsById(id);

    if (!userExists) {
        throw new HttpException(404, "Usuário não encontrado");
    }

    if (data.username.includes(' ')) {
        throw new HttpException(400, "Usuário não pode conter espaços");
    }

    const usernameExists = await userRepository.usernameExists(data.username);

    if (usernameExists) {
        throw new HttpException(400, "Usuário já existe");
    }

    const modifiedUser = await userRepository.update(id, data);

    console.log(modifiedUser)

    return modifiedUser;
};