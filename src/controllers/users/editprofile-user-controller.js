const profileService = require('../../services/profile-service');
const HttpException = require('../exceptions/http.exception');

class EditProfileUserController {
    async editProfile (req, res) {
        try {
            await profileService.editProfile(req.userId, req.body);
            return res.status(202).json({ message: 'Perfil atualizado com sucesso' })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.status).json({ error: error.message })
            };
            return res.status(500).json({ error: 'Erro ao atualizar perfil' });
        }
    }
}

module.exports = new EditProfileUserController();