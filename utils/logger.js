import winston from 'winston';

// Create a new Winston logger instance
const logger = winston.createLogger({
    level: 'info', // Set default log level to 'info' (logs all info, warn, and error levels)
    format: winston.format.combine(
        winston.format.colorize(), // Colorizes the log output in the console
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`; // Custom log format
        })
    ),
    transports: [
        // Log info, warn, and error levels to the console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});

// Handling uncaught exceptions and unhandled promise rejections
logger.exceptions.handle(new winston.transports.Console());
logger.rejections.handle(new winston.transports.Console());

// Export logger for use throughout the app
export default logger;
