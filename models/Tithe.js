// --- New Tithe Model ---
import mongoose from 'mongoose';

const titheSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Tithe', titheSchema);
