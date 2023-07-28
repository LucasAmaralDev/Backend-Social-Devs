const loginService = require('../../services/login-service');
const authService = require('../../services/auth-service');
const HttpException = require('../exceptions/http.exception');

class LoginUserController {

    async login (req, res) {

        try {
            const user = await loginService.login(req.body);
            const token = await authService.generateToken({ id: user.id });
            return res.status(200).json({ token })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.status).json({ error: error.message })
            };
            return res.status(500).json({ error: 'Erro no servidor' })
        }
    }

}

module.exports = new LoginUserController();