import AuditLog from "../models/AuditLog.js";

const auditLogMiddleware = async (req, res, next) => {
    try {
        const { method, originalUrl, body } = req;
        await AuditLog.create({ method, originalUrl, body });
        next();
    } catch (error) {
        res.status(500).json({ message: `Error logging audit: ${error.message}` });
    }
};

export default auditLogMiddleware;
