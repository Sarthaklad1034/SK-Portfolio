// server/middleware/auth.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async(req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Get token from header
//             token = req.headers.authorization.split(' ')[1];

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Get user from token
//             req.user = await User.findById(decoded.id).select('-password');

//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// module.exports = { protect };

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async(req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized' });
//         }
//     } else {
//         res.status(401).json({ message: 'No token provided' });
//     }
// };

// const adminProtect = async(req, res, next) => {
//     await protect(req, res, () => {
//         if (!(req.user && req.user.isAdmin)) {
//             return res.status(403).json({ message: 'Not authorized as admin' });
//         }
//         next();
//     });
// };

// module.exports = { protect, adminProtect };

// server/middleware/auth.js
// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/default.json');

const protect = async(req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error in auth middleware' });
    }
};

module.exports = { protect };