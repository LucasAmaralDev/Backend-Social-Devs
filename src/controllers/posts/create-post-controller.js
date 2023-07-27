const { PostsModel } = require('../../models/posts-model')

class CreatePostController {
    async create(req, res) {

        try {

            const { userId } = req;

            const { text } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Texto não enviado' })
            }

            const addPost = await PostsModel.create({ text, user_id: userId })

            return res.status(201).json(addPost)

        } catch (error) {

            return res.status(500).json({ error: 'Erro ao criar post' })

        }

    }
}

module.exports = new CreatePostController();