const HttpException = require("../exceptions/http.exception.js");
const userService = require("../../services/signup-user-service.js");
const authService = require("../../services/auth-service.js");

class SignupUserController {
    async signup (req, res) {
        try {
            const request = await userService.signup(req.body);
            const token = await authService.generateToken({ id: request.id });
            return res.status(201).json({ token });
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro ao criar usuário" });
        };
    };
};

module.exports = new SignupUserController();
