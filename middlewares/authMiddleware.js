import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        // Read JWT from the 'jwt' cookie
        const token = req.cookies?.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        
        // Verify the token using the JWT_SECRET environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch the user and attach it to the request object (excluding password)
        req.user = await User.findById(decoded.userId).select("-password").populate('role');
        
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        
        next();
    } catch (error) {
        res.status(401).json({ message: `Not authorized, token failed: ${error.message}` });
    }
};

// Middleware to check if the user has one of the allowed roles
const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Check if the user's role is in the list of allowed roles
            if (!allowedRoles.includes(req.user?.role?.name)) {
                return res.status(403).json({
                    message: `Access denied. Only ${allowedRoles.join(' or ')} users can perform this action.`
                });
            }
            
            next();
        } catch (error) {
            res.status(401).json({ message: `Unauthorized: ${error.message}` });
        }
    };
};

// Role-specific middleware using the generic checkRoles function
const isSuperAdmin = checkRoles('Super Admin')
const isAdmin = checkRoles("Admin");
const isFinance = checkRoles("Finance");
const isAdminOrSuperAdmin = checkRoles("Admin", "Super Admin");
const isAdminOrFinance = checkRoles("Admin", "Finance");
const isSuperAdminOrFinance = checkRoles( "Finance", "Super Admin");

export { protect, isSuperAdmin, isAdmin,  isAdminOrSuperAdmin, isFinance, isAdminOrFinance, isSuperAdminOrFinance };
