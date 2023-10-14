const profileService = require('../../services/profile-service');
const HttpException = require('../exceptions/http.exception');

class LoadProfileUserController {

    errorMessage = 'Erro ao buscar usuário';

    async loadMyProfile (req, res) {
        try {
            const { userId } = req;
            return res.status(200).json(await profileService.loadMyProfile(userId));
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.status).json({ error: error.message })
            };
            return res.status(500).json({ error: this.errorMessage })
        };
    };

    async loadProfile (req, res) {
        try {
            const { username } = req.params;
            return res.status(200).json(await profileService.loadUserProfile(username))
        }
        catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.status).json({ error: error.message })
            };
            return res.status(500).json({ error: this.errorMessage })
        };
    };
};

module.exports = new LoadProfileUserController();