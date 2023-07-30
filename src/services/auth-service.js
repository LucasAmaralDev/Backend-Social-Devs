const jwt = require('jsonwebtoken');

exports.generateToken = async data => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
};

exports.decodeToken = token => {
    let data = jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
};
