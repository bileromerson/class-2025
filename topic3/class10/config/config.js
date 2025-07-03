const monogoose = require('mongoose');

const connectDB = async () => {
    try {
        await monogoose.connect('mongodb://localhost:27017/curso', {
            console.log('Connecting to MongoDB...');
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
}