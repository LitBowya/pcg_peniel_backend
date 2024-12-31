import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    donor: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    description: { type: "string", required: true}
    
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema)
