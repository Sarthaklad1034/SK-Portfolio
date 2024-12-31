const mongoose = require('mongoose');
const config = require('./default.json');

const connectDB = async() => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };

        await mongoose.connect(config.mongoURI, options);

        // Set up connection error handlers
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB Connected successfully');
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        // Add more detailed error logging
        if (err.name === 'MongoServerSelectionError') {
            console.error('Could not connect to any MongoDB servers');
        }
        process.exit(1);
    }
};

module.exports = connectDB;