const jwt = require('jsonwebtoken');

function authMiddleware (req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        const accessToken = token.split(' ')[1];

        jwt.verify(
            accessToken,
            process.env.TOKEN_SECRET,
            (error, user) => {
                if (error) {
                    return res.status(403).json({ error: 'Token inválido' })
                }
                req.userId = user.id;
                next();
            }
        );

    } else {
        return res.status(401).json({ error: 'Token não encontrado' })
    }
}

module.exports = { authMiddleware };