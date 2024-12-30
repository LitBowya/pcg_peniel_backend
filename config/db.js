import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('MongoDB connected...');
    } catch (err) {
        logger.error(err);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
