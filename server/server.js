const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize express
const app = express();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Database connection
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Directory setup
const uploadDir = path.join(__dirname, 'uploads', 'images');
fs.mkdirSync(uploadDir, { recursive: true });

// Static files
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

// Image upload route
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/images/${req.file.filename}`;
    res.json({ success: true, imageUrl });
});

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/skills', require('./routes/api/skills'));
app.use('/api/experience', require('./routes/api/experience'));
app.use('/api/contact', require('./routes/api/contact'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    console.error('Stack:', err.stack);

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.code === 'LIMIT_FILE_SIZE' ?
                'File is too large. Maximum size is 5MB' : `Upload error: ${err.message}`
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: Object.values(err.errors).map(e => e.message).join(', ')
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong on the server'
    });
});

// Server initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;