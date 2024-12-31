// server/utils/jwt.js
// const jwt = require('jsonwebtoken');

// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };

// const verifyToken = (token) => {
//     try {
//         return jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };

// module.exports = {
//     generateToken,
//     verifyToken
// };

const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.JWT_SECRET || config.get('jwtSecret'), { expiresIn: config.get('jwtExpiresIn') }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || config.get('jwtSecret'));
};

module.exports = { generateToken, verifyToken };