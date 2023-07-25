const { PostsModel } = require('../../models/posts-model')

class FindPostController {

    async find(req, res) {

        try {

            const { id } = req.params

            // procurar o post pelo id do usuario trazer em ordem decrescente pela coluna date
            const post = await PostsModel.findAll({
                where: { user_id: id },
                order: [['date', 'DESC']]
            })

            //verificando se existem posts
            if (!post) {
                return res.status(404).json({ error: 'Usuário não possui Posts' })
            }

            //retornando o post
            return res.status(200).json(post)

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao buscar posts' })

        }

    }
}

module.exports = new FindPostController();