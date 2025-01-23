const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected:');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
module.exports = connectDB;