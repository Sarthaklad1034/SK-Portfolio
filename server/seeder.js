const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const createAdminUser = async() => {
    try {
        await connectDB();

        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!adminExists) {
            await User.create({
                username: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                isAdmin: true
            });
            console.log('Admin user created');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdminUser();