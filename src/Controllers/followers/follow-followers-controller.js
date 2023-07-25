const { FollowersModel } = require('../../models/followers-model');

class FollowFollowersController {

    async follow(req, res) {

        try {

            const { userId } = req;
            const { id } = req.params;

            // verificar se ja segue o usuario
            const follow = await FollowersModel.findOne({
                where: { follower_id: userId, followed_id: id }
            })

            if (follow) {
                return res.status(400).json({ error: 'Você já segue esse usuário' })
            }

            // seguir o usuario
            await FollowersModel.create({
                follower_id: userId,
                followed_id: id
            })

            return res.status(200).json({ message: 'Você começou a seguir esse usuário' })

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao seguir usuário' })

        }


    }


}

module.exports = new FollowFollowersController();