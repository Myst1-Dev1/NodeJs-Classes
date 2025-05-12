const mongoose = require('mongoose');

const connectToDb = async() => {
    try {
        await mongoose.connect('mongodb+srv://danteopzz1:mcjCS6Mp7LF990eh@cluster0.f1rjwal.mongodb.net/');

        console.log('Mongodb is connected successfully');
    } catch (error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
    }
}

module.exports = connectToDb;