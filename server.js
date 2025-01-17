import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Error Handling
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Config files
import connectDB from "./config/db.js";
import initializeRoles from "./config/initializeRoles.js";
import assetsRoutes from "./routes/assetsRoutes.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import committeeRoutes from "./routes/committeeRoutes.js";
import donationsRoutes from "./routes/donationsRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";
import groupsRoutes from "./routes/groupsRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import titheRoutes from "./routes/titheRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";
import contributionTypeRoutes from "./routes/contributionTypeRoutes.js";

// Utils files
import logger from "./utils/logger.js";

// import './config/instrument.js'

dotenv.config();
connectDB()

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cookieParser()); // For passing cookies
app.use(helmet());  // Helps secure HTTP headers
app.use(morgan('combined'));  // Logs HTTP requests
app.use(cors({
  origin: "http://localhost:5173", // Allow only this origin
}));  // Handles Cross-Origin Requests
app.use(bodyParser.json());  // Parses incoming JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parses form data
app.use(compression());  // Compresses the response bodies for better performance

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/committees', committeeRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/finances', financialRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/tithes', titheRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/contribution', contributionRoutes);
app.use("/api/contribution-type", contributionTypeRoutes);


// Initialize roles
initializeRoles()

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
