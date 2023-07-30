const { UsersModel } = require('../../models/users-model')


class MyInfoUserController {
    async getMyInfo (req, res) {

        try {

            const { userId } = req

            //carregar Minhas informacoes pessoais junto com quem eu sigo e quem me segue
            const user = await UsersModel.findOne({
                where: { id: userId },
                include: [
                    {
                        association: 'follower',
                        attributes: ['id'],
                    },
                    {
                        association: 'followed',
                        attributes: ['id'],
                    }
                ]
            })

            return res.status(200).json(user)

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao buscar informações do usuário' })

        }

    }
}

module.exports = new MyInfoUserController();