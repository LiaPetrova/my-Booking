const mongoose = require('mongoose');

const connStr = 'mongodb://127.0.0.1:27017/my-Booking';

module.exports = async (app) => {
    try {
        await mongoose.connect(connStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Error initializing Database');
        console.error(err.message);
        process.exit(1);
    }
};