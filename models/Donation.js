import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Optional for event-specific donations
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
