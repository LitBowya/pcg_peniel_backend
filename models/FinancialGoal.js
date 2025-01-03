import mongoose from 'mongoose';

const financialGoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
}, { timestamps: true });

const FinancialGoal = mongoose.model('FinancialGoal', financialGoalSchema);

export default FinancialGoal;
