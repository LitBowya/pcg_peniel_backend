import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the path to your User model

// Protect middleware to verify the JWT token
const protect = (req, res, next) => {
    let token;
    
    // Check if the authorization header is present and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token using the JWT_SECRET environment variable
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach the decoded user ID to the request object
            req.user = decoded.userId;
            // Proceed to the next middleware
            next();
        } catch (error) {
            // If the token is invalid, return a 401 Unauthorized response
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        // If there's no token in the header, return a 401 Unauthorized response
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check if the user has "Super Admin" role
const isSuperAdmin = async (req, res, next) => {
    try {
        // Extract the token from the authorization header
        const token = req.headers.authorization?.split(' ')[1];
        
        // If no token, return a 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Token missing.' });
        }
        
        // Verify the token using the JWT_SECRET environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID and populate the role
        const user = await User.findById(decoded.id).populate('role');
        
        // If the user doesn't have the "Super Admin" role, return a 403 Forbidden response
        if (user.role?.name !== 'Super Admin') {
            return res.status(403).json({ message: 'Access denied. Only Super Admins can perform this action.' });
        }
        
        // Proceed to the next middleware
        next();
    } catch (error) {
        // If an error occurs during token verification, return a 401 Unauthorized response
        res.status(401).json({ message: `Unauthorized: ${error.message}` });
    }
};

export { protect, isSuperAdmin };
