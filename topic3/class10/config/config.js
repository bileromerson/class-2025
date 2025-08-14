const mongoose = require('mongoose'); //import mongoose to connect to MongoDB

const connectDB = async () => { // function to connect to MongoDB (more information on handling)
    try { //Try and Catch to verify if the connection is OK
        await mongoose.connect('mongodb://localhost:27017/');
        console.log('Connected to MongoDB...!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
}
module.exports = connectDB; //export the connectDB function