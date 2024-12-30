import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

// Config files
import connectDB from './config/db.js';
import initializeRoles from './config/initializeRoles.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

// Utils files
import logger from './utils/logger.js';

dotenv.config();
connectDB()

const app = express();

// Middleware
app.use(helmet());  // Helps secure HTTP headers
app.use(morgan('combined'));  // Logs HTTP requests
app.use(cors());  // Handles Cross-Origin Requests
app.use(bodyParser.json());  // Parses incoming JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parses form data
app.use(compression());  // Compresses the response bodies for better performance

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);


// Initialize roles
initializeRoles();

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
