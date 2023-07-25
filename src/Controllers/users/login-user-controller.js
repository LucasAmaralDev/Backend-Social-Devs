const { UsersModel } = require('../../models/users-model')
const jwt = require('jsonwebtoken');

class LoginUserController {

    async login(req, res) {

        try {

            //recebendo dados do body
            const { email, password } = req.body;

            //verificando se os dados foram enviados
            if (!email || !password) {
                return res.status(400).json({ error: 'Dados não enviados' })
            }

            //verificando se o usuario existe
            const user = await UsersModel.findOne({ where: { email } })

            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }

            //verificando se a senha esta correta
            if (user.password !== password) {
                return res.status(400).json({ error: 'Senha incorreta' })
            }

            //criando token
            const token = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            )

            //retornando token
            return res.status(200).json({ token })

        } catch (error) {

            return res.status(500).json({ error: 'Erro no servidor' })

        }

    }

}

module.exports = new LoginUserController();