const { UsersModel } = require('../../models/users-model');
const profileService = require('../../services/profile-service');
const HttpException = require('../exceptions/http.exception');

class LoadProfileUserController {
    async loadMyProfile (req, res) {
        try {
            const { userId } = req
            const user = await profileService.loadMyProfile(userId)
            return res.status(200).json(user)
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.status).json({ error: error.message })
            };
            return res.status(500).json({ error: 'Erro ao buscar usuário' })
        };
    };

    async loadProfile (req, res) {

        const { username } = req.params;

        try {

            // procurar usuario e os posts dele
            const user = await UsersModel.findOne({
                where: { username },
                include: {
                    association: 'posts',
                    attributes: ['text', 'date'],
                    order: [['date', 'DESC']]
                }
            })

            //verificando se achou algum usuario
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            //retornando o usuario
            return res.status(200).json(user)
        }
        catch (error) {

            return res.status(500).json({ error: 'Erro ao buscar usuário' })

        }
    }

}

module.exports = new LoadProfileUserController();