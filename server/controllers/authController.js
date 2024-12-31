// // server/controllers/authController.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Generate JWT
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE,
//     });
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async(req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check for user
//         const user = await User.findOne({ email }).select('+password');
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Check password
//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         res.json({
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             token: generateToken(user._id),
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = { login };



// server/controllers/authController.js
// const asyncHandler = require('express-async-handler');
// const User = require('../models/User');

// const register = asyncHandler(async(req, res) => {
//     const { name, email, password } = req.body;
//     const user = await User.create({
//         name,
//         email,
//         password
//     });
//     res.status(201).json(user);
// });

// const login = asyncHandler(async(req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     res.json(user);
// });

// const getProfile = asyncHandler(async(req, res) => {
//     res.json({ message: 'Profile route' });
// });

// module.exports = {
//     register,
//     login,
//     getProfile
// };


// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/default.json');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d'
    });
};

// Login user
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error in login' });
    }
};

// Verify token
const verifyToken = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error in token verification' });
    }
};

module.exports = {
    login,
    verifyToken
};