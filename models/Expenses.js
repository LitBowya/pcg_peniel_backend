import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    receipt: { type: String, required: false },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
