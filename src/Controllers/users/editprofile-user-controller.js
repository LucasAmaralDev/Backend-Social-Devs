const { UsersModel } = require('../../models/users-model')
const { Op } = require('sequelize')

class EditProfileUserController {

    async editarPerfil(req, res) {

        try {

            // recebendo dados do jtw e da body do front
            const { userId } = req;
            const { name, username, bio, avatar } = req.body;

            // verificando se os itens obrigatorios froam enviados
            if (!name || !username){
                return res.status(400).json({ error: 'Dados não enviados' })
            }

            // verificando se o id usuario existe
            const userExists = await UsersModel.findOne({
                where: { id: userId }
            })

            if (!userExists) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            // verificando se o username tem espaço
            if (username.includes(' ')) {
                return res.status(400).json({ error: 'Usuário não pode conter espaços' })
            }

            // vericando se o username ja existe no banco de daoos
            const usernameExists = await UsersModel.findOne({ where: { 
                username,
                id: { [Op.ne]: userId }
            } })
            if (usernameExists) {
                return res.status(400).json({ error: 'Usuário já existe' })
            }

            // verificando se o username tem mais de 6 caracteres e menos de 20
            if (username.length < 6 || username.length > 20) {
                return res.status(400).json({ error: 'Usuário deve ter entre 6 e 20 caracteres' })
            }

            // Fazend o atualizacao do usuario
            const modifyUser = await UsersModel.update({ name, username, bio, avatar }, {
                where: { id: userId }
            })

            console.log(modifyUser)

            return res.status(200).json({ message: 'Perfil atualizado com sucesso' })

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao atualizar perfil' })

        }



    }

}

module.exports = new EditProfileUserController();