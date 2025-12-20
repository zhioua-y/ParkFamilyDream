const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        const userExists = await User.findOne({ username: 'admin' });
        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        await User.create({
            username: 'admin',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Admin user created');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
