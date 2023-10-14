const { FollowersModel } = require('../../models/followers-model');

class UnfollowFollowersController {

    async unfollow(req, res) {

        try {

            const { userId } = req;
            const { id } = req.params;

            // verificar se ja segue o usuario
            const follow = await FollowersModel.findOne({
                where: { follower_id: userId, followed_id: id }
            })

            if (!follow) {
                return res.status(400).json({ error: 'Você não segue esse usuário' })
            }

            // seguir o usuario
            await FollowersModel.destroy({
                where: { follower_id: userId, followed_id: id }
            })

            return res.status(200).json({ message: 'Você deixou de seguir esse usuário' })

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao deixar de seguir usuário' })

        }


    }


}

module.exports = new UnfollowFollowersController();