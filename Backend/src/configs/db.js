const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Let the caller handle the error
    }
};

module.exports = ConnectDB;