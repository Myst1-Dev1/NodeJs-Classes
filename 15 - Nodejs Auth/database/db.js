const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Mongodb connected successfully');
    } catch (error) {
        console.error('Failed to connect to mongodb',error);
        process.exit(1);
    }
}

module.exports = connectToDB;