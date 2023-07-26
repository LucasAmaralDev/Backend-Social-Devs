const { PostsModel } = require('../../models/posts-model')

class FindAllPostController {

    async findall(req, res) {

        try {

            // procurar todos os posts trazer em ordem decrescente pela coluna date e trazer o nome do usuario e avatar
            const post = await PostsModel.findAll({
                order: [['date', 'DESC']],
                include: {
                    association: 'user',
                    attributes: ['name', 'username', 'avatar']
                }
            })

            //verificando se existem posts
            if (!post) {
                return res.status(404).json({ error: 'Não existem Posts' })
            }

            //retornando o post
            return res.status(200).json(post)

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao buscar posts' })

        }

    }
}

module.exports = new FindAllPostController();