const { UsersModel } = require('../../models/users-model')

class SignupUserController {
    async signup(req, res) {

        try {

            //recebendo dados do body
            const { name, username, email, password, date_birth, sex } = req.body;

            //verificando se os dados foram enviados
            if (!name || !username || !email || !password || !date_birth || !sex) {
                return res.status(400).json({ error: 'Dados não enviados' })
            }

            //verificar se é um email valido com regex
            const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (!regexEmail.test(email)) {
                return res.status(400).json({ error: 'Email inválido' })
            }

            //verificando se o username contem espaços
            if (username.includes(' ')) {
                return res.status(400).json({ error: 'Usuário não pode conter espaços' })
            }

            //verificando se o username já existem
            const usernameExists = await UsersModel.findOne({ where: { username } })
            if (usernameExists) {
                return res.status(400).json({ error: 'Usuário já existe' })
            }

            //verificando se o username tem mais de 6 caracteres e menos de 20 
            if (username.length < 6 || username.length > 20) {
                return res.status(400).json({ error: 'Usuário deve ter entre 6 e 20 caracteres' })
            }

            //verificando se o email já existem
            const emailExists = await UsersModel.findOne({ where: { email } })
            if (emailExists) {
                return res.status(400).json({ error: 'Email já existe' })
            }

            //verificando de o usuario tem mais de 13 anos (obs: Data recebida deve ser dateOnly)
            //verificar em dias totais de vida
            const today = new Date();
            const birth = new Date(date_birth);
            const idade = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 365));
            if (idade < 13) {
                return res.status(400).json({ error: 'Usuário deve ter mais de 13 anos' })
            }

            //verificando se sexo recebido é 'masc', 'fem' ou 'outro' se nao for retorna erro
            if (sex !== 'masc' || sex !== 'fem' || sex !== 'outro') {
                return res.status(400).json({ error: 'Sexo inválido' })
            }

            //verificando se a senha tem mais de 6 caracteres e menos de 20
            if (password.length < 6 || password.length > 20) {
                return res.status(400).json({ error: 'Senha deve ter entre 6 e 20 caracteres' })
            }

            //verificando se a senha tem pelo menos 1 letra maiuscula, 1 minuscula e 1 numero
            const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/g
            if (!regexPassword.test(password)) {
                return res.status(400).json({ error: 'Senha deve ter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número' })
            }

            //criando usuario
            const criarUsuario = await UsersModel.create({
                name,
                username,
                email,
                password,
                date_birth,
                sex
            })

            //verifica se o usuario foi criado caso sim retorna "Usuario criado com sucesso"
            if (criarUsuario) {
                return res.status(201).json({ message: 'Usuário criado com sucesso' })
            }

        } catch (error) {

        }

    }

}

module.exports = { SignupUserController };