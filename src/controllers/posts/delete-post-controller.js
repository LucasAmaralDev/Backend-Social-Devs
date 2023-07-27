const { PostsModel } = require('../../models/posts-model')


class DeletePostController {
    async delete(req, res) {

        try {

            const { id } = req.params
            const { userId } = req;

            // deletar post
            const post = await PostsModel.destroy({
                where: { id, user_id: userId }
            });

            if (!post) {
                return res.status(404).json({
                    message: 'Post não encontrado'
                })
            }

            return res.status(200).json({
                message: 'Post deletado com sucesso'
            })

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao deletar post' })

        }
    }
}

module.exports = new DeletePostController();