# BACKEND REDE SOCIAL

`` Api criada para server o frontend de uma rede social.``

Essa api tem foco em servir uma aplicação web e um aplicativo em react Native.
foi usado JWT para proteger as rotas e funções contra usuarios não autorizados
# Tecnologias usadas até o momento
    
    -ExpressJS
    -Sequelize
    -PostgreSQL
    -JWT
    -Dotenv


# ROTAS

### /login

Recebe os dados

        {username, password}

caso o login e senha estejam corretos é retornado o token de acesso


### /signup

Recebe os dados

    { name, username, email, password, date_birth, sex }

Faz diversas validações, tais como

    -Se todos os dados foram enviados
    -Se o {email} é valido usando um regex
    -Se o {email} ja foi cadastrado por outro usuario
    -Se o {username} é não contem espaços
    -Se o {username} já esta sendo usado por outro usuario
    -Se o {username} possui entre 6 e 20 caracteres
    -Se a {date_birth} é de uma pessoa maior de 13 anos
    -Se sexo recebido é 'masc', 'fem' ou 'outro'
    -Se a senha tem mais de 6 caracteres e menos de 20
    -Se a senha tem pelo menos 1 letra maiuscula, 1 minuscula e 1 numero usando regex

Caso esteja tudo certo o usuario é cadastrado e a api retorna um token ao usuario