import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    method: { type: String, required: true },
    originalUrl: { type: String, required: true },
    body: { type: Object, required: true },
}, { timestamps: true });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
