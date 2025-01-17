import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    category: { type: String},
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    receipt: { type: String, required: false },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
