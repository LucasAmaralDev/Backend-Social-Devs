const { PostsModel } = require('../../models/posts-model')

class UpdatePostController {

    async update(req, res) {

        try {

            const { id } = req.params
            const { userId } = req;
            const { text } = req.body;

            //Verificar se existe o post com o id passado e id do user
            const post = await PostsModel.findOne({
                where: { id, user_id: userId }
            })

            //verificando se existe o post
            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' })
            }

            //atualizando o post
            await PostsModel.update({ text }, {
                where: { id, user_id: userId }
            })

            //retornando o post atualizado
            return res.status(200).json({
                message: 'Post atualizado com sucesso'
            })

        } catch (error) {

        }
    }

}

module.exports = new UpdatePostController();